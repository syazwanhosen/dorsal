import { Upload, Users, X, Loader2 } from "lucide-react";
import {
  useState,
  useEffect,
  useMemo,
  useCallback,
  lazy,
  Suspense,
} from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FileUpload,
  FileUploadDropzone,
  FileUploadItem,
  FileUploadItemDelete,
  FileUploadItemMetadata,
  FileUploadList,
} from "@/components/ui/file-upload";
import { fetchRecentUploads, RecentUpload } from "@/api/get_recent_uploads";
import { uploadToOcrApi } from "@/api/ocr";

// Lazy load the preview component
const FileUploadItemPreview = lazy(() =>
  import("@/components/ui/file-upload").then((module) => ({
    default: module.FileUploadItemPreview,
  }))
);

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

export const UploadBill = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [isUploaded, setIsUploaded] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [recentUploads, setRecentUploads] = useState<RecentUpload[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const location = useLocation();

  const formattedUploads = useMemo(() => {
    return recentUploads
      .sort(
        (a, b) =>
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      )
      .slice(0, 10)
      .map((upload) => ({
        ...upload,
        formattedDate: formatDate(upload.invoice_date),
        formattedAmount: formatCurrency(upload.total_amount),
      }));
  }, [recentUploads]);

  useEffect(() => {
    const loadUploads = async () => {
      try {
        const uploads = await fetchRecentUploads();
        setRecentUploads(uploads);
      } catch (error) {
        console.error("Failed to fetch recent uploads:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadUploads();
  }, []);

  useEffect(() => {
    if (location.hash === "#UploadBill") {
      const el = document.getElementById("UploadBill");
      el?.scrollIntoView({ behavior: "smooth" });
    }
  }, [location]);

  const handleRemoveFile = useCallback(() => {
    setFiles([]);
    setIsUploaded(false);
    setUploadProgress(0);
    setIsUploading(false);
    setErrorMessage(null);
  }, []);

  const handleFileChange = useCallback((newFiles: File[]) => {
    setErrorMessage(null);
    setFiles(newFiles);
  }, []);

  const onFileReject = useCallback((_file: File, message: string) => {
    setErrorMessage(message);
  }, []);

  const startUploadProcess = useCallback(async () => {
    const file = files[0];
    if (!file) return;

    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/bmp",
      "image/tiff",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
      setErrorMessage(
        "Unsupported file type. Please upload a valid image (JPG, JPEG, PNG, BMP, TIFF, WEBP)."
      );
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    try {
      const result = await uploadToOcrApi(file, (progressEvent) => {
        const percent = Math.round(
          (progressEvent.loaded * 100) / (progressEvent.total || 1)
        );
        setUploadProgress(percent);

        if (percent === 100) {
          setTimeout(() => {
            setIsUploaded(true);
            setIsUploading(false);
          }, 500);
        }
      });

      if (
        !result?.hospital_name &&
        !result?.total_price?.total &&
        !result?.date
      ) {
        setErrorMessage("No bill data found. Try uploading a clearer image.");
        handleRemoveFile();
      }
    } catch (error: any) {
      setErrorMessage(error.message || "Upload failed.");
      setIsUploading(false);
      setUploadProgress(0);
    }
  }, [files, handleRemoveFile]);


  const renderUploadState = () => {
    if (isUploaded) {
      return (
        <div className="bg-white border-2 border-dashed border-[#8770BC] rounded-lg px-2 py-4 lg:py-14 lg:px-8 text-center hover:border-purple-700 transition-colors shadow-lg">
          <div className="text-center">
            <h5 className="lg:text-xl font-bold text-gray-800 mb-4 lg:px-10">
              Thank you
              <br />
              for uploading your medical bill.
            </h5>
            <p className="lg:text-base text-sm text-gray-600">
              Want to start saving?
            </p>
            <p className="lg:text-base text-sm text-gray-600 mb-6 lg:px-10">
              Join waitlist now to unlock better rates and exclusive benefits.
            </p>
            <Link
              to="https://docs.google.com/forms/d/e/1FAIpQLScaCHqfF56Mj8znmN0bWX_NovHkOTmiWhz5E1UdFnD8wxrBcA/viewform"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-purple text-white px-4 py-2 rounded-md text-sm hover:bg-purple-700 transition"
            >
              Join waitlist
            </Link>
          </div>
        </div>
      );
    }

    if (isUploading) {
      return (
        <div className="bg-white border-2 border-dashed border-[#8770BC] rounded-lg p-6 lg:p-8">
          <div className="text-center mb-4">
            <p className="font-medium text-gray-700 mb-2">
              Uploading your file...
            </p>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-purple h-2.5 rounded-full"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              {uploadProgress}% complete
            </p>
          </div>
        </div>
      );
    }

    return (
      <div>
        <div className="bg-white border-2 border-dashed border-[#8770BC] rounded-lg px-2 py-4 lg:py-12 lg:px-8 text-center hover:border-purple-700 transition-colors shadow-lg">
          <FileUpload
            maxFiles={1}
            maxSize={5 * 1024 * 1024}
            value={files}
            onValueChange={handleFileChange}
            onFileReject={onFileReject}
            multiple={false}
            className="w-full"
          >
            <FileUploadDropzone className="border-0">
              <div className="flex flex-col items-center gap-1">
                <Upload className="mb-3 text-[#8770BC]" size={32} />
                <p className="font-medium text-gray-700 mb-1 lg:mb-2">
                  Drag & drop your medical bill
                </p>
                <p className="text-sm text-gray-500 ">
                  Help others by sharing your pricing data anonymously
                </p>
                {files.length === 0 && (
                  <div className="bg-purple text-white mt-4 lg:mt-6 px-4 py-2 rounded-md text-sm hover:bg-purple-700 transition cursor-pointer">
                    Choose File
                  </div>
                )}
              </div>
            </FileUploadDropzone>

            <FileUploadList>
              {files.map((file, index) => (
                <FileUploadItem
                  key={index}
                  value={file}
                  className="border-gray-200 bg-gray-50"
                >
                  <div className="w-[40px] h-[40px] overflow-hidden rounded-md border border-gray-200">
                    <Suspense
                      fallback={<div className="w-full h-full bg-gray-200" />}
                    >
                      <FileUploadItemPreview className="object-cover w-full h-full" />
                    </Suspense>
                  </div>
                  <FileUploadItemMetadata className="text-sm text-gray-700" />
                  <FileUploadItemDelete asChild onClick={handleRemoveFile}>
                    <button className="p-1 rounded-full hover:bg-gray-100">
                      <X className="w-4 h-4 text-gray-500" />
                    </button>
                  </FileUploadItemDelete>
                </FileUploadItem>
              ))}
            </FileUploadList>
          </FileUpload>
          {errorMessage && (
            <div className="mt-2 text-sm text-red-500">{errorMessage}</div>
          )}
          {files.length > 0 && (
            <button
              onClick={startUploadProcess}
              className="mt-4 bg-purple text-white px-4 py-2 rounded-md text-sm hover:bg-purple-700 transition"
            >
              Upload File
            </button>
          )}
        </div>
        <p className="text-sm text-black mb-2 text-center py-2 lg:pt-8 pt-4">
          <Link
            to="https://docs.google.com/forms/d/e/1FAIpQLScaCHqfF56Mj8znmN0bWX_NovHkOTmiWhz5E1UdFnD8wxrBcA/viewform"
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink font-semibold hover:underline"
          >
            Join waitlist
          </Link>{" "}
          if you want to start saving
        </p>
      </div>
    );
  };

  return (
    <section className="container bg-white upload-bill" id="UploadBill">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_1.3fr] gap-6 pt-10 lg:pt-16 md:pb-6 xl:pb-8 2xl:pb-14 bg-white">
        {/* Share Your Bill Card */}
        <div className="bg-[#F5F1FF] p-6 lg:pb-6 lg:px-12 rounded-xl border border-gray-200">
          <div className="flex items-center mb-4">
            <div className="flex items-center justify-center w-10 h-10 lg:w-12 lg:h-12 lg:mr-4 mr-2 rounded-full bg-gradient-to-r from-[#9F70FD] to-[#E770C1]">
              <Upload className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
            </div>
            <h2 className="text-[20px] sm:text-[24px] md:text-[24px] lg:text-[26px] font-bold text-gray-900">
              Share Your Bill
            </h2>
          </div>
          <p className="text-base text-[#6A6A6A] mb-6 lg:mb-8">
            Your upload helps others understand medical costs better.
          </p>

          {renderUploadState()}
        </div>

        {/* Recent Community Upload Card */}
        <div className="bg-[#F5F1FF] p-6 lg:px-12 lg:pb-1 pb-4 rounded-xl border border-gray-200">
          <div className="flex items-center mb-4">
            <div className="flex items-center justify-center w-10 h-10 lg:w-12 lg:h-12 lg:mr-4 mr-2 rounded-full bg-gradient-to-r from-[#9F70FD] to-[#E770C1]">
              <Users className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
            </div>
            <h2 className="text-[20px] sm:text-[24px] md:text-[24px] lg:text-[26px] font-bold text-gray-900">
              Recent Community Upload
            </h2>
          </div>
          <p className="text-base text-[#6A6A6A] mb-4 lg:mb-6">
            Uncover real-world pricing straight from user uploads.
          </p>

          <div className="space-y-3 max-h-96 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-[#8770BC] scrollbar-track-gray-100">
            {isLoading ? (
              <div className="bg-white rounded-lg px-4 py-6 text-center border border-gray-200">
                <Loader2 className="w-8 h-8 text-[#8770BC] animate-spin mx-auto" />
              </div>
            ) : formattedUploads.length > 0 ? (
              formattedUploads.map((upload, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-lg px-4 py-4 lg:py-8 lg:flex justify-between items-baseline border border-gray-200"
                >
                  <div>
                    <p className="lg:font-bold font-semibold text-gray-800">
                      {upload.hospital_name}
                    </p>
                    <p className="text-sm text-gray-500">
                      Invoice Date - {upload.formattedDate}
                    </p>
                  </div>
                  <div className="text-right ml-4">
                    <p className="lg:font-bold font-semibold text-purple">
                      {upload.formattedAmount}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white rounded-lg px-4 py-6 text-center border border-gray-200">
                <p className="text-gray-500">No recent uploads found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
