import type { Metadata } from "next";

import { SolutionPageTemplate } from "@/components/admin/admin-website/solution-page-template";

const TITLE = "Makeup Artist Booking & Management Software | Fyncho";

const DESCRIPTION =
  "Fyncho helps makeup artists manage online bookings, services, customers, deposits and payments — all from one platform.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: { title: TITLE, description: DESCRIPTION, type: "website" },
  twitter: { card: "summary_large_image" },
};

export default function MakeupArtistPage() {
  return (
    <SolutionPageTemplate
      eyebrow="Makeup Artists"
      heroTitle={
        <>Booking and customer management for makeup artists who want to stay focused on the work.</>
      }
      heroIntro="Fyncho gives makeup artists professional business software, direct customer bookings, and the tools to manage services, appointments, customers, and payments — without the back-and-forth."
      heroImage="/assets/admin-website/avivane-banner-craft.jpg"
      heroImageAlt="Makeup artist working with a customer in a professional studio"
      challenges={[
        {
          title: "Booking coordination via messages",
          description:
            "Managing appointments through social messages and calls can be time-consuming. An online booking experience gives customers a simpler way to schedule.",
        },
        {
          title: "Deposits and cancellations",
          description:
            "Important bookings can benefit from a deposit at the time of booking. Managing payment requirements manually can create unnecessary administrative work.",
        },
        {
          title: "Presenting your work professionally",
          description:
            "Customers often want to see your work before booking. A professional business presence with services and a gallery gives them an easy way to explore what you offer.",
        },
        {
          title: "Managing different makeup services",
          description:
            "Makeup artists may offer bridal, event, party, editorial, and other services with different durations and pricing. Keeping everything organized can become difficult to manage manually.",
        },
      ]}
      howFynchoHelps={[
        {
          title: "Online booking",
          description:
            "Customers can explore your services and book directly with your business, making it easier to schedule appointments without inbox coordination.",
        },
        {
          title: "Service management",
          description:
            "Define your makeup services with clear descriptions, durations, and pricing so customers know what they are booking.",
        },
        {
          title: "Deposits",
          description:
            "Require deposits as part of the booking process to help confirm important appointments and reduce unnecessary cancellations.",
        },
        {
          title: "Customer management",
          description:
            "Keep customer profiles and appointment history organized in one place, giving you the information you need for a consistent experience.",
        },
        {
          title: "Gallery",
          description:
            "Showcase your makeup work through your business gallery so potential customers can explore your work before booking.",
        },
        {
          title: "Payments",
          description:
            "Accept deposits and online payments at checkout. Track revenue by service and time period from your business dashboard.",
        },
      ]}
      useCases={[
        "Bridal makeup appointments",
        "Wedding day makeup services",
        "Event and party makeup",
        "Editorial and photoshoot makeup",
        "Makeup lessons and appointments",
        "Makeup service scheduling",
        "Portfolio and gallery presentation",
        "Online booking and appointment management",
      ]}
      benefits={[
        "Manage your makeup services, customers, bookings, and payments from one place",
        "Customers can explore your work and book directly with your business",
        "Deposits and reminders help keep important appointments organized",
      ]}
      relatedSolutions={[
        { label: "Bridal Services", to: "/solutions/bridal" },
        { label: "Hair Salons", to: "/solutions/hair-salon" },
        { label: "Lash & Brow", to: "/solutions/lash-brow" },
        { label: "Freelancers", to: "/solutions/freelancers" },
      ]}
    />
  );
}