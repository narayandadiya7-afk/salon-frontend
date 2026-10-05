import type { Metadata } from "next";

import { SolutionPageTemplate } from "@/components/admin/admin-website/solution-page-template";

const TITLE = "Wellness Center Management & Booking Software | Fyncho";

const DESCRIPTION =
  "Fyncho helps wellness centers manage online bookings, services, team schedules, customers, memberships and payments — all from one platform.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: { title: TITLE, description: DESCRIPTION, type: "website" },
  twitter: { card: "summary_large_image" },
};

export default function WellnessPage() {
  return (
    <SolutionPageTemplate
      eyebrow="Wellness Centers"
      heroTitle={
        <>Wellness center management designed for a smooth customer experience.</>
      }
      heroIntro="Fyncho gives wellness centers professional business software, online booking, and the tools to manage services, team schedules, customers, memberships, and payments — all in one place."
      heroImage="/assets/admin-website/avivane-banner-interior.jpg"
      heroImageAlt="Wellness center with calm treatment space and natural light"
      challenges={[
        {
          title: "Managing multiple team members",
          description:
            "Wellness centers may have team members offering different services and working at different times. Keeping availability, services, and appointments organized can become difficult to manage manually.",
        },
        {
          title: "Managing diverse services",
          description:
            "Wellness businesses can offer a range of services with different durations and pricing. Keeping the service menu and booking information organized helps create a smoother customer experience.",
        },
        {
          title: "Customer retention and regular visits",
          description:
            "Wellness customers often return regularly. Memberships and loyalty programs can encourage repeat visits while keeping customer and booking information organized.",
        },
        {
          title: "Professional online presence",
          description:
            "Customers often explore a wellness business before booking. A professional online presence with clear services, business information, and booking options makes it easier to understand what you offer.",
        },
      ]}
      howFynchoHelps={[
        {
          title: "Online booking",
          description:
            "Customers can explore your services and book directly with your wellness center, making it easy to schedule appointments whenever they need to.",
        },
        {
          title: "Team management",
          description:
            "Manage your team members, availability, schedules, and services in one place to keep appointments organized.",
        },
        {
          title: "Service management",
          description:
            "Define your services across different wellness disciplines with clear descriptions, durations, and pricing.",
        },
        {
          title: "Memberships & loyalty",
          description:
            "Offer memberships and loyalty programs that encourage customers to return regularly and build lasting relationships with your wellness center.",
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
        "Holistic therapy appointments",
        "Nutritional consultation bookings",
        "Naturopathy and wellness sessions",
        "Meditation and mindfulness sessions",
        "Massage and relaxation services",
        "Multi-team-member scheduling",
        "Online booking and repeat appointments",
        "Wellness memberships",
      ]}
      benefits={[
        "Customers can explore your services and book directly with your wellness center",
        "Manage services, team schedules, customers, bookings, memberships, and payments from one place",
        "Customer profiles and appointment history help your team provide a consistent experience",
      ]}
      relatedSolutions={[
        { label: "Spa", to: "/solutions/spa" },
        { label: "Massage Therapy", to: "/solutions/massage-therapy" },
        { label: "Skin Care", to: "/solutions/skincare" },
      ]}
    />
  );
}