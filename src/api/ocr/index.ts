import axios, { AxiosProgressEvent } from "axios";


export const uploadToOcrApi = async (
  file: File,
  onUploadProgress?: (progressEvent: AxiosProgressEvent) => void
) => {

  const formData = new FormData();
  formData.append("image_file", file);

  try {
    const response = await axios.post("http://123.200.16.106:3838/ocr/cloud_ocr", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress,
    });

    const result = response.data;

    if (!result || result.status !== "success") {
      const statusCode = result?.status_code || response.status;
      let errorMessage = result?.error || result?.message || "Unknown error occurred";
      if (statusCode === 415) {
        errorMessage = "Unsupported file type. Please upload a valid image (JPG, PNG, BMP, TIFF, GIF, WEBP).";
      }

      throw new Error(errorMessage);
    }

    return result.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.error || error.message || "Upload failed");
  }
};
