import type { Metadata } from "next";
import { SolutionPageTemplate } from "@/components/admin/admin-website/solution-page-template";

const TITLE = "Hair Salon Management & Booking Software | Fyncho";
const DESCRIPTION =
  "Fyncho helps hair salons manage online bookings, stylist schedules, colour services, client records and payments — all from one platform.";

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
      heroTitle={<>Hair salon management built around the chair, not the spreadsheet.</>}
      heroIntro="Fyncho gives hair salons a professional website, online booking and the operational tools to manage every stylist, service and client — without juggling separate apps."
      heroImage="/assets/admin-website/avivane-banner-craft.jpg"
      heroImageAlt="Hair stylist working with a client in a modern salon"
      challenges={[
        {
          title: "Booking across multiple stylists",
          description: "Clients want to choose their preferred stylist and see real availability — not send a message and wait for a reply.",
        },
        {
          title: "Colour service timing",
          description: "Multi-stage services like colour, processing and finish need precise scheduling so the calendar doesn't overrun.",
        },
        {
          title: "No-shows and last-minute cancellations",
          description: "Empty chairs during peak hours have a direct impact on revenue, yet enforcing a cancellation policy is awkward without a system.",
        },
        {
          title: "Client records scattered across messages",
          description: "Knowing what colour formula a client had six months ago — or their preferred stylist — shouldn't require searching through old chats.",
        },
        {
          title: "Managing a growing team",
          description: "As the team grows, keeping track of individual availability, skills and performance adds up.",
        },
      ]}
      howFynchoHelps={[
        {
          title: "Online booking",
          description: "Clients book directly from your salon website, choosing service, stylist and time. No calls, no DMs, no double bookings.",
        },
        {
          title: "Service & duration management",
          description: "Set precise durations for cuts, colour, processing time and finish. The calendar resolves overlap automatically.",
        },
        {
          title: "Staff management",
          description: "Define working hours, skills and booking eligibility per stylist. Availability updates in real time as bookings come in.",
        },
        {
          title: "Customer management",
          description: "Profiles hold visit history, notes, preferences and spend — so your team always has the context they need before the appointment.",
        },
        {
          title: "Deposits & confirmations",
          description: "Collect deposits at checkout to reduce no-shows. Automated reminders keep clients informed and your calendar fuller.",
        },
        {
          title: "Payments",
          description: "Accept card payments at checkout. Track revenue by service, stylist and period from the dashboard.",
        },
      ]}
      useCases={[
        "Haircuts and styling appointments",
        "Colour services — highlights, balayage, full colour",
        "Hair treatments and keratin smoothing",
        "Blow-dry and finish bookings",
        "Multi-stylist scheduling with individual availability",
        "Hair extension consultations",
        "Bridal and event hair appointments",
        "Repeat client rebooking with visit history",
      ]}
      benefits={[
        "Clients book themselves — fewer interruptions during services",
        "Colour and treatment timings resolve automatically in the calendar",
        "Client history and notes travel with every appointment",
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
