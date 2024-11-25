import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, formatDistanceToNow, intervalToDuration } from "date-fns";
import { z } from "zod";

import type { Locale } from "@/configs/i18n";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getInitials(fullName: string) {
  if (fullName.length === 0) return "";

  // Split the name by spaces
  const names = fullName.split(" ");
  // Extract the first letter of each name and convert it to uppercase
  const initials = names.map((name) => name.charAt(0).toUpperCase()).join("");

  return initials;
}

export const isEven = (num: number) => num % 2 === 0;

export const getCreditCardBrandName = (number: string) => {
  const re = {
    visa: /^4/,
    mastercard: /^5[1-5]/,
    amex: /^3[47]/,
    discover: /^6(?:011|5)/,
  };

  for (const [type, regex] of Object.entries(re)) {
    if (regex.test(number)) return type;
  }
  return "unknown";
};

export function remToPx(rem: number) {
  // Get the root font size (default is 16px if not set otherwise)
  const rootFontSize = parseFloat(
    getComputedStyle(document.documentElement).fontSize
  );
  return rem * rootFontSize;
}

export function isUrl(text: string) {
  return z.string().url().safeParse(text).success;
}

export function formatFileSize(bytes: number, decimals: number = 2) {
  if (bytes === 0) return "0 Bytes";

  const k = 1000; // Use 1024 for binary
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

export function formatFileType(type: string) {
  return type.slice(0, type.lastIndexOf("/"));
}

export function ratingToPercentage(rating: number, maxRating: number) {
  return (rating / maxRating) * 100;
}

export function formatCurrency(
  value: number,
  locales: Locale = "en",
  currency: string = "USD"
) {
  return new Intl.NumberFormat(locales, {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatPercent(value: number, locales: Locale = "en") {
  return new Intl.NumberFormat(locales, {
    style: "percent",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatDate(
  value: string | number | Date,
  locales: Locale = "en"
) {
  return format(value, "MMM dd, yyyy");
}

export function formatDateWithTime(
  value: string | number | Date,
  locales: Locale = "en"
) {
  return format(value, "MMM dd, yyyy hh:mm a");
}

export function formatDateShort(
  value: string | number | Date,
  locales: Locale = "en"
) {
  return format(value, "MMM dd");
}

export function formatDuration(value: string | number | Date) {
  const duration = intervalToDuration({ start: 0, end: value });

  const hours = duration.hours ? `${duration.hours}h` : "";
  const minutes = duration.minutes ? `${duration.minutes}m` : "";
  const seconds = duration.seconds ? `${duration.seconds}s` : "";

  return `${hours} ${minutes} ${seconds}`.trim();
}

export function formatDistance(value: string | number | Date) {
  const distance = formatDistanceToNow(value, { addSuffix: true });

  const replacements: Record<string, string> = {
    minute: "min",
    minutes: "mins",
    hour: "hr",
    hours: "hrs",
    day: "day",
    days: "days",
    month: "mo",
    months: "mos",
    year: "yr",
    years: "yrs",
  };

  if (distance === "less than a minute ago") {
    return "just now";
  }

  // Replace phrases based on the mapping
  return distance
    .replace(
      /less than a minute|minute|minutes|hour|hours|day|days|month|months|year|years/g,
      (match) => replacements[match]
    )
    .replace(/\b(over|almost|about)\b/g, "");
}

export function camelCaseToTitleCase(camelCaseStr: string) {
  let titleCaseStr = camelCaseStr
    .replace(/([A-Z])/g, " $1") // Insert space before uppercase letters
    .replace(/^./, (char) => char.toUpperCase()); // Capitalize the first letter

  return titleCaseStr;
}

export function ensurePrefix(str: string, prefix: string) {
  return str.startsWith(prefix) ? str : `${prefix}${str}`;
}

export function ensureSuffix(str: string, suffix: string) {
  return str.endsWith(suffix) ? str : `${str}${suffix}`;
}

export function withoutSuffix(str: string, suffix: string) {
  return str.endsWith(suffix) ? str.slice(0, -suffix.length) : str;
}

export function withoutPrefix(str: string, prefix: string) {
  return str.startsWith(prefix) ? str.slice(prefix.length) : str;
}

export function shuffleArray(array: any[]) {
  let currentIndex = array.length;
  let randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex !== 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}
