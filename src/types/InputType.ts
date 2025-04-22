/* eslint-disable @typescript-eslint/no-explicit-any */
export interface InputProps {
    type?: string;
    placeholder?: string;
    value?: string; // Ensure this is included
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    [key: string]: any; // Optional: Allow additional props
    
  }