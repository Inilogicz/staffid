import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

/**
 * Creates fallback initials from a full name.
 * e.g., "John Smith" -> "JS"
 */
export const getInitials = (name = '') => {
  if (!name) return '??';
  const names = name.split(' ');
  if (names.length === 1) return names[0].charAt(0).toUpperCase();
  return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
};

/**
 * Returns a usable image URL.
 * - If it's a Cloudinary URL, it's used directly.
 * - If it's a Google Drive URL, it creates a proxy link.
 * - Otherwise, it returns null.
 */
export const getImageUrl = (url) => {
  if (!url) return null;
  
  if (url.includes('cloudinary')) {
    return url;
  }
  
  if (url.includes('drive.google.com')) {
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    return `${baseUrl}/api/image/proxy?url=${encodeURIComponent(url)}`;
  }
  
  return null;
};