import type { Metadata } from "next";

import { SolutionPageTemplate } from "@/components/admin/admin-website/solution-page-template";

const TITLE = "Waxing & Hair Removal Business Booking Software | Fyncho";

const DESCRIPTION =
  "Fyncho helps waxing and hair removal businesses manage online bookings, services, team schedules, customers and payments — all from one platform.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: { title: TITLE, description: DESCRIPTION, type: "website" },
  twitter: { card: "summary_large_image" },
};

export default function WaxingPage() {
  return (
    <SolutionPageTemplate
      eyebrow="Waxing & Hair Removal"
      heroTitle={
        <>Waxing and hair removal management built for high-frequency, returning customers.</>
      }
      heroIntro="Fyncho gives waxing and hair removal businesses professional business software, online booking, and the tools to manage services, team schedules, customers, appointments, and payments — all in one place."
      heroImage="/assets/admin-website/avivane-banner-craft.jpg"
      heroImageAlt="Waxing treatment room set up for a professional appointment"
      challenges={[
        {
          title: "Frequent repeat visits",
          description:
            "Waxing customers often return regularly for maintenance. Making it easy to book again and keeping appointment reminders organized can help create a smoother experience.",
        },
        {
          title: "Managing different services",
          description:
            "Waxing businesses can offer many services with different durations and pricing. Keeping the service menu organized helps customers understand what they are booking.",
        },
        {
          title: "Managing team availability",
          description:
            "Customers may prefer to book with a particular team member. Keeping team availability, services, and appointments organized can become difficult to manage manually.",
        },
        {
          title: "No-shows and cancellations",
          description:
            "Short, frequently scheduled appointments can be affected by missed bookings. Deposits and reminders help businesses keep their schedules organized.",
        },
      ]}
      howFynchoHelps={[
        {
          title: "Online booking",
          description:
            "Customers can explore your services and book directly with your business, with clear service descriptions, durations, and pricing.",
        },
        {
          title: "Service management",
          description:
            "Define your waxing services with clear descriptions, durations, and pricing so customers know what they are booking.",
        },
        {
          title: "Team management",
          description:
            "Manage your team members, availability, schedules, and services in one place to keep appointments organized.",
        },
        {
          title: "Deposits & reminders",
          description:
            "Require deposits as part of the booking process and send automatic reminders to help reduce unnecessary cancellations and missed appointments.",
        },
        {
          title: "Customer management",
          description:
            "Keep customer profiles and appointment history organized in one place, giving your team the information they need for a consistent experience.",
        },
        {
          title: "Payments",
          description:
            "Accept deposits and online payments at checkout. Track revenue by service, team member, and time period from your business dashboard.",
        },
      ]}
      useCases={[
        "Full and half leg waxing",
        "Bikini and Brazilian waxing",
        "Brow and facial waxing",
        "Underarm and arm waxing",
        "Back and chest waxing",
        "Full body waxing services",
        "Team member-specific bookings",
        "Online booking and repeat appointments",
      ]}
      benefits={[
        "Manage waxing services, team schedules, customers, bookings, and payments from one place",
        "Customers can book their preferred service and team member online",
        "Deposits and reminders help keep a busy appointment schedule organized",
      ]}
      relatedSolutions={[
        { label: "Beauty Salons", to: "/solutions/beauty-salon" },
        { label: "Lash & Brow", to: "/solutions/lash-brow" },
        { label: "Nail Salons", to: "/solutions/nail-salon" },
        { label: "Freelancers", to: "/solutions/freelancers" },
      ]}
    />
  );
}