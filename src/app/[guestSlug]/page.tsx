import { notFound } from "next/navigation";
import guests from "@/data/guests.json";
import { Guest } from "@/types";
import WebsiteContent from "@/components/WebsiteContent";

interface PageProps {
  params: Promise<{ guestSlug: string }>;
}

export default async function GuestPage({ params }: PageProps) {
  const { guestSlug } = await params;
  const guest = (guests as Guest[]).find((g) => g.slug === guestSlug);

  if (!guest) {
    notFound();
  }

  return <WebsiteContent guest={guest} />;
}
