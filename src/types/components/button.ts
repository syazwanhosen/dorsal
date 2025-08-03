export interface ButtonGroupProps<T extends string> {
    options: T[];
    selected: T;
    onSelect: (value: T) => void;
}

export type ToggleButton = {
    open: boolean;
    setOpen?: (open: boolean) => void;
};