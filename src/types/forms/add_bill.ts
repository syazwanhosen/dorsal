export interface BillingInfo {
    billingDate: string;
    invoiceNumber: string;
}

export interface PatientInfo {
    fullName: string;
    patientId: string;
}

export interface ServiceInfo {
    description: string;
    amountPayable: string;
}

export interface UpdateDataFormState {
    billing: BillingInfo;
    patient: PatientInfo;
    service: ServiceInfo;
}
