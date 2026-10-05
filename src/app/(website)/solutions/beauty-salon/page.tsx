import type { Metadata } from "next";

import { SolutionPageTemplate } from "@/components/admin/admin-website/solution-page-template";

const TITLE = "Beauty Salon Management & Booking Software | Fyncho";

const DESCRIPTION =
  "Fyncho helps beauty salons manage online bookings, services, team schedules, customers, memberships and payments — all from one platform.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: { title: TITLE, description: DESCRIPTION, type: "website" },
  twitter: { card: "summary_large_image" },
};

export default function BeautySalonPage() {
  return (
    <SolutionPageTemplate
      eyebrow="Beauty Salons"
      heroTitle={
        <>Beauty salon management that brings your services, team, and customers together.</>
      }
      heroIntro="Fyncho gives beauty salons professional business software, online booking, and the tools to manage services, team schedules, customers, and daily operations — all in one place."
      heroImage="/assets/admin-website/beauty-salon-banner.png"
      heroImageAlt="Full-service beauty salon with multiple treatment stations"
      challenges={[
        {
          title: "A wide service menu to manage",
          description:
            "Beauty salons often offer services across hair, skin, nails, and more. Keeping services, durations, pricing, and booking information organized can become difficult to manage manually.",
        },
        {
          title: "Managing busy schedules",
          description:
            "With multiple services and team members, keeping appointments and staff availability organized is essential. Fyncho brings services, schedules, and bookings together in one place.",
        },
        {
          title: "Growing team operations",
          description:
            "As your team grows, managing staff information, availability, services, and appointments can become more complex without a central system.",
        },
        {
          title: "Customer retention",
          description:
            "Beauty salon customers often return regularly for different services. Memberships and loyalty programs can help encourage repeat visits and build lasting customer relationships.",
        },
      ]}
      howFynchoHelps={[
        {
          title: "Online booking",
          description:
            "Customers can browse your services and book directly with your business whenever they need to, making the booking experience simple and convenient.",
        },
        {
          title: "Service management",
          description:
            "Organize your services with individual durations and pricing so customers have clear information when choosing what to book.",
        },
        {
          title: "Team management",
          description:
            "Manage your team members, availability, schedules, and services in one place to keep appointments organized.",
        },
        {
          title: "Customer management",
          description:
            "Keep customer profiles and appointment history organized in one place, giving your team the information they need to provide a consistent experience.",
        },
        {
          title: "Memberships & loyalty",
          description:
            "Offer memberships and loyalty programs that reward returning customers and encourage them to keep coming back.",
        },
        {
          title: "Payments",
          description:
            "Accept deposits and online payments at checkout. Track revenue by service, team member, and time period from the business dashboard.",
        },
      ]}
      useCases={[
        "Hair services — cuts, colour, and treatments",
        "Facials and skin treatments",
        "Manicure and pedicure bookings",
        "Waxing and hair removal",
        "Brow and lash services",
        "Body treatments and massage",
        "Service and team scheduling",
        "Online booking and appointment management",
      ]}
      benefits={[
        "Manage your services, team, customers, bookings, and payments from one platform",
        "Customers can discover your services and book directly with your business",
        "Memberships and loyalty programs help encourage customers to return",
      ]}
      relatedSolutions={[
        { label: "Hair Salons", to: "/solutions/hair-salon" },
        { label: "Nail Salons", to: "/solutions/nail-salon" },
        { label: "Lash & Brow", to: "/solutions/lash-brow" },
        { label: "Skin Care", to: "/solutions/skincare" },
      ]}
    />
  );
}