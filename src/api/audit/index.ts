import axios from "axios";

interface BillingInformation {
  code: string;
  description: string;
  price: string;
}

interface AuditPayload {
  hospital_name: string;
  billing_information: BillingInformation[];
}

export const postAuditData = async (payload: AuditPayload): Promise<any> => {
  try {
    const response = await axios.post('http://123.200.16.106:3838/audit/audit', payload);

    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.error || error.message || "Upload failed");
  }
};