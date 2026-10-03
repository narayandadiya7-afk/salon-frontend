import type { Metadata } from "next";

import { SolutionPageTemplate } from "@/components/admin/admin-website/solution-page-template";

const TITLE = "Hair Salon Management & Booking Software | Fyncho";

const DESCRIPTION =
  "Fyncho helps hair salons manage online bookings, stylist schedules, services, customers and payments — all from one platform.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: { title: TITLE, description: DESCRIPTION, type: "website" },
  twitter: { card: "summary_large_image" },
};

export default function HairSalonPage() {
  return (
    <SolutionPageTemplate
      eyebrow="Hair Salons"
      heroTitle={
        <>Hair salon management built around the chair, not the spreadsheet.</>
      }
      heroIntro="Fyncho gives hair salons professional business software, online booking, and the tools to manage services, stylists, customers, and daily operations — all in one place."
      heroImage="/assets/admin-website/avivane-banner-craft.jpg"
      heroImageAlt="Hair stylist working with a customer in a modern salon"
      challenges={[
        {
          title: "Booking across multiple stylists",
          description:
            "Hair salons often have multiple stylists with different schedules and availability. Keeping appointments organized across the team can become difficult to manage manually.",
        },
        {
          title: "Managing different service durations",
          description:
            "Haircuts, colour services, treatments, and styling can all require different amounts of time. Keeping service durations accurate helps create a smoother booking experience.",
        },
        {
          title: "No-shows and last-minute cancellations",
          description:
            "Empty appointment slots can have a direct impact on a salon's schedule. Deposits and reminders help businesses manage bookings and reduce unnecessary cancellations.",
        },
        {
          title: "Managing customer information",
          description:
            "Keeping customer profiles and appointment history organized helps your team provide a more consistent experience every time a customer returns.",
        },
        {
          title: "Managing a growing team",
          description:
            "As the team grows, keeping track of staff information, availability, services, and appointments becomes more difficult without a central system.",
        },
      ]}
      howFynchoHelps={[
        {
          title: "Online booking",
          description:
            "Customers can explore your services and book directly with your salon, making it easier to schedule appointments without calls or messages.",
        },
        {
          title: "Service & duration management",
          description:
            "Set durations and pricing for haircuts, colour services, treatments, styling, and other services so customers have clear information when booking.",
        },
        {
          title: "Team management",
          description:
            "Manage your stylists, their availability, schedules, and services in one place to keep appointments organized.",
        },
        {
          title: "Customer management",
          description:
            "Keep customer profiles and appointment history organized in one place, giving your team the information they need for a consistent experience.",
        },
        {
          title: "Deposits & reminders",
          description:
            "Collect deposits at checkout to help reduce no-shows. Automated reminders keep customers informed and your schedule running smoothly.",
        },
        {
          title: "Payments",
          description:
            "Accept deposits and online payments at checkout. Track revenue by service, team member, and time period from your business dashboard.",
        },
      ]}
      useCases={[
        "Haircuts and styling appointments",
        "Colour services — highlights, balayage, and full colour",
        "Hair treatments and smoothing services",
        "Blow-dry and finish bookings",
        "Multi-stylist scheduling with individual availability",
        "Hair extension services",
        "Bridal and event hair appointments",
        "Online booking and repeat appointments",
      ]}
      benefits={[
        "Customers can book services online while your team stays focused on their work",
        "Manage services, durations, stylists, customers, and appointments from one place",
        "Customer information and appointment history stay organized for returning customers",
      ]}
      relatedSolutions={[
        { label: "Beauty Salons", to: "/solutions/beauty-salon" },
        { label: "Bridal Services", to: "/solutions/bridal" },
        { label: "Makeup Artists", to: "/solutions/makeup-artist" },
        { label: "Lash & Brow", to: "/solutions/lash-brow" },
      ]}
    />
  );
}