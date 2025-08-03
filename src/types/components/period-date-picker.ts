import { DateRange } from 'react-day-picker';

import { CalendarProps } from '@/components/ui/calendar';

export interface PeriodDatePickerProps
    extends Omit<CalendarProps, 'selected' | 'onSelect'> {
    value?: Date | Date[] | DateRange;
    onChange?: (value: Date | Date[] | DateRange | undefined) => void;
    className?: string;
    placeholder?: string;
    allowClear?: boolean;
    disabled?: boolean;
    mode?: 'single' | 'range' | 'multiple';
}