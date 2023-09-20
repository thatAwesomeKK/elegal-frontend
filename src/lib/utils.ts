import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const specializations = [
  { label: "Criminal", value: "criminal" },
  { label: "Civil", value: "civil" },
  { label: "Family", value: "family" },
  { label: "Real Estate", value: "real-estate" },
  { label: "Corporate and Business", value: "corporate-business" },
  { label: "Employment and Labor", value: "employment-labor" },
  { label: "Intellectual Property", value: "intellectual-property" },
  { label: "Tax", value: "tax" },
  { label: "Constitutional", value: "constitutional" },
  { label: "Immigration", value: "immigration" },
  { label: "Human Rights", value: "human-rights" },
] as const

export const type = [
  { label: "Notaries", value: "notary" },
  { label: "Arbitrators", value: "arbitrators" },
  { label: "Mediators", value: "mediators" },
  { label: "Document Writer", value: "document-writer" },
  { label: "Advocate", value: "advocate" },
] as const

export const case_type = [
  { label: "Criminal", value: "criminal" },
  { label: "Civil", value: "civil" },
  { label: "Family", value: "family" },
  { label: "Real Estate", value: "real-estate" },
  { label: "Corporate and Business", value: "corporate-business" },
  { label: "Employment and Labor", value: "employment-labor" },
  { label: "Intellectual Property", value: "intellectual-property" },
  { label: "Tax", value: "tax" },
  { label: "Constitutional", value: "constitutional" },
  { label: "Immigration", value: "immigration" },
  { label: "Human Rights", value: "human-rights" },
] as const
