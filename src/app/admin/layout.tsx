import { ClerkProvider } from "@clerk/nextjs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "admin ",
  description:
    "Discover Jobs. Browse through thousands of job opportunities, filter by location, skills, and more.",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ClerkProvider>{children}</ClerkProvider>;
}
