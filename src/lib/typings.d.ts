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
};

type User = {
  username: string;
  pfp: string;
  role?: string;
} | null;
