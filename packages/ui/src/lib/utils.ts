import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { CHART_COLORS } from "./constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Returns a color string for a given project by hashing its name.
 *
 * @param inputString - The project identifier or name.
 * @returns The color as an rgba string.
 */
export function getColorForString(inputString: string): string {
  const hash = inputString.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return CHART_COLORS[hash % CHART_COLORS.length] || '#000000';
}
