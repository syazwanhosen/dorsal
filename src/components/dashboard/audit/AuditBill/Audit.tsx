import { useAppSelector } from "@/store/hooks";
import { useEffect } from "react";
// Components
import AuditBillTable from "./AuditBillTable";
import WithLoading from "@/components/WithLoading";

export default function Audit() {
  const auditRecords = useAppSelector((state) => state.audit.auditRecords);
  const latest = auditRecords.at(-1);
  if (!latest) {
    return <p className="p-6 text-gray-600">No audit data available.</p>;
  }

  const {
    invoice_number,
    date,
    hospital_name,
    state,
    patient_information,
    doctor_information,
    billing_data,
    total_price
  } = latest;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  

  return (
    <WithLoading sliceKey="audit">
      <div className="p-6 bg-white rounded-lg shadow-md lg:mt-6 mt-4 lg:mb-8 mb-4 overflow-hidden">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Transaction Details</h2>

        <div className="mb-8">
          <div className="lg:flex flex-wrap items-center">
            <p className="text-gray-600 lg:pb-4 w-32 min-w-[6rem]">Invoice No:</p>
            <p className="text-gray-800 pb-4 flex-1">{invoice_number}</p>
          </div>
          <div className="lg:flex flex-wrap items-center">
            <p className="text-gray-600 lg:pb-4 w-32 min-w-[6rem]">Date:</p>
            <p className="text-gray-800 pb-4 flex-1">{date}</p>
          </div>
          <div className="lg:flex flex-wrap items-center">
            <p className="text-gray-600 w-32 min-w-[6rem]">Hospital:</p>
            <p className="text-gray-800 flex-1">{hospital_name}, {state}</p>
          </div>
        </div>

        <div className="mb-8 flex flex-col lg:flex-row lg:space-x-4 gap-6 max-w-full mx-auto items-stretch">
          {/* Patient Info */}
          <div className="w-full lg:w-1/2 flex flex-col">
            <h2 className="text-lg font-semibold text-gray-700 mb-3 lg:pb-4">Patient Information</h2>
            <div className="flex flex-col sm:flex-row flex-wrap items-center gap-4 p-4 lg:py-6 border border-gray-300 rounded-md flex-grow h-full">
              <img
                src="/src/assets/user.png"
                alt="User Profile Image"
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border border-gray-200"
              />
              <div className="space-y-1 text-center sm:text-left">
                <p className="text-gray-800 font-medium pb-2 break-words">{patient_information.name}</p>
                {(() => {
                  const addressMatch = patient_information.details.match(/^(.*?)Phone:/);
                  const phoneMatch = patient_information.details.match(/Phone:\s*([^\s]+.*?)(Email:|$)/);
                  const emailMatch = patient_information.details.match(/Email:\s*(.*)$/);
                  return (
                    <>
                    {addressMatch && (
                      <p className="text-[#3A3541] pb-2 break-words">
                        {addressMatch[1].trim()}
                      </p>
                    )}
                    {emailMatch && (
                      <p className="text-[#3A3541] pb-2 break-words">
                        {emailMatch[1].trim()}
                      </p>
                    )}
                    {phoneMatch && (
                      <p className="text-[#3A3541] pb-2 break-words">
                        {phoneMatch[1].trim()}
                      </p>
                    )}
                  </>
                  
                  );
                })()}
              </div>
            </div>
          </div>

          {/* Doctor Info */}
          <div className="w-full lg:w-1/2 flex flex-col">
            <h2 className="text-lg font-semibold text-gray-700 mb-3 lg:pb-4">Practitioner Information</h2>
            <div className="space-y-1 p-4 lg:py-6 border border-gray-300 rounded-md flex-grow h-full">
              <p className="text-gray-800 font-medium pb-2 break-words">{doctor_information.name}</p>
              {(() => {
                const specialtyMatch = doctor_information.details.match(/Specialty:\s*(.*?)(License|Phone|$)/);
                const licenseMatch = doctor_information.details.match(/License(?: No)?:\s*(.*?)(Phone|$)/);
                const phoneMatch = doctor_information.details.match(/Phone:\s*(.*)$/);
                return (
                  <>
                  {licenseMatch && (
                    <p className="text-[#3A3541] pb-2 break-words flex">
                      <span className="lg:w-40">Practitioner ID:</span>
                      <span>{licenseMatch[1].trim()}</span>
                    </p>
                  )}
                  {phoneMatch && (
                    <p className="text-[#3A3541] pb-2 break-words flex">
                      <span className="lg:w-40">Contact Info:</span>
                      <span>{phoneMatch[1].trim()}</span>
                    </p>
                  )}
                  {specialtyMatch && (
                    <p className="text-[#3A3541] pb-2 break-words flex">
                      <span className="lg:w-40">Speciality:</span>
                      <span>{specialtyMatch[1].trim()}</span>
                    </p>
                  )}
                </>                               
                );
              })()}
            </div>
          </div>
        </div>
      </div>

      <AuditBillTable
        billingData={billing_data}
        hospitalName={hospital_name}
        subtotal={total_price?.subtotal}
        taxPercentage={total_price?.tax_percentage}
        payableTax={total_price?.payable_tax}
        totalAmount={total_price?.total}
      />
    </WithLoading>
  );
}
