import { cn } from "@/utils/cn";
import { cva } from "class-variance-authority";
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "link";
  size?: "sm" | "md" | "lg";
}

export const buttonVariants = cva(
  "rounded-md cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300",
  {
    variants: {
      variant: {
        primary: "bg-primary text-secondary hover:bg-primary/80",
        secondary: "bg-gray-900 border-white/20 border text-white hover:bg-secondary/30",
        outline: "bg-transparent border border-primary text-primary",
        ghost: "bg-transparent text-primary hover:text-primary/80",
        link: "bg-transparent text-primary",
      },
      size: {
        sm: "",
        md: "",
        lg: "",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export default function Button({ children, className, variant, size = "md", ...props }: ButtonProps) {
  const sizeStyles = {
    sm: {
      fontSize: "clamp(0.875rem, 1vw, 1rem)",
      paddingTop: "clamp(0.5rem, 0.75vw, 0.75rem)",
      paddingBottom: "clamp(0.5rem, 0.75vw, 0.75rem)",
      paddingLeft: "clamp(0.75rem, 1.25vw, 1.25rem)",
      paddingRight: "clamp(0.75rem, 1.25vw, 1.25rem)",
    },
    md: {
      fontSize: "clamp(1rem, 1.25vw, 1.25rem)",
      paddingTop: "clamp(0.5rem, 0.75vw, 1rem)",
      paddingBottom: "clamp(0.5rem, 0.75vw, 1rem)",
      paddingLeft: "clamp(1rem, 1.5vw, 1.5rem)",
      paddingRight: "clamp(1rem, 1.5vw, 1.5rem)",
    },
    lg: {
      fontSize: "clamp(1.125rem, 1.5vw, 1.5rem)",
      paddingTop: "clamp(0.75rem, 1vw, 1.25rem)",
      paddingBottom: "clamp(0.75rem, 1vw, 1.25rem)",
      paddingLeft: "clamp(1.25rem, 2vw, 2rem)",
      paddingRight: "clamp(1.25rem, 2vw, 2rem)",
    },
  };

  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      style={sizeStyles[size]}
      {...props}
    >
      {children}
    </button>
  );
}
