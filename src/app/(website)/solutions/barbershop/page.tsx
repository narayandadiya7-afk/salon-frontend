import type { Metadata } from "next";

import { SolutionPageTemplate } from "@/components/admin/admin-website/solution-page-template";

const TITLE = "Barbershop Management & Booking Software | Fyncho";

const DESCRIPTION =
  "Fyncho helps barbershops manage online bookings, barber schedules, services, customers, loyalty and payments — all from one platform.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: { title: TITLE, description: DESCRIPTION, type: "website" },
  twitter: { card: "summary_large_image" },
};

export default function BarbershopPage() {
  return (
    <SolutionPageTemplate
      eyebrow="Barbershops"
      heroTitle={<>Barbershop management as sharp as the work behind the chair.</>}
      heroIntro="Fyncho gives barbershops professional business software with online booking and the tools to manage services, barbers, customers, and daily operations — built around the fast-paced rhythm of a busy shop."
      heroImage="/assets/admin-website/avivane-banner-craft.jpg"
      heroImageAlt="Barber working with a customer in a modern barbershop"
      challenges={[
        {
          title: "Service and staff scheduling",
          description:
            "Different grooming services require specific team members and durations. Fyncho helps align services, staff schedules, and appointment times to create a smoother booking experience.",
        },
        {
          title: "Frequent repeat visits",
          description:
            "Barbershop customers often return regularly. Making it easy to book services again helps create a smoother experience for both customers and the business.",
        },
        {
          title: "Managing busy appointment schedules",
          description:
            "Busy barbershops need to keep services, team availability, and appointments organized. Managing everything manually can lead to scheduling conflicts and unnecessary administrative work.",
        },
        {
          title: "Customer loyalty",
          description:
            "Regular customers are important to a barbershop's growth. Memberships and loyalty programs help businesses encourage repeat visits and build lasting customer relationships.",
        },
      ]}
      howFynchoHelps={[
        {
          title: "Online booking",
          description:
            "Customers can book services directly with your business, whenever they need to. Fyncho keeps the booking experience simple and convenient.",
        },
        {
          title: "Team management",
          description:
            "Manage your barbers, their availability, services, and schedules in one place so appointments stay organized.",
        },
        {
          title: "Deposits & reminders",
          description:
            "Require deposits as part of the booking process and send automatic reminders to help reduce unnecessary cancellations and missed appointments.",
        },
        {
          title: "Loyalty",
          description:
            "Use loyalty features to reward returning customers and encourage them to keep coming back.",
        },
        {
          title: "Customer management",
          description:
            "Keep customer profiles and appointment history organized in one place, giving your team the information they need to provide a consistent experience.",
        },
        {
          title: "Payments",
          description:
            "Accept deposits and online payments at checkout. Track revenue by service, team member, and time period from the business dashboard.",
        },
      ]}
      useCases={[
        "Haircuts and fades",
        "Beard trims and shaping",
        "Traditional hot towel shaves",
        "Hair and beard services",
        "Children's cuts",
        "Per-barber availability and scheduling",
        "Loyalty programs for returning customers",
        "Online booking and appointment management",
      ]}
      benefits={[
        "Customers can book services online whenever they need to",
        "Deposits and reminders help keep appointments organized",
        "Manage services, barbers, customers, bookings, and revenue from one place",
      ]}
      relatedSolutions={[
        { label: "Men's Grooming", to: "/solutions/mens-grooming" },
        { label: "Hair Salons", to: "/solutions/hair-salon" },
        { label: "Freelancers", to: "/solutions/freelancers" },
      ]}
    />
  );
}