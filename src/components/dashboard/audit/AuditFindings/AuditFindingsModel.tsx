import { useState, FC, MouseEvent } from "react";
import { X } from "lucide-react";

interface AuditFindingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const levels = ["Simple", "Standard", "Technical"];
const positions = [0, 47, 98]; // Predefined handle positions

const AuditFindingsModal: FC<AuditFindingsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [currentLevel, setCurrentLevel] = useState(0); // 0 = Simple, 1 = Standard, 2 = Technical

  const handleBarClick = (event: MouseEvent<HTMLDivElement>) => {
    const barRect = event.currentTarget.getBoundingClientRect();
    const clickPosition = event.clientX - barRect.left;
    const barWidth = barRect.width;

    // Find the closest predefined position
    const closestLevel = positions.reduce((prev, curr, index) => 
      Math.abs(curr - (clickPosition / barWidth) * 100) < Math.abs(prev - (clickPosition / barWidth) * 100) 
        ? index 
        : prev
    , 0);

    setCurrentLevel(closestLevel);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-md shadow-lg w-[600px] max-w-[90%] max-h-[80vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex justify-between items-center p-4 lg:px-6 lg:py-4">
          <p className="text-gray-900 text-[14px] lg:text-base">Explanation Complexity Level</p>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-700 focus:outline-none" 
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <hr className="border-t border-gray-300 w-full" />

        {/* Progress Bar Section */}
        <div className="p-4 lg:px-6 lg:py-4">
          <p className="text-xs text-purple-600 mb-3 lg:mt-2">Currently set to: {levels[currentLevel]} explanations</p>
          <div 
            className="relative w-full h-2 bg-gradient-to-r from-[#F3CC5C] via-[#AFB940] to-[#6CA724] rounded-full cursor-pointer" 
            onClick={handleBarClick}
          >
            {/* Circular Handle (Snaps to Clicked Position) */}
            <div 
              className="absolute top-[-8px] h-5 w-5 bg-white border border-gray-400 rounded-full cursor-pointer transition-all duration-200"
              style={{ left: `${positions[currentLevel]}%` }}
            ></div>
          </div>

          {/* Level Markers */}
          <div className="flex justify-between mt-1">
            {levels.map((level) => (
              <span key={level} className="text-xs text-[#89868D]">
                {level}
              </span>
            ))}
          </div>
        </div>

        <p className="text-xs text-purple-600 lg:px-6 lg:pb-2 px-4 py-2">AI Assistant Explanation</p>

        {/* AI Assistant Explanation */}
        <div className="space-y-4 border border-gray-200 rounded-lg bg-white lg:px-4 lg:py-4 p-4 lg:mx-6 lg:mb-6 mx-4 mb-4">
          {[
            { title: "ICU Room & Nursing", text: "You were charged for 5 days in the ICU, but your medical records only show 4 days. This looks like a mistake that you should appeal." },
            { title: "Cardiologist Fees", text: "There's no record of seeing the heart doctor on Day 5. This fee should be removed." },
            { title: "Medication & Consumables", text: "You were charged for medical supplies that weren't used. Even though it's a smaller amount, it's still wrong." },
            { title: "Operating Theatre & CABG Surgery Package", text: "These charges are correct and match your treatment records." }
          ].map((item, index) => (
            <div key={index} className="text-xs lg:text-xs">
              <span className="font-semibold">{item.title}</span>: {item.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AuditFindingsModal;
