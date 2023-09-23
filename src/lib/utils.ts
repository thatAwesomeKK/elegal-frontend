import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
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
] as const;

export const type = [
  { label: "Notaries", value: "notary" },
  { label: "Arbitrators", value: "arbitrators" },
  { label: "Mediators", value: "mediators" },
  { label: "Document Writer", value: "document-writer" },
  { label: "Advocate", value: "advocate" },
] as const;

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
] as const;

export const services = [
  {
    type: "advocate",
    image: "/assets/advocate.png",
    url: "/services/advocate",
  },
  {
    type: "notary",
    image: "/assets/stamp_paper.jpg",
    url: "/services/notary",
  },
  {
    type: "arbitrator",
    image: "/assets/arbitrator.jpg",
    url: "/services/arbitrator",
  },
  {
    type: "mediator",
    image: "/assets/mediator.jpg",
    url: "/services/mediator",
  },
  {
    type: "document writer",
    image: "/assets/document_writers.jpg",
    url: "/services/document-writer",
  },
] as const;
