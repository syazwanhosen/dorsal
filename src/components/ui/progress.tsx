import { FC } from "react";
import { cn } from "@/lib/utils";

interface ProgressProps {
  value: number;
  className?: string;
}

const Progress: FC<ProgressProps> = ({ value, className }) => {
  return (
    <div className={cn("relative h-4 w-full overflow-hidden rounded-full bg-gray-200", className)}>
      <div
        className="h-full bg-blue-500 transition-all duration-300"
        style={{ width: `${value}%` }}
      ></div>
    </div>
  );
};

export default Progress;
