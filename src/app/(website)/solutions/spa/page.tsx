import type { Metadata } from "next";

import { SolutionPageTemplate } from "@/components/admin/admin-website/solution-page-template";

const TITLE = "Spa Management & Online Booking Software | Fyncho";

const DESCRIPTION =
  "Fyncho helps spas manage online bookings, services, team schedules, customers, memberships and payments — all in one place.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: { title: TITLE, description: DESCRIPTION, type: "website" },
  twitter: { card: "summary_large_image" },
};

export default function SpaPage() {
  return (
    <SolutionPageTemplate
      eyebrow="Spa"
      heroTitle={<>Spa management as serene as the experience you deliver.</>}
      heroIntro="Fyncho gives spas professional business software, online booking, and the tools to manage services, team schedules, customers, appointments, and payments — all in one place."
      heroImage="/assets/admin-website/avivane-banner-interior.jpg"
      heroImageAlt="Serene spa treatment room with soft lighting and premium linens"
      challenges={[
        {
          title: "Service and staff scheduling",
          description:
            "Different treatments require specific team members and durations. Keeping services, staff schedules, and appointment times organized helps create a smoother booking experience.",
        },
        {
          title: "Managing a wide treatment menu",
          description:
            "Spas often offer a broad range of treatments with different durations and pricing. Keeping service and booking information organized can become difficult to manage manually.",
        },
        {
          title: "Customer experience consistency",
          description:
            "Returning customers expect a smooth experience each time they book. Keeping customer profiles and appointment history organized helps your team provide a more consistent experience.",
        },
        {
          title: "Memberships and customer loyalty",
          description:
            "Memberships and loyalty programs can encourage customers to return regularly. Managing these alongside bookings and customer information should not add unnecessary administrative work.",
        },
      ]}
      howFynchoHelps={[
        {
          title: "Online booking",
          description:
            "Customers can explore your services and book directly with your business whenever they need to, making it easier to schedule appointments without calls or messages.",
        },
        {
          title: "Team management",
          description:
            "Manage your team members, availability, schedules, and services in one place to keep appointments organized.",
        },
        {
          title: "Service management",
          description:
            "Build your treatment menu with clear descriptions, durations, and pricing so customers know what they are booking.",
        },
        {
          title: "Memberships & loyalty",
          description:
            "Offer memberships and loyalty programs that encourage customers to return regularly and build lasting relationships with your spa.",
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
        "Full-body massage and deep tissue treatments",
        "Facial and skin treatments",
        "Body wraps and scrubs",
        "Hammam and ritual experiences",
        "Couples treatments and shared experiences",
        "Team member-specific bookings",
        "Spa memberships",
        "Facial and body treatment bookings",
      ]}
      benefits={[
        "Customers can explore services and book directly with your spa",
        "Manage services, team schedules, customers, bookings, memberships, and payments from one place",
        "Customer profiles and appointment history help your team provide a consistent experience",
      ]}
      relatedSolutions={[
        { label: "Massage Therapy", to: "/solutions/massage-therapy" },
        { label: "Wellness Centers", to: "/solutions/wellness" },
        { label: "Skin Care", to: "/solutions/skincare" },
      ]}
    />
  );
}