import type { Metadata } from "next";
import { SolutionPageTemplate } from "@/components/admin/admin-website/solution-page-template";

const TITLE = "Barbershop Management & Booking Software | Fyncho";
const DESCRIPTION =
  "Fyncho helps barbershops manage online bookings, barber schedules, walk-ins, loyalty and payments — all from one platform.";

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
      heroIntro="Fyncho gives barbershops a professional website, fast online booking and the tools to manage every barber, service and client — built around the high-frequency rhythm of a busy shop."
      heroImage="/assets/admin-website/avivane-banner-craft.jpg"
      heroImageAlt="Barber working with a client in a modern barbershop"
      challenges={[
        {
          title: "High walk-in volume",
          description: "Barbershops often balance walk-ins with booked appointments. Without a system, this creates bunching and wait-time frustration.",
        },
        {
          title: "Fast repeat visits",
          description: "Clients return every two to four weeks. Rebooking should be quick — for both the client and the front desk.",
        },
        {
          title: "No-shows on peak days",
          description: "A no-show on a Saturday slot is harder to fill than mid-week. Deposits and reminders help but require a system to enforce.",
        },
        {
          title: "Loyalty and retention",
          description: "Regulars are the backbone of a barbershop's revenue. Rewarding loyalty systematically is difficult without the right tools.",
        },
      ]}
      howFynchoHelps={[
        {
          title: "Online booking",
          description: "Clients book their preferred barber and service from your own website, 24 hours a day. No calls, no waiting.",
        },
        {
          title: "Staff management",
          description: "Set each barber's working hours and availability. Bookings land in the right slot without manual coordination.",
        },
        {
          title: "Deposits & reminders",
          description: "Require deposits on bookings and send automated reminders to reduce no-shows on your highest-value slots.",
        },
        {
          title: "Loyalty",
          description: "Reward returning clients with points and perks that give them a reason to rebook — and to choose you over the shop down the road.",
        },
        {
          title: "Customer management",
          description: "Profiles hold visit history and preferences so every client gets consistent, personalised service.",
        },
        {
          title: "Payments",
          description: "Accept card payments at checkout. Track revenue by barber and service from the dashboard.",
        },
      ]}
      useCases={[
        "Haircuts and fades",
        "Beard trims and shaping",
        "Traditional hot towel shaves",
        "Grooming packages",
        "Children's cuts",
        "Per-barber availability and scheduling",
        "Loyalty rewards for regulars",
        "Repeat client rebooking in two taps",
      ]}
      benefits={[
        "Regulars rebook in seconds from their phone",
        "Deposits and reminders keep peak slots filled",
        "One view of every barber's performance and revenue",
      ]}
      relatedSolutions={[
        { label: "Men's Grooming", to: "/solutions/mens-grooming" },
        { label: "Hair Salons", to: "/solutions/hair-salon" },
        { label: "Freelancers", to: "/solutions/freelancers" },
      ]}
    />
  );
}
