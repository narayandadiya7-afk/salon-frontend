import type { Metadata } from "next";
import { SolutionPageTemplate } from "@/components/admin/admin-website/solution-page-template";

const TITLE = "Booking & Management Software for Beauty & Wellness Freelancers | Fyncho";
const DESCRIPTION =
  "Fyncho helps independent beauty and wellness professionals manage online bookings, client records, payments and their professional website — without needing a team.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: { title: TITLE, description: DESCRIPTION, type: "website" },
  twitter: { card: "summary_large_image" },
};

export default function FreelancersPage() {
  return (
    <SolutionPageTemplate
      eyebrow="Freelancers & Independent Professionals"
      heroTitle={<>Your own professional website and booking system — without needing a team to run it.</>}
      heroIntro="Fyncho gives independent beauty and wellness professionals a complete digital presence, direct client bookings and the tools to manage the business side — so you can stay focused on the work."
      heroImage="/assets/admin-website/avivane-banner-craft.jpg"
      heroImageAlt="Independent beauty professional preparing for a client appointment"
      challenges={[
        {
          title: "No professional online presence",
          description: "A social media profile is not the same as a website. Without a branded destination, independent professionals appear less established than they are.",
        },
        {
          title: "Booking via messages and calls",
          description: "Managing every enquiry, confirmation and change through personal messages takes time away from doing the actual work.",
        },
        {
          title: "Protecting your time",
          description: "Late cancellations and no-shows have a disproportionate impact when you work alone. A deposit system needs to be effortless to enforce.",
        },
        {
          title: "Building a client base",
          description: "Independent professionals grow through repeat business and referrals. Systematic follow-up and loyalty require a client management system.",
        },
      ]}
      howFynchoHelps={[
        {
          title: "Your own website",
          description: "A complete, branded professional website at your own Fyncho URL — with services, portfolio, about and contact pages.",
        },
        {
          title: "Online booking",
          description: "Clients book directly from your website. You manage your availability once, and the calendar handles the rest.",
        },
        {
          title: "Deposits",
          description: "Require a deposit for bookings to protect your diary and reduce last-minute cancellations.",
        },
        {
          title: "Customer management",
          description: "Client profiles hold visit history, preferences and notes — so you always have context before the appointment.",
        },
        {
          title: "Payments",
          description: "Accept secure online payments at checkout and track your earnings by service and period — without a separate invoicing tool.",
        },
        {
          title: "Notifications & reminders",
          description: "Automated booking confirmations and reminders keep clients informed without requiring manual follow-up.",
        },
      ]}
      useCases={[
        "Freelance hair stylist bookings",
        "Independent makeup artist appointments",
        "Solo massage therapist scheduling",
        "Nail technician bookings",
        "Lash and brow artist appointments",
        "Waxing and threading services",
        "Skin care and facial treatments",
        "Portfolio and gallery presentation",
      ]}
      benefits={[
        "A professional website gives your business a presence that matches your skills",
        "Clients book themselves — fewer interruptions, fewer missed messages",
        "Deposits and reminders protect the diary you work hard to fill",
      ]}
      relatedSolutions={[
        { label: "Home-Service", to: "/solutions/home-services" },
        { label: "Makeup Artists", to: "/solutions/makeup-artist" },
        { label: "Massage Therapy", to: "/solutions/massage-therapy" },
        { label: "Lash & Brow", to: "/solutions/lash-brow" },
      ]}
    />
  );
}
