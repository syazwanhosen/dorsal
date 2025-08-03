import { useState, useCallback, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/store/hooks";
import { UploadCloud, X, ChevronDown } from "lucide-react";
import { toast } from "sonner";

// Components
import { Button } from "@/components/ui/buttons/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  FileUpload,
  FileUploadDropzone,
  FileUploadItem,
  FileUploadItemDelete,
  FileUploadItemMetadata,
  FileUploadItemPreview,
  FileUploadList,
} from "@/components/ui/file-upload";

// Redux
import { addAuditRecord, AuditRecord, setLoadingData } from "@/features/auditSlice";

// API
import { uploadToOcrApi } from "@/api/ocr";

const DOCUMENT_TYPES = ["Itemized Bill", "Discharge Summary", "Medical Report"];

export const UploadDocument = () => {
  const isMountedRef = useRef(true);

  const [documentType, setDocumentType] = useState("Itemized Bill");
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleUpload = async () => {
    if (files.length === 0) {
      toast.error("Please select a file to upload.");
      return;
    }

    const file = files[0];
    setLoading(true);
    setUploadProgress(0);
    dispatch(setLoadingData(true));

    try {
      const data = await uploadToOcrApi(file, (progressEvent) => {
        if (!isMountedRef.current) return;
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / (progressEvent.total || 1)
        );
        setUploadProgress(percentCompleted);
      }) as AuditRecord;

      if (isMountedRef.current) {
        setUploadProgress(100);
        dispatch(addAuditRecord(data));
        dispatch(setLoadingData(false));
        toast.success("Upload complete!");
        setTimeout(() => {
          if (isMountedRef.current) navigate("/account/run-audit");
          window.scrollTo({ top: 0, behavior: "smooth" });
        }, 500);
      }
    } catch (error: any) {
      console.error("Upload failed:", error);
      if (isMountedRef.current) {
        toast.error("Upload failed", {
          description: error.message || "An unexpected error occurred.",
        });
      }
    } finally {
      if (isMountedRef.current) { 
        setLoading(false);
        dispatch(setLoadingData(false));
      }
    }
  };

  const onFileReject = useCallback((file: File, message: string) => {
    toast(message, {
      description: `"${
        file.name.length > 20 ? `${file.name.slice(0, 20)}...` : file.name
      }" has been rejected`,
    });
  }, []);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  return (
    <div>
      {/* Document Type Selection */}
      <div className="mb-4">
        <p className="text-sm font-medium mb-1">Hospital Document Type</p>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="w-full sm:w-[240px] justify-between border-gray-300"
            >
              {documentType}
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="min-w-[200px] w-auto border-gray-300">
            <DropdownMenuRadioGroup
              value={documentType}
              onValueChange={setDocumentType}
            >
              {DOCUMENT_TYPES.map((type) => (
                <DropdownMenuRadioItem key={type} value={type}>
                  {type}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Drag & Drop File Upload */}
      <p className="text-sm font-medium">File</p>
      <FileUpload
        maxFiles={1}
        maxSize={5 * 1024 * 1024}
        value={files}
        onValueChange={setFiles}
        onFileReject={onFileReject}
        multiple={false}
      >
        <div className="bg-primary-foreground rounded-md p-4">
          <p className="text-left text-black w-full mb-4">Uploading File</p>
          <FileUploadDropzone>
            <div className="flex flex-col items-center gap-1">
              <div className="flex items-center justify-center rounded-full border p-2.5">
                <UploadCloud className="size-6 text-muted-foreground" />
              </div>
              <p className="text-sm text-gray-600">
                <span className="text-[#8770BC] font-medium">
                  Click to upload
                </span>{" "}
                or drag and drop
              </p>
              <p className="text-sm text-gray-600">PNG or JPG</p>
              <p className="text-xs text-gray-400">(max 5MB)</p>
            </div>
          </FileUploadDropzone>
        </div>
        <FileUploadList>
          {files.map((file, index) => (
            <FileUploadItem
              key={index}
              value={file}
              className="border-gray-300"
            >
              <div className="w-[50px] h-[50px] overflow-hidden rounded-md border border-gray-300">
                <FileUploadItemPreview className="object-cover w-full h-full" />
              </div>

              <FileUploadItemMetadata />
              <FileUploadItemDelete asChild>
                <Button variant="ghost" size="icon" className="size-7">
                  <X />
                </Button>
              </FileUploadItemDelete>
            </FileUploadItem>
          ))}
        </FileUploadList>
      </FileUpload>


      {loading && (
        <div className="w-full mt-4">
          <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full bg-purple transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
          <p className="text-xs text-right mt-1">{uploadProgress}%</p>
        </div>
      )}
      <div className="flex justify-end mt-6">
        <Button
          onClick={handleUpload}
          className="w-auto min-w-[120px] bg-purple"
          disabled={loading}
        >
          {loading ? "Uploading..." : "Upload"}
        </Button>
      </div>
    </div>
  );
};
