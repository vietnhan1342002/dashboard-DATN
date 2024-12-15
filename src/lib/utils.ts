import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getFormattedDate(format:string) {
  const currentDate = new Date();

  if (format === 'date') {
    return currentDate.toISOString().slice(0, 10);
  }

  return currentDate.toISOString();
}