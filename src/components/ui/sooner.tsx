import { useTheme } from "@/components/theme-provider";
import { Toaster as Sonner, type ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
    const { theme = "system" } = useTheme();

    return (
        <Sonner
            theme={theme as ToasterProps["theme"]}
            className="toaster group"
            style={
                {
                    "--normal-bg": "hsl(var(--popover))",
                    "--normal-text": "hsl(var(--popover-foreground))",
                } as React.CSSProperties
            }
            {...props}
        />
    );
};

export { Toaster };
