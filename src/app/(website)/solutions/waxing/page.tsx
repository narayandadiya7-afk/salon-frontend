import type { Metadata } from "next";
import { SolutionPageTemplate } from "@/components/admin/admin-website/solution-page-template";

const TITLE = "Waxing & Hair Removal Business Booking Software | Fyncho";
const DESCRIPTION =
  "Fyncho helps waxing and hair removal businesses manage online bookings, technician schedules, service menus and client records — all from one platform.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: { title: TITLE, description: DESCRIPTION, type: "website" },
  twitter: { card: "summary_large_image" },
};

export default function WaxingPage() {
  return (
    <SolutionPageTemplate
      eyebrow="Waxing & Hair Removal"
      heroTitle={<>Waxing and hair removal management built for high-frequency, returning clients.</>}
      heroIntro="Fyncho gives waxing and hair removal businesses a professional website, direct online booking and the tools to manage every technician, service and client — designed for the repeat cadence of hair removal."
      heroImage="/assets/admin-website/avivane-banner-craft.jpg"
      heroImageAlt="Waxing treatment room set up for a professional appointment"
      challenges={[
        { title: "High repeat visit volume", description: "Waxing clients return every four to six weeks. Fast rebooking and automated reminders are essential to keep the calendar full." },
        { title: "Service clarity for new clients", description: "A new client booking waxing services needs to know exactly what is included, what to prepare and what to expect." },
        { title: "Technician-specific bookings", description: "Clients often prefer the same technician for intimate services. The booking system needs to support this preference easily." },
        { title: "No-shows on tightly scheduled days", description: "Waxing appointments are short and tightly scheduled. A missed booking is hard to fill at short notice." },
      ]}
      howFynchoHelps={[
        { title: "Online booking", description: "Clients book their service, technician and time from your own website — with clear service descriptions and durations." },
        { title: "Service management", description: "Define your waxing menu with individual service durations, pricing and any pre-appointment instructions." },
        { title: "Staff management", description: "Set each technician's availability and service menu. Preferred-technician bookings are handled without manual coordination." },
        { title: "Deposits & reminders", description: "Collect deposits for new clients and send automated reminders to protect your tightly scheduled calendar." },
        { title: "Customer management", description: "Client profiles hold visit history, preferences and any notes — supporting a consistent, personalised experience." },
        { title: "Payments", description: "Accept secure online payments at checkout and track revenue by service and technician." },
      ]}
      useCases={[
        "Full and half leg waxing",
        "Bikini and Brazilian waxing",
        "Brow and facial waxing",
        "Underarm and arm waxing",
        "Back and chest waxing",
        "Full body waxing packages",
        "Preferred technician scheduling",
        "Repeat client fast rebooking",
      ]}
      benefits={[
        "Clients rebook their preferred technician in seconds from their phone",
        "Reminders keep your repeat clients on the right cycle",
        "Deposits protect a calendar built on short, high-frequency appointments",
      ]}
      relatedSolutions={[
        { label: "Beauty Salons", to: "/solutions/beauty-salon" },
        { label: "Lash & Brow", to: "/solutions/lash-brow" },
        { label: "Nail Salons", to: "/solutions/nail-salon" },
        { label: "Freelancers", to: "/solutions/freelancers" },
      ]}
    />
  );
}
