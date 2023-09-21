import Feedback from "@/app/feedback/page";
import { UseFormReturn } from "react-hook-form";

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
  feedback?: boolean;
  PotentialProviders: [Provider];
};

export type formSchemaType = Array<{
  isWatch?: boolean;
  isGroup?: boolean;
  control?: UseFormReturn.control<any>;
  name?: string;
  renderItem?: string;
  label?: string;
  placeholder?: string;
  type?: string;
  form?: UseFormReturn<any>;
  groupItems?: Array[formSchemaType];
  radioItems?: Array[{
    label: string;
    value: string;
  }];
  watchItems?: Array[formSchemaType];
  array?: Array[any];
  watch?: string;
  watchValue?: string;
}>;

type Provider = {
  _id: string;
  uid: User;
  price: string;
};

type User = {
  _id: string;
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
