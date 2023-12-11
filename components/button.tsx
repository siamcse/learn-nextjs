import { VariantProps, cva } from "class-variance-authority";

const button = cva("button", {
    variants: {
        intent: {
            primary: [
                "bg-teal-600",
                "text-white",
                "border-transparent",
                "hover:bg-teal-700",
            ],
            secondary: [
                "bg-red-600",
                "text-white",
                "border-gray-400",
                "hover:bg-red-700",
            ],
        },
        size: {
            small: ["text-sm", "py-1", "px-2"],
            medium: ["text-base", "py-2", "px-4"]
        }
    },
    compoundVariants: [{
        intent: "primary",
        size: "medium",
        class: "uppercase"
    }],
    defaultVariants: {
        intent: "primary",
        size: "medium"
    }
});

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof button> { }

export const Button: React.FC<ButtonProps> = ({
    className,
    intent,
    size,
    ...props
}) => <button className={button({ intent, size, className })} {...props} />