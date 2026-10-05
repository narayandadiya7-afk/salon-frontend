import type { Metadata } from "next";

import { SolutionPageTemplate } from "@/components/admin/admin-website/solution-page-template";

const TITLE = "Men's Grooming Business Management & Booking Software | Fyncho";

const DESCRIPTION =
  "Fyncho helps men's grooming businesses manage online bookings, services, team schedules, customers, memberships and payments — all from one platform.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: { title: TITLE, description: DESCRIPTION, type: "website" },
  twitter: { card: "summary_large_image" },
};

export default function MensGroomingPage() {
  return (
    <SolutionPageTemplate
      eyebrow="Men's Grooming"
      heroTitle={
        <>Men's grooming management built for modern businesses and returning customers.</>
      }
      heroIntro="Fyncho gives men's grooming businesses professional business software, online booking, and the tools to manage services, team schedules, customers, memberships, and payments — all in one place."
      heroImage="/assets/admin-website/avivane-banner-craft.jpg"
      heroImageAlt="Modern men's grooming studio with premium tools and finishes"
      challenges={[
        {
          title: "Frequent repeat visits",
          description:
            "Men's grooming customers often return regularly. Making it easy to book services again creates a smoother experience and encourages customers to keep coming back.",
        },
        {
          title: "Managing different services",
          description:
            "Grooming businesses can offer hair, beard, shaving, and other services with different durations and pricing. Keeping the service menu organized can become difficult to manage manually.",
        },
        {
          title: "Membership and loyalty",
          description:
            "Regular customers can benefit from memberships and loyalty programs. Managing these alongside bookings and customer information should not create unnecessary administrative work.",
        },
        {
          title: "Premium positioning online",
          description:
            "A premium grooming business needs a professional online presence that clearly presents its services, work, and booking experience to potential customers.",
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
            "Define your grooming services with clear descriptions, durations, and pricing so customers know what they are booking.",
        },
        {
          title: "Memberships",
          description:
            "Offer memberships that encourage regular visits and make it easier to build lasting customer relationships.",
        },
        {
          title: "Loyalty",
          description:
            "Use loyalty features to reward returning customers and encourage them to keep choosing your business.",
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
        "Haircuts and styled finishes",
        "Beard shaping and maintenance",
        "Hot towel shaving services",
        "Scalp treatments",
        "Hair and beard services",
        "Men's grooming memberships",
        "Men's skin care services",
        "Online booking and repeat appointments",
      ]}
      benefits={[
        "Manage grooming services, customers, bookings, memberships, and payments from one place",
        "Online booking makes repeat appointments simple for returning customers",
        "Memberships and loyalty programs help encourage customers to come back regularly",
      ]}
      relatedSolutions={[
        { label: "Barbershops", to: "/solutions/barbershop" },
        { label: "Hair Salons", to: "/solutions/hair-salon" },
        { label: "Skin Care", to: "/solutions/skincare" },
      ]}
    />
  );
}