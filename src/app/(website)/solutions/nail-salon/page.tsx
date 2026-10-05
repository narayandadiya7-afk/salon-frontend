import type { Metadata } from "next";

import { SolutionPageTemplate } from "@/components/admin/admin-website/solution-page-template";

const TITLE = "Nail Salon Management & Booking Software | Fyncho";

const DESCRIPTION =
  "Fyncho helps nail salons manage online bookings, services, team schedules, customers and payments — all from one platform.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: { title: TITLE, description: DESCRIPTION, type: "website" },
  twitter: { card: "summary_large_image" },
};

export default function NailSalonPage() {
  return (
    <SolutionPageTemplate
      eyebrow="Nail Salons"
      heroTitle={
        <>Nail salon management as polished as the results you deliver.</>
      }
      heroIntro="Fyncho gives nail salons professional business software, online booking, and the tools to manage services, team schedules, customers, and appointments — all in one place."
      heroImage="/assets/admin-website/avivane-banner-craft.jpg"
      heroImageAlt="Nail professional working at a modern nail studio"
      challenges={[
        {
          title: "Busy appointment schedules",
          description:
            "Nail salons often manage many appointments throughout the day. Keeping services, durations, team availability, and bookings organized can become difficult to manage manually.",
        },
        {
          title: "Managing different services",
          description:
            "Manicures, pedicures, gel services, extensions, and nail art can all have different durations and pricing. Keeping the service menu organized helps create a smoother booking experience.",
        },
        {
          title: "Presenting your work",
          description:
            "Nail services are highly visual. New customers often want to see your work before booking, making a professional business gallery an important part of your online presence.",
        },
        {
          title: "Repeat customer bookings",
          description:
            "Regular customers often return for their favourite services and team members. Keeping customer profiles and appointment history organized makes repeat bookings easier to manage.",
        },
      ]}
      howFynchoHelps={[
        {
          title: "Online booking",
          description:
            "Customers can explore your services and book directly with your nail salon, making it easy to schedule appointments whenever they need to.",
        },
        {
          title: "Service management",
          description:
            "Define your nail services with clear descriptions, durations, and pricing so customers know what they are booking.",
        },
        {
          title: "Team management",
          description:
            "Manage your team members, availability, schedules, and services in one place to keep appointments organized.",
        },
        {
          title: "Gallery",
          description:
            "Showcase your nail work through your business gallery so potential customers can explore your services and see your work before booking.",
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
        "Classic manicure and pedicure",
        "Gel and shellac nails",
        "Acrylic and structured extensions",
        "Nail art and custom designs",
        "Russian manicure and cuticle care",
        "Spa and luxury pedicure services",
        "Team member-specific bookings",
        "Online booking and repeat appointments",
      ]}
      benefits={[
        "Manage nail services, team schedules, customers, bookings, and payments from one place",
        "Customers can explore your work and book directly with your business",
        "Customer profiles and appointment history make repeat bookings easier to manage",
      ]}
      relatedSolutions={[
        { label: "Beauty Salons", to: "/solutions/beauty-salon" },
        { label: "Lash & Brow", to: "/solutions/lash-brow" },
        { label: "Waxing", to: "/solutions/waxing" },
        { label: "Freelancers", to: "/solutions/freelancers" },
      ]}
    />
  );
}