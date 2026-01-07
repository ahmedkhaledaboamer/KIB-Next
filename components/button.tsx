import { cn } from "@/utils/cn";
import { cva } from "class-variance-authority";
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "link";
  size?: "sm" | "md" | "lg";
}

export const buttonVariants = cva(
  "rounded-md px-4 py-2 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300",
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
        sm: "text-sm",
        md: "text-md",
        lg: "text-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export default function Button({ children, className, variant, size, ...props }: ButtonProps) {
  return (
    <button className={cn(buttonVariants({ variant, size, className }))} {...props}>
      {children}
    </button>
  );
}
