import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { formatDistanceToNowStrict } from "date-fns";
import { User } from "@clerk/nextjs/server";
import { UserResource } from "@clerk/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

export function timeAgo(date: Date): string {
  return formatDistanceToNowStrict(date, { addSuffix: true });
}

export function titleToSlug(title: string): string {
  return title.toLowerCase().trim().replace(/ /g, "-").replace(/^[w-]/g, "-");
}

export function isAdmin(user: User | UserResource) {
  return user.publicMetadata.role === "admin";
}
