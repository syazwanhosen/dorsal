import { LabelHTMLAttributes, FC } from "react";
import { cn } from "@/lib/utils";

const labelVariants = "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70";

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  className?: string;
}

export const Label: FC<LabelProps> = ({ className, ...props }) => {
  return <label className={cn(labelVariants, className)} {...props} />;
};
