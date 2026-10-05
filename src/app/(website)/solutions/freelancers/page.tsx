import type { Metadata } from "next";

import { SolutionPageTemplate } from "@/components/admin/admin-website/solution-page-template";

const TITLE = "Booking & Management Software for Beauty & Wellness Freelancers | Fyncho";

const DESCRIPTION =
  "Fyncho helps independent beauty and wellness professionals manage online bookings, services, customers, payments, and daily business operations — all from one platform.";

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
      heroTitle={
        <>Professional business software built for independent professionals.</>
      }
      heroIntro="Fyncho gives independent beauty and wellness professionals online booking and the tools to manage services, customers, appointments, payments, and daily business operations — without needing a team."
      heroImage="/assets/admin-website/avivane-banner-craft.jpg"
      heroImageAlt="Independent beauty professional preparing for a customer appointment"
      challenges={[
        {
          title: "Managing bookings alone",
          description:
            "When you manage your business yourself, keeping track of appointments, services, availability, and customer information can quickly become time-consuming.",
        },
        {
          title: "Booking through messages and calls",
          description:
            "Handling every booking and appointment change manually takes time away from your work. A simple online booking experience gives customers a more convenient way to schedule.",
        },
        {
          title: "Protecting your time",
          description:
            "Late cancellations and missed appointments can have a significant impact when you work independently. Deposits and reminders can help keep your schedule more organized.",
        },
        {
          title: "Building lasting customer relationships",
          description:
            "Independent professionals often rely on returning customers. Keeping customer information and appointment history organized helps create a consistent experience and encourages customers to return.",
        },
      ]}
      howFynchoHelps={[
        {
          title: "Professional business presence",
          description:
            "Give your business a professional online presence with your own business address, services, team information, gallery, and contact details.",
        },
        {
          title: "Online booking",
          description:
            "Customers can book directly with your business whenever they need to, while you manage your services, availability, and appointments in one place.",
        },
        {
          title: "Deposits",
          description:
            "Require deposits as part of the booking process to help confirm appointments and reduce unnecessary cancellations.",
        },
        {
          title: "Customer management",
          description:
            "Keep customer profiles and appointment history organized in one place, giving you the information you need for a consistent experience.",
        },
        {
          title: "Payments",
          description:
            "Accept deposits and online payments at checkout. Track revenue by service and time period from your business dashboard.",
        },
        {
          title: "Notifications & reminders",
          description:
            "Automatic booking confirmations and reminders keep customers informed without requiring you to follow up manually.",
        },
      ]}
      useCases={[
        "Freelance hair stylist bookings",
        "Independent makeup artist appointments",
        "Solo massage therapy services",
        "Nail service bookings",
        "Lash and brow appointments",
        "Waxing and threading services",
        "Skin care and facial treatments",
        "Independent beauty and wellness services",
      ]}
      benefits={[
        "Manage your services, customers, bookings, payments, and daily operations from one place",
        "Customers can book directly with your business without relying on messages or calls",
        "Deposits and reminders help keep your schedule organized",
      ]}
      relatedSolutions={[
        { label: "Makeup Artists", to: "/solutions/makeup-artist" },
        { label: "Massage Therapy", to: "/solutions/massage-therapy" },
        { label: "Lash & Brow", to: "/solutions/lash-brow" },
      ]}
    />
  );
}