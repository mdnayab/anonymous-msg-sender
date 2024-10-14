import * as React from "react";
import { cn } from "@/lib/utils";

// Extend InputHTMLAttributes for type safety
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  // You can also specify default props here if needed, for example:
  type?: string; // optional if you want to have a default
}

// Forward ref to the input component for better accessibility
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", ...props }, ref) => { // Default type to "text"
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props} // Spread all other props to the input
      />
    );
  }
);

Input.displayName = "Input"; // Helpful for debugging

export { Input }; // Export the Input component
