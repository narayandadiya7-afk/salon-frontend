import type { Metadata } from "next";

import { SolutionPageTemplate } from "@/components/admin/admin-website/solution-page-template";

const TITLE = "Bridal Beauty Services Management & Booking Software | Fyncho";

const DESCRIPTION =
  "Fyncho helps bridal beauty professionals manage online bookings, services, customers, deposits and payments — all from one platform.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: { title: TITLE, description: DESCRIPTION, type: "website" },
  twitter: { card: "summary_large_image" },
};

export default function BridalPage() {
  return (
    <SolutionPageTemplate
      eyebrow="Bridal Services"
      heroTitle={
        <>Bridal beauty management built for the detail that weddings demand.</>
      }
      heroIntro="Fyncho gives bridal beauty professionals professional business software, online booking, and the tools to manage services, customers, appointments, and payments in one place."
      heroImage="/assets/admin-website/bridal-banner.png"
      heroImageAlt="Bridal beauty preparation with professional hair and makeup setup"
      challenges={[
        {
          title: "Managing important appointments",
          description:
            "Bridal services often involve appointments that need careful planning. Keeping services, durations, team availability, and bookings organized helps create a smoother experience.",
        },
        {
          title: "Deposits for important bookings",
          description:
            "High-value appointments can benefit from payment requirements at booking. Managing deposits manually can create unnecessary administrative work.",
        },
        {
          title: "Customer information",
          description:
            "Bridal customers need a smooth and consistent experience throughout their appointments. Keeping customer profiles and appointment history organized helps your team stay informed.",
        },
        {
          title: "Professional presentation",
          description:
            "Brides often explore a business before deciding to book. A professional online presence with clear services, team information, and a gallery helps customers understand what you offer.",
        },
      ]}
      howFynchoHelps={[
        {
          title: "Online booking",
          description:
            "Customers can explore your services and book appointments directly with your business, making it easy to schedule bridal beauty services.",
        },
        {
          title: "Service management",
          description:
            "Define your bridal beauty services with clear descriptions, durations, and pricing so customers know what they are booking.",
        },
        {
          title: "Deposits",
          description:
            "Require deposits as part of your booking process to help confirm important appointments and reduce unnecessary cancellations.",
        },
        {
          title: "Customer management",
          description:
            "Keep customer profiles and appointment history organized in one place, giving your team the information they need for a consistent experience.",
        },
        {
          title: "Gallery",
          description:
            "Showcase your bridal work through your business gallery so potential customers can explore your services and see your work before booking.",
        },
        {
          title: "Payments",
          description:
            "Accept deposits and online payments at checkout. Track revenue by service, team member, and time period from your business dashboard.",
        },
      ]}
      useCases={[
        "Bridal hair and makeup appointments",
        "Bridal hair styling services",
        "Bridal makeup services",
        "Wedding beauty appointments",
        "Pre-wedding beauty services",
        "Bridal beauty service scheduling",
        "Deposit collection for appointments",
        "Online booking and appointment management",
      ]}
      benefits={[
        "Manage bridal services, customers, appointments, and payments from one platform",
        "Deposits and reminders help keep important appointments organized",
        "A professional business presence helps customers explore your work and book with confidence",
      ]}
      relatedSolutions={[
        { label: "Makeup Artists", to: "/solutions/makeup-artist" },
        { label: "Hair Salons", to: "/solutions/hair-salon" },
        { label: "Lash & Brow", to: "/solutions/lash-brow" },
        { label: "Freelancers", to: "/solutions/freelancers" },
      ]}
    />
  );
}