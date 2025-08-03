import { ReactNode, FC } from "react";
import { Circle } from "lucide-react";

interface RadioGroupProps {
  options: string[];
  selectedValue: string;
  onChange: (value: string) => void;
  className?: string;
  children?: ReactNode; // ✅ Explicitly support nested children
}

export const RadioGroup: FC<RadioGroupProps> = ({ options, selectedValue, onChange, className }) => {
  return (
    <div className={`grid gap-2 ${className}`}>
      {options.map((option, index) => (
        <div key={index} className="flex items-center space-x-2">
          <RadioGroupItem
            value={option}
            id={`option-${index}`}
            selectedValue={selectedValue} // ✅ Ensure correct selection tracking
            onChange={onChange} // ✅ Pass the change handler properly
          />
          <label htmlFor={`option-${index}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700">
            {option}
          </label>
        </div>
      ))}
    </div>
  );
};

interface RadioGroupItemProps {
  value: string;
  id: string;
  selectedValue: string;
  onChange: (value: string) => void;
}

export const RadioGroupItem: FC<RadioGroupItemProps> = ({ value, id, selectedValue, onChange }) => {
    return (
      <label htmlFor={id} className="flex items-center cursor-pointer space-x-2">
        <input
          type="radio"
          id={id}
          name="radioGroup"
          value={value}
          checked={selectedValue === value}
          onChange={() => onChange(value)}
          className="hidden"
        />
        <div
          className={`aspect-square h-4 w-4 rounded-full border border-primary text-primary flex items-center justify-center transition-all ${
            selectedValue === value ? "bg-primary text-white" : ""
          }`}
        >
          {selectedValue === value && <Circle className="h-2.5 w-2.5 fill-current text-current" />}
        </div>
      
      </label>
    );
  };
  