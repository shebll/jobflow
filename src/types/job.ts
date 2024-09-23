// types/index.ts
export interface JobType {
  id: number;
  slug: string;
  title: string;
  type: string;
  locationType: string;
  timezonePreference: string;
  location: string | null;
  description: string;
  category: string;
  experienceLevel: string;
  skills: string[];
  subcategories: string[];
  salary: number;
  contractDuration: string;
  currency: string;
  negotiable: boolean;
  companyName: string;
  applicationEmail: string;
  applicationUrl: string | null;
  companyLogoUrl: string | null;
  approved: boolean;
  createdAt: Date;
  updatedAt: Date;
}
