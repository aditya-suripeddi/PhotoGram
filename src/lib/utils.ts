import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

// shadcn-ui prompt: @lib/utils
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
