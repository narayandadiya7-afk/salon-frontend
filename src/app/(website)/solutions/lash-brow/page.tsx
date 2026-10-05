import type { Metadata } from "next";

import { SolutionPageTemplate } from "@/components/admin/admin-website/solution-page-template";

const TITLE = "Lash & Brow Studio Management & Booking Software | Fyncho";

const DESCRIPTION =
  "Fyncho helps lash and brow studios manage online bookings, team schedules, service durations, customers and payments — all from one platform.";

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
      heroTitle={
        <>Lash and brow studio management built around precision and repeat customers.</>
      }
      heroIntro="Fyncho gives lash and brow studios professional business software, online booking, and the tools to manage services, team schedules, customers, and appointments — all in one place."
      heroImage="/assets/admin-website/avivane-banner-craft.jpg"
      heroImageAlt="Lash professional performing a lash extension treatment"
      challenges={[
        {
          title: "Precise service durations",
          description:
            "Lash and brow services can have different durations depending on the treatment. Keeping service durations and appointments organized helps create a smoother booking experience.",
        },
        {
          title: "Frequent repeat visits",
          description:
            "Many lash and brow customers return regularly for maintenance and new treatments. Making it easy to book again helps create a smoother experience and encourages repeat visits.",
        },
        {
          title: "Managing a busy schedule",
          description:
            "With multiple services and appointments throughout the day, keeping team availability and bookings organized can become difficult to manage manually.",
        },
        {
          title: "Presenting your work visually",
          description:
            "New customers often want to see your work before booking. A professional business gallery gives them an easy way to explore your services and work.",
        },
      ]}
      howFynchoHelps={[
        {
          title: "Online booking",
          description:
            "Customers can explore your services and book directly with your business, making it easy to schedule appointments whenever they need to.",
        },
        {
          title: "Service management",
          description:
            "Define treatments such as classic lashes, volume, hybrid, brow lamination, and tinting with clear durations and pricing.",
        },
        {
          title: "Team management",
          description:
            "Manage your team members, availability, schedules, and services in one place to keep appointments organized.",
        },
        {
          title: "Customer management",
          description:
            "Keep customer profiles and appointment history organized in one place, giving your team the information they need for a consistent experience.",
        },
        {
          title: "Gallery",
          description:
            "Showcase your work through your business gallery so potential customers can explore your services and see your work before booking.",
        },
        {
          title: "Deposits & reminders",
          description:
            "Require deposits as part of the booking process and send automatic reminders to help reduce unnecessary cancellations and missed appointments.",
        },
      ]}
      useCases={[
        "Classic, hybrid, and volume lash extensions",
        "Lash lift and tint",
        "Lash fill appointments",
        "Brow lamination",
        "Brow tinting and shaping",
        "HD and combination brow treatments",
        "Lash and brow service scheduling",
        "Online booking and repeat appointments",
      ]}
      benefits={[
        "Manage lash and brow services, team schedules, customers, and bookings from one place",
        "Clear service durations help customers choose the right appointment",
        "Deposits and reminders help keep your schedule organized",
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