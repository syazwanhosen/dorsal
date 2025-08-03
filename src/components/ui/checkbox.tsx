import { ComponentPropsWithoutRef, forwardRef, ElementRef } from 'react';
import { Root, Indicator } from '@radix-ui/react-checkbox';
import { CheckIcon } from '@radix-ui/react-icons';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const checkboxVariants = cva(
  'peer h-5 w-5 shrink-0 rounded-md border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'border-gray-300 bg-white data-[state=checked]:bg-primary data-[state=checked]:border-primary',
        subtle:
          'border-transparent bg-muted data-[state=checked]:bg-primary data-[state=checked]:border-primary',
        outline:
          'border-input bg-transparent data-[state=checked]:bg-primary data-[state=checked]:border-primary',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface CheckboxProps
  extends ComponentPropsWithoutRef<typeof Root>,
    VariantProps<typeof checkboxVariants> {
  label?: string;
  className?: string;
}

const Checkbox = forwardRef<
  ElementRef<typeof Root>,
  CheckboxProps
>(({ className, variant, label, ...props }, ref) => {
  return (
    <label className="flex items-center gap-2 cursor-pointer text-muted-foreground">
      <Root
        ref={ref}
        className={cn(checkboxVariants({ variant }), className)}
        {...props}
      >
        <Indicator className="flex items-center justify-center text-white">
          <CheckIcon className="h-4 w-4" />
        </Indicator>
      </Root>
      {label && <span className="text-sm">{label}</span>}
    </label>
  );
});

Checkbox.displayName = 'Checkbox';

export { Checkbox, checkboxVariants };
