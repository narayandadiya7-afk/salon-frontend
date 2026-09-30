import type { Metadata } from "next";
import { SolutionPageTemplate } from "@/components/admin/admin-website/solution-page-template";

const TITLE = "Lash & Brow Studio Management & Booking Software | Fyncho";
const DESCRIPTION =
  "Fyncho helps lash and brow studios manage online bookings, technician schedules, treatment durations and client records — all from one platform.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: { title: TITLE, description: DESCRIPTION, type: "website" },
  twitter: { card: "summary_large_image" },
};

export default function LashBrowPage() {
  return (
    <SolutionPageTemplate
      eyebrow="Lash & Brow Studios"
      heroTitle={<>Lash and brow studio management built around precision and repeat customers.</>}
      heroIntro="Fyncho gives lash and brow studios a professional software, direct online booking and the tools to manage every technician, treatment and customer record — without the admin."
      heroImage="/assets/admin-website/avivane-banner-craft.jpg"
      heroImageAlt="Lash technician performing a lash extension treatment"
      challenges={[
        {
          title: "Precise treatment durations",
          description: "Lash and brow services have specific durations that vary by treatment type and technician. The calendar needs to handle this accurately to prevent overruns.",
        },
        {
          title: "High repeat visit frequency",
          description: "Lash fills and brow maintenance are booked every two to six weeks. Rebooking at the end of each appointment is important for customer retention.",
        },
        {
          title: "Patch test tracking",
          description: "Many lash and brow treatments require a patch test record before proceeding. Tracking this for each customer needs a reliable system.",
        },
        {
          title: "Presenting work visually",
          description: "New customers want to see your work before booking. A gallery on your own software is more effective than a social feed.",
        },
      ]}
      howFynchoHelps={[
        {
          title: "Online booking",
          description: "Customers book their treatment and technician from your own software. Durations are set per service, so the calendar never overruns.",
        },
        {
          title: "Service management",
          description: "Define each treatment — classic lashes, volume, hybrid, brow lamination, tinting — with precise durations and pricing.",
        },
        {
          title: "Staff management",
          description: "Set each technician's availability and treatment menu. Customers book the right person for their service automatically.",
        },
        {
          title: "Customer management",
          description: "Customer profiles hold treatment history, notes and any patch test records — so your team is always working from the right information.",
        },
        {
          title: "Gallery",
          description: "Showcase your work through your branded software gallery to convert prospective customers.",
        },
        {
          title: "Deposits & reminders",
          description: "Require a deposit for new customers and send automated reminders to reduce no-shows on your tightly scheduled days.",
        },
      ]}
      useCases={[
        "Classic, hybrid and volume lash extensions",
        "Lash lift and tint",
        "Lash fill appointments",
        "Brow lamination",
        "Brow tinting and shaping",
        "HD and combination brow treatments",
        "Patch test tracking and records",
        "Repeat customer rebooking at end of appointment",
      ]}
      benefits={[
        "Precise service durations keep your schedule running without overruns",
        "Customer records include treatment history and notes for consistent results",
        "Deposits and reminders protect your tightly scheduled diary",
      ]}
      relatedSolutions={[
        { label: "Beauty Salons", to: "/solutions/beauty-salon" },
        { label: "Nail Salons", to: "/solutions/nail-salon" },
        { label: "Makeup Artists", to: "/solutions/makeup-artist" },
        { label: "Freelancers", to: "/solutions/freelancers" },
      ]}
    />
  );
}
