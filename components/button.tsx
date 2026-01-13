import { cn } from "@/utils/cn";
import { cva } from "class-variance-authority";
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "link" | "blue" | "lineBlue" | "yellow" | "dark";
  size?: "sm" | "md" | "lg";
}

export const buttonVariants = cva(
  "rounded-lg cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300",
  {
    variants: {
      variant: {
        primary: "bg-primary text-secondary hover:bg-primary/80",
        secondary: "bg-gray-900 border-white/20 border text-white hover:bg-secondary/30",
        blue: "flex items-center justify-center gap-2  rounded-xl bg-gradient-to-r from-[#0d8d82] to-[#12b3a6] text-white   hover:scale-[1.02] transition-all duration-300 shadow-lg  ",
        lineBlue: "flex-1 flex items-center justify-center gap-2  rounded-xl border border-[#0d8d82] text-[#0d8d82]   hover:bg-[#0d8d82] hover:text-white transition-all duration-300  ",
        yellow:"  bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold   transition-all duration-300 hover:shadow-xl hover:scale-105",
        dark: "  bg-slate-800 text-white font-bold   transition-all duration-300 hover:bg-slate-900 hover:scale-105 ",

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
      fontSize: "clamp(1rem, 2vw, 1.5rem)",
      paddingTop: "clamp(0.5rem, 0.75vw, 0.75rem)",
      paddingBottom: "clamp(0.5rem, 0.75vw, 0.75rem)",
      paddingLeft: "clamp(0.75rem, 1.25vw, 1.25rem)",
      paddingRight: "clamp(0.75rem, 1.25vw, 1.25rem)",
    },
    md: {
      fontSize: "clamp(2rem, 2.25vw, 1.25rem)",
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





// import * as React from "react";
// import { cn } from "@/utils/cn";
// import { cva, type VariantProps } from "class-variance-authority";

// const buttonVariants = cva(
//   "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none",
//   {
//     variants: {
//       variant: {
//         primary:
//           "bg-primary text-secondary hover:bg-primary/80",
//         secondary:
//           "bg-gray-900 border border-white/20 text-white hover:bg-secondary/30",
//         blue:
//           "bg-gradient-to-r from-[#0d8d82] to-[#12b3a6] text-white hover:scale-[1.02] shadow-lg",
//         lineBlue:
//           "border border-[#0d8d82] text-[#0d8d82] hover:bg-[#0d8d82] hover:text-white",
//         outline:
//           "border border-primary text-primary hover:bg-primary/10",
//         ghost:
//           "bg-transparent text-primary hover:text-primary/80",
//         link:
//           "bg-transparent text-primary underline-offset-4 hover:underline",
//       },
//       size: {
//         sm: "px-[clamp(0.75rem,1.5vw,1.25rem)] py-[clamp(0.4rem,0.8vw,0.7rem)] text-[clamp(0.875rem,1.5vw,1rem)]",
//         md: "px-[clamp(1rem,2vw,1.5rem)] py-[clamp(0.5rem,1vw,1rem)] text-[clamp(1rem,2vw,1.125rem)]",
//         lg: "px-[clamp(1.25rem,3vw,2rem)] py-[clamp(0.75rem,1.5vw,1.25rem)] text-[clamp(1.125rem,2.5vw,1.375rem)]",
//       },
//     },
//     defaultVariants: {
//       variant: "primary",
//       size: "md",
//     },
//   }
// );

// export interface ButtonProps
//   extends React.ButtonHTMLAttributes<HTMLButtonElement>,
//     VariantProps<typeof buttonVariants> {}

// const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
//   ({ className, variant, size, ...props }, ref) => {
//     return (
//       <button
//         ref={ref}
//         className={cn(buttonVariants({ variant, size }), className)}
//         {...props}
//       />
//     );
//   }
// );

// Button.displayName = "Button";

// export default Button;
