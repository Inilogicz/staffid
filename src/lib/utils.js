// src/lib/utils.js
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

// --- ADD THIS NEW FUNCTION ---
export function convertGoogleDriveUrl(url) {
  if (!url || !url.includes('drive.google.com')) {
    // If it's not a google drive link, return it as is or a default placeholder
    return url || '/assets/hero.jpg'; // Default placeholder image
  }
  
  try {
    const urlObject = new URL(url);
    const fileId = urlObject.searchParams.get('id');
    
    if (!fileId) {
      return '/assets/hero.jpg'; // Return placeholder if ID is not found
    }
    
    // Return the direct content link format
    return `https://drive.google.com/uc?id=${fileId}`;
    
  } catch (error) {
    console.error("Invalid URL for conversion:", url);
    return '/assets/hero.jpg'; // Fallback on any error
  }
}