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
      heroTitle={<>Lash and brow studio management built around precision and repeat clients.</>}
      heroIntro="Fyncho gives lash and brow studios a professional website, direct online booking and the tools to manage every technician, treatment and client record — without the admin."
      heroImage="/assets/admin-website/avivane-banner-craft.jpg"
      heroImageAlt="Lash technician performing a lash extension treatment"
      challenges={[
        {
          title: "Precise treatment durations",
          description: "Lash and brow services have specific durations that vary by treatment type and technician. The calendar needs to handle this accurately to prevent overruns.",
        },
        {
          title: "High repeat visit frequency",
          description: "Lash fills and brow maintenance are booked every two to six weeks. Rebooking at the end of each appointment is important for client retention.",
        },
        {
          title: "Patch test tracking",
          description: "Many lash and brow treatments require a patch test record before proceeding. Tracking this for each client needs a reliable system.",
        },
        {
          title: "Presenting work visually",
          description: "New clients want to see your work before booking. A gallery on your own website is more effective than a social feed.",
        },
      ]}
      howFynchoHelps={[
        {
          title: "Online booking",
          description: "Clients book their treatment and technician from your own website. Durations are set per service, so the calendar never overruns.",
        },
        {
          title: "Service management",
          description: "Define each treatment — classic lashes, volume, hybrid, brow lamination, tinting — with precise durations and pricing.",
        },
        {
          title: "Staff management",
          description: "Set each technician's availability and treatment menu. Clients book the right person for their service automatically.",
        },
        {
          title: "Customer management",
          description: "Client profiles hold treatment history, notes and any patch test records — so your team is always working from the right information.",
        },
        {
          title: "Gallery",
          description: "Showcase your work through your branded website gallery to convert prospective clients.",
        },
        {
          title: "Deposits & reminders",
          description: "Require a deposit for new clients and send automated reminders to reduce no-shows on your tightly scheduled days.",
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
        "Repeat client rebooking at end of appointment",
      ]}
      benefits={[
        "Precise service durations keep your schedule running without overruns",
        "Client records include treatment history and notes for consistent results",
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
