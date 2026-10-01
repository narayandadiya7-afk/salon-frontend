import type { Metadata } from "next";
import { SolutionPageTemplate } from "@/components/admin/admin-website/solution-page-template";

const TITLE = "Massage Therapy Booking & Management Software | Fyncho";
const DESCRIPTION =
  "Fyncho helps massage therapists manage online bookings, treatment schedules, client records and payments — whether you work solo or with a team.";

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
      heroTitle={<>Massage therapy management that keeps you focused on the treatment, not the admin.</>}
      heroIntro="Fyncho gives massage therapists a professional software, direct customer bookings and the tools to manage appointments, records and payments — whether you practice solo or with a team."
      heroImage="/assets/admin-website/avivane-banner-interior.jpg"
      heroImageAlt="Massage therapy treatment room with soft lighting and professional equipment"
      challenges={[
        {
          title: "Booking coordination between sessions",
          description: "Managing enquiries, confirmations and cancellations between back-to-back treatments is disruptive. Customers need a self-service option.",
        },
        {
          title: "Managing therapist availability",
          description: "Coordinating therapist schedules, service durations and customer bookings manually can lead to gaps, overlaps and unnecessary back-and-forth.",
        },
        {
          title: "Treatment series management",
          description: "Customers on a series of treatments need appointments scheduled in advance. Managing this manually creates gaps and missed bookings.",
        },
        {
          title: "Professional credibility online",
          description: "A therapist working independently or with a small team needs a software that communicates expertise and professionalism clearly.",
        },
      ]}
      howFynchoHelps={[
        {
          title: "Online booking",
          description: "Customers book their treatment type, therapist and time from your own software — without interrupting your session.",
        },
        {
          title: "Service management",
          description: "Define your treatment menu — Swedish, deep tissue, sports, hot stone, aromatherapy — with durations and pricing.",
        },
        {
          title: "Customer management",
          description: "Customer profiles hold visit history, health notes and preferences — giving you the context to deliver consistent, safe treatment.",
        },
        {
          title: "Staff management",
          description: "Manage each practitioner’s services, availability and schedule, making it easy to assign bookings to the right person.",
        },
        {
          title: "Deposits & confirmations",
          description: "Require a deposit for new customers and send automated reminders to reduce no-shows on your carefully scheduled day.",
        },
        {
          title: "Payments",
          description: "Accept secure online payments at checkout and track revenue by treatment type and period.",
        },
      ]}
      useCases={[
        "Swedish and relaxation massage",
        "Deep tissue and sports massage",
        "Hot stone therapy",
        "Aromatherapy massage",
        "Prenatal and postnatal massage",
        "Trigger point and remedial therapy",
        "Treatment series scheduling",
        "Solo practitioner availability management",
      ]}
      benefits={[
        "Customers book without interrupting your treatment schedule",
        "Your team, availability and appointments stay perfectly coordinated",
        "Treatment series can be scheduled and managed as a programme",
      ]}
      relatedSolutions={[
        { label: "Spa", to: "/solutions/spa" },
        { label: "Wellness Centers", to: "/solutions/wellness" },
        { label: "Freelancers", to: "/solutions/freelancers" },
        { label: "Home-Service", to: "/solutions/home-services" },
      ]}
    />
  );
}
