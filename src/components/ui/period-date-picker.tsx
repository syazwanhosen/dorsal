import { useState, useEffect, useMemo } from 'react';
import { format } from 'date-fns';
import { DateRange } from 'react-day-picker';
import { CalendarIcon } from '@radix-ui/react-icons';

// Components
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/buttons/button';

// Utils
import { cn } from '@/lib/utils';

// Types
import { PeriodDatePickerProps } from '@/types';

export function PeriodDatePicker({
    value,
    onChange,
    className,
    placeholder = 'Select date',
    allowClear = false,
    disabled = false,
    mode = 'single',
    ...calendarProps
}: PeriodDatePickerProps) {
    const isControlled = value !== undefined;

    const [uncontrolledValue, setUncontrolledValue] = useState<
        Date | Date[] | DateRange | undefined
    >(value);

    const selected = isControlled ? value : uncontrolledValue;

    // Sync internal state with external value in controlled mode
    useEffect(() => {
        if (isControlled) {
            setUncontrolledValue(value);
        }
    }, [value, isControlled]);

    const handleSelect = (date: Date | Date[] | DateRange | undefined) => {
        if (!isControlled) {
            setUncontrolledValue(date);
        }
        onChange?.(date);
    };

    const handleClear = () => {
        if (!isControlled) {
            setUncontrolledValue(undefined);
        }
        onChange?.(undefined);
    };

    const renderLabel = useMemo(() => {
        if (!selected) return placeholder;

        if (mode === 'range' && typeof selected === 'object' && 'from' in selected) {
            const { from, to } = selected;
            if (from && to) return `${format(from, 'd MMM yyyy')} - ${format(to, 'd MMM yyyy')}`;
            if (from) return `${format(from, 'd MMM yyyy')} - ...`;
            return placeholder;
        }

        if (mode === 'multiple' && Array.isArray(selected)) {
            return selected.length > 0
                ? selected.map((date) => format(date, 'd MMM yyyy')).join(', ')
                : placeholder;
        }

        if (selected instanceof Date) {
            return format(selected, 'd MMM yyyy');
        }

        return placeholder;
    }, [selected, placeholder, mode]);

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    type="button"
                    disabled={disabled}
                    variant="ghost"
                    className={cn(
                        'flex items-center justify-between rounded-md border border-gray-300 px-3 py-2 text-sm text-left shadow-sm focus:outline-none focus:ring-ring disabled:opacity-50',
                        !selected && 'text-muted-foreground',
                        className
                    )}
                >
                    <span>{renderLabel}</span>
                    <CalendarIcon className="ml-2 h-4 w-4 opacity-50" />
                </Button>
            </PopoverTrigger>

            <PopoverContent align="start" className="w-auto p-4 space-y-2 border-gray-300">
                <Calendar
                    mode={mode}
                    selected={selected as any}
                    onSelect={handleSelect as any}
                    {...calendarProps}
                />

                {allowClear && selected && (
                    <div className="flex justify-end">
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={handleClear}
                        >
                            Clear
                        </Button>
                    </div>
                )}
            </PopoverContent>
        </Popover>
    );
}
