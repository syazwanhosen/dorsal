import { useState, useEffect } from "react";
import { useAppSelector } from "@/store/hooks";
import { toast } from "sonner";

import { Checkbox } from "@/components/ui/checkbox";
import AuditFindingsModal from "./AuditFindingsModel";

const getSeverityLabel = (value: number): "Low" | "Medium" | "High" => {
  if (value === 1) return "Low";
  if (value >= 0.5 && value <= 0.99) return "Medium";
  return "High";
};

const severityClasses = {
  High: "bg-[#CE3C29] text-white px-3 py-1 rounded-md w-16 text-center text-xs",
  Medium:
    "bg-[#FCAC12] text-white px-3 py-1 rounded-md w-16 text-center text-xs",
  Low: "bg-[#6CA724] text-white px-3 py-1 rounded-md w-16 text-center text-xs",
};

export default function AuditFindings() {
  const {submittedAudit, auditRecords} = useAppSelector((state) => state.audit);
  const latest = auditRecords.at(-1);

  if (!latest) {
    return <p className="p-6 text-gray-600">No audit data available.</p>;
  }

  const {
    invoice_number,
    date,
    patient_information,
    hospital_name,
    billing_data
  } = latest
  
  const total = billing_data.reduce((sum, item) => sum + parseFloat(item.price || "0"), 0);

  const [modalOpen, setModalOpen] = useState(false);

  const billingData = submittedAudit?.data?.audit_response?.audit_result?.map(({
    code,
    confidence,
    description,
    explanation,
    estimated_savings
  }) => ({
    id: code,
    severity: getSeverityLabel(confidence),
    item: description,
    issueDescription: explanation,
    amount: estimated_savings
  }))

  const formattedDate = submittedAudit?.data?.audit_response?.audit_date
  ? new Date(submittedAudit.data.audit_response.audit_date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    })
  : "";


  const handleSubmitForAppeal = () => {
    toast.success("Your appeal is submitted");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="flex flex-col md:flex-col lg:flex-row gap-6">
        {/* Left Column */}
        <div className="w-full md:w-full lg:w-3/12 bg-white rounded-lg p-6 flex flex-col items-center text-center light-shadow">
          <h2 className="text-gray-700 text-base font-semibold mb-2">
            Audit Status
          </h2>

          <div className="text-[#6E39CB] text-6xl font-bold">{submittedAudit?.data?.audit_response?.total_issues}</div>

          <p className="text-gray-500 text-[15px] mt-2">errors found</p>

          <button className="mt-2 text-[#6E39CB] text-base font-medium border border-[#00000026] rounded-md px-4 py-2">
            Audit date: {formattedDate}
          </button>
        </div>

        {/* Right Column */}
        <div className="w-full md:w-full lg:w-9/12 bg-white rounded-lg p-6 light-shadow">
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row">
              <span className="w-40 text-gray-700 text-sm">Receipt No:</span>
              <span className="text-gray-800 text-sm">{invoice_number}</span>
            </div>
            <div className="flex flex-col sm:flex-row">
              <span className="w-40 text-gray-700 text-sm">
                Discharge Date:
              </span>
              <span className="text-gray-800 text-sm">{date}</span>
            </div>
            <div className="flex flex-col sm:flex-row">
              <span className="w-40 text-gray-700 text-sm">Patient Name:</span>
              <span className="text-gray-800 text-sm">{patient_information.name}</span>
            </div>
            <div className="flex flex-col sm:flex-row">
              <span className="w-40 text-gray-700 text-sm">Hospital:</span>
              <span className="text-gray-800 text-sm">
                {hospital_name}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row font-semibold">
              <span className="w-40 text-gray-900 text-[15px]">
                Bill Total:
              </span>
              <span className="text-black text-[15px]">${total}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 bg-white rounded-lg shadow-md lg:mt-6 mt-4 lg:mb-8 mb-4">
        {/* Header Section */}
        <div className="lg:flex flex-col md:flex-row md:justify-between items-center mb-4 gap-2">
          <p className="text-lg font-semibold text-black text-left md:text-left lg:text-left inline-flex items-center gap-2 relative pr-8">
            Select to Appeal{" "}
            <span
              className="absolute top-[-4px] right-0 text-white bg-purple rounded-full cursor-pointer flex items-center justify-center text-xs h-5 w-5"
              onClick={() => setModalOpen(true)}
            >
              i
            </span>
          </p>

          <button
            className="hidden lg:flex bg-gradient-to-r bg-[#8771BC] text-white px-6 py-2 rounded-md items-center shadow-md hover:shadow-lg transition-shadow md:w-auto justify-center"
            onClick={handleSubmitForAppeal}
            >
            Submit for Appeal
          </button>
        </div>

        {/* Responsive Table Container */}
        <div className="overflow-hidden">
          {/* Desktop Table (Visible only on lg screens) */}
          <div className="hidden md:hidden lg:block">
            <table className="w-full min-w-[400px]">
              {/* Table Head */}
              <thead>
                <tr className="pb-4 text-lg">
                  <th
                    className="p-3 font-semibold text-left lg:py-4"
                    colSpan={2}
                  >
                    <Checkbox />
                  </th>
                  <th
                    className="font-semibold text-left lg:py-4 pr-3"
                    colSpan={4}
                  >
                    Severity
                  </th>
                  <th className="font-semibold text-left lg:py-4">Item</th>
                  <th className="font-semibold text-left lg:py-4">
                    Issue Description
                  </th>
                  <th className="font-semibold text-right lg:py-4">
                    Amount (USD)
                  </th>
                </tr>
              </thead>
              {/* Table Body */}
              <tbody>
                {billingData?.map((data) => (
                  <tr
                    key={data.id}
                    className="text-[#89868D] border-t border-[#89868d4a] text-sm"
                  >
                    <td
                      className="font-semibold text-left p-3 lg:py-5"
                      colSpan={2}
                    >
                      <Checkbox />
                    </td>
                    <td colSpan={4}>
                      <button
                        className={
                          severityClasses[
                            data.severity as keyof typeof severityClasses
                          ]
                        }
                      >
                        {data.severity}
                      </button>
                    </td>
                    <td>{data.item}</td>
                    <td>{data.issueDescription}</td>
                    <td className="text-end">{data.amount.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile & Medium Screen Cards (Shown on md & smaller screens) */}
          <div className="block md:block lg:hidden space-y-4">
            {billingData?.map((data) => (
              <div
                key={data.id}
                className="p-4 border border-[#89868d4a] rounded-lg"
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-center space-x-3">
                    <Checkbox />
                    <div className="font-medium text-gray-900">{data.item}</div>
                  </div>
                  <div className="text-right font-semibold">
                    ${data.amount.toFixed(2)}
                  </div>
                </div>

                <div className="mt-3">
                  <div className="text-sm text-[#89868D] mt-1 mb-2">
                    {data.issueDescription}
                  </div>
                  <button
                    className={
                      severityClasses[
                        data.severity as keyof typeof severityClasses
                      ]
                    }
                  >
                    {data.severity}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Summary div  */}
      <div className="bg-white p-6 rounded-lg border border-gray-300 lg:w-100 lg:float-right">
        <div className="space-y-4">
          <div className="flex justify-between">
            <h2 className="text-lg font-medium text-gray-800 mb-4">Summary</h2>
            <span className="text-primary text-[14px] font-normal">
              Amount (USD)
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600 text-[14px] font-normal ">
              Appeal Selected Total
            </span>
            <span className="text-primary text-[14px] font-normal">
              $378.72
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600 text-[14px] font-normal">
              Lower Bound (Reds only)
            </span>
            <span className="text-primary text-[14px] font-normal">
              $378.72
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600 text-[14px] font-normal">
              Upper Bound (Red + Yellow)
            </span>
            <span className="text-primary text-[14px] font-normal">
              $457.15
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600 text-[14px] font-normal mr-6">
              Adjusted Final Bill (if all appeals succeed)
            </span>
            <span className="text-primary text-[14px] font-normal">
              $14,004.26
            </span>
          </div>
        </div>
      </div>

      <button 
        className=" mt-4 lg:hidden bg-gradient-to-r bg-[#8771BC] text-white px-6 py-2 rounded-md items-center shadow-md hover:shadow-lg transition-shadow w-full justify-center"
        onClick={handleSubmitForAppeal}
        >
        Submit for Appeal
      </button>

      {/* Modal Component */}
      <AuditFindingsModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}
