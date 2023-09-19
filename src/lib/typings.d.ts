import Feedback from "@/app/feedback/page";

export type Service = {
  _id: string;
  description: string;
  type: string;
  caseType?: string;
  price?: string;
  LegalProviderId?: User;
  state: string;
  city: string;
  life: string;
  feedback?: boolean
};

type User = {
  username: string;
  pfp: string;
  role?: string;
  type?: string;
} | null;

type Feedback = {
  _id: string;
  description: string;
  uid: User;
};
