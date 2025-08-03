import axios from 'axios';

const API_URL = 'http://123.200.16.106:3838/ocr/get_recent_uploads';

export type RecentUpload = {
  hospital_name: string;
  state: string;
  invoice_date: string;
  total_amount: number;
  timestamp: string;
};

export const fetchRecentUploads = async (): Promise<RecentUpload[]> => {
  try {
    const response = await axios.get(API_URL);
    return response.data?.data?.recent_uploads || [];
  } catch (error) {
    console.error('Error fetching recent uploads:', error);
    return [];
  }
};
