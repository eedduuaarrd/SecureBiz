import { ObjectId } from "mongodb";

export type Sector = {
  _id: ObjectId;
  name: string;
  slug: string;
  main_risks: string[];
};

export type Regulation = {
  _id: ObjectId;
  name: string;
  slug: string;
  description: string;
  country: string;
};

export type GuideFaq = {
  question: string;
  answer: string;
};

export type GeneratedContent = {
  _id: ObjectId;
  sector_id: ObjectId;
  regulation_id: ObjectId;
  title: string;
  full_text: string;
  meta_description: string;
  keywords: string[];
  /** FAQs per fragments rics i secció visible */
  faqs?: GuideFaq[];
  sector_slug: string;
  regulation_slug: string;
  created_at: Date;
};

export type Lead = {
  _id: ObjectId;
  name: string;
  email: string;
  company: string;
  sector: string;
  timestamp: Date;
};
