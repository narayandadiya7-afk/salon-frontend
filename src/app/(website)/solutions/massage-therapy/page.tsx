import type { Metadata } from "next";

import { SolutionPageTemplate } from "@/components/admin/admin-website/solution-page-template";

const TITLE = "Massage Therapy Booking & Management Software | Fyncho";

const DESCRIPTION =
  "Fyncho helps massage therapists manage online bookings, services, team schedules, customers and payments — whether you work solo or with a team.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: { title: TITLE, description: DESCRIPTION, type: "website" },
  twitter: { card: "summary_large_image" },
};

export default function MassageTherapyPage() {
  return (
    <SolutionPageTemplate
      eyebrow="Massage Therapy"
      heroTitle={
        <>Massage therapy management that keeps you focused on the treatment, not the admin.</>
      }
      heroIntro="Fyncho gives massage therapists professional business software, online booking, and the tools to manage services, appointments, customers, payments, and team schedules — whether you practice solo or with a team."
      heroImage="/assets/admin-website/avivane-banner-interior.jpg"
      heroImageAlt="Massage therapy treatment room with soft lighting and professional equipment"
      challenges={[
        {
          title: "Booking coordination between sessions",
          description:
            "Managing enquiries, confirmations, and appointment changes between treatments can be disruptive. Online booking gives customers a simpler way to schedule their appointments.",
        },
        {
          title: "Managing therapist availability",
          description:
            "Coordinating team schedules, service durations, and customer bookings manually can create unnecessary administrative work and make busy schedules harder to manage.",
        },
        {
          title: "Managing different massage services",
          description:
            "Massage businesses often offer services with different durations and pricing. Keeping the service menu and appointment information organized can become difficult to manage manually.",
        },
        {
          title: "Professional business presence",
          description:
            "Independent therapists and growing practices need a professional way to present their services, information, and booking options to potential customers.",
        },
      ]}
      howFynchoHelps={[
        {
          title: "Online booking",
          description:
            "Customers can explore your services and book directly with your business, making it easier to schedule appointments without interrupting your sessions.",
        },
        {
          title: "Service management",
          description:
            "Define your massage services — such as Swedish, deep tissue, sports, hot stone, and aromatherapy — with clear durations and pricing.",
        },
        {
          title: "Customer management",
          description:
            "Keep customer profiles and appointment history organized in one place, giving you the information you need for a consistent customer experience.",
        },
        {
          title: "Team management",
          description:
            "Manage your practitioners, their availability, schedules, and services in one place to keep appointments organized.",
        },
        {
          title: "Deposits & reminders",
          description:
            "Require deposits as part of the booking process and send automatic reminders to help reduce unnecessary cancellations and missed appointments.",
        },
        {
          title: "Payments",
          description:
            "Accept deposits and online payments at checkout. Track revenue by service, team member, and time period from your business dashboard.",
        },
      ]}
      useCases={[
        "Swedish and relaxation massage",
        "Deep tissue and sports massage",
        "Hot stone therapy",
        "Aromatherapy massage",
        "Prenatal and postnatal massage",
        "Trigger point and remedial massage",
        "Massage service scheduling",
        "Solo practitioner availability management",
      ]}
      benefits={[
        "Customers can book without interrupting your treatment schedule",
        "Manage services, practitioners, customers, appointments, and payments from one place",
        "Deposits and reminders help keep your appointment schedule organized",
      ]}
      relatedSolutions={[
        { label: "Spa", to: "/solutions/spa" },
        { label: "Wellness Centers", to: "/solutions/wellness" },
        { label: "Freelancers", to: "/solutions/freelancers" },
        { label: "Skincare", to: "/solutions/skincare" },
      ]}
    />
  );
}