import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Types based on OCR API response
export interface BillingItem {
  unit_cost: string;
  quantity: string;
  code: string;
  description: string;
  price: string;
}

export interface PersonInfo {
  name: string;
  details: string;
}

export interface TotalPrice {
  subtotal: number;
  tax_percentage: number;
  payable_tax: number;
  total: number;
}

export interface AuditRecord {
  hospital_name: string;
  state: string;
  date: string;
  invoice_number: string;
  patient_information: PersonInfo;
  doctor_information: PersonInfo;
  billing_data: BillingItem[];
  total_price: TotalPrice;
}

export interface AuditFinding {
  code: string;
  description: string;
  flag_type: "no_issue" | "unclear_pricing" | "upcoding" | string;
  confidence: number;
  estimated_savings: number;
  explanation: string;
}

export interface SubmittedAuditData {
  audit_response: {
    audit_date: string;
    audit_result: AuditFinding[];
    total_issues: number;
  };
}

export interface SubmittedAuditResponse {
  status: string;
  status_code: number;
  data: SubmittedAuditData;
  error: any;
  message: string;
}

interface AuditState {
  auditRecords: AuditRecord[];
  submittedAudit: SubmittedAuditResponse | null;
  loading: boolean;
}

const initialState: AuditState = {
  auditRecords: [],
  submittedAudit: null,
  loading: false,
};

const auditSlice = createSlice({
  name: "audit",
  initialState,
  reducers: {
    addAuditRecord: (state, action: PayloadAction<AuditRecord>) => {
      state.auditRecords.push(action.payload);
    },
    clearAuditRecords: (state) => {
      state.auditRecords = [];
    },
    submittedAudit: (state, action: PayloadAction<SubmittedAuditResponse>) => {
      state.submittedAudit = action.payload;
    },
    setLoadingData: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const {
  addAuditRecord,
  clearAuditRecords,
  submittedAudit,
  setLoadingData
} = auditSlice.actions;

export default auditSlice.reducer;
