import { forwardRef, ElementRef, ComponentPropsWithoutRef }  from "react";
import {
  Root as Accordion,
  Item as AccordionItemBase,
  Header,
  Trigger as AccordionTriggerBase,
  Content as AccordionContentBase,
} from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

const AccordionItem = forwardRef<
  ElementRef<typeof AccordionItemBase>,
  ComponentPropsWithoutRef<typeof AccordionItemBase>
>(({ className, ...props }, ref) => (
  <AccordionItemBase ref={ref} className={cn("border-b", className)} {...props} />
));
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = forwardRef<
  ElementRef<typeof AccordionTriggerBase>,
  ComponentPropsWithoutRef<typeof AccordionTriggerBase>
>(({ className, children, ...props }, ref) => (
  <Header className="flex">
    <AccordionTriggerBase
      ref={ref}
      className={cn(
        "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
        className
      )}
      {...props}
    >
      {children}
      <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
    </AccordionTriggerBase>
  </Header>
));
AccordionTrigger.displayName = AccordionTriggerBase.displayName;

const AccordionContent = forwardRef<
  ElementRef<typeof AccordionContentBase>,
  ComponentPropsWithoutRef<typeof AccordionContentBase>
>(({ className, children, ...props }, ref) => (
  <AccordionContentBase
    ref={ref}
    className="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div className={cn("pb-4 pt-0 text-muted-foreground text-[16px]", className)}>
      {children}
    </div>
  </AccordionContentBase>
));
AccordionContent.displayName = AccordionContentBase.displayName;

export {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent
};
