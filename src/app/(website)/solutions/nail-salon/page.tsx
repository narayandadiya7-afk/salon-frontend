import type { Metadata } from "next";
import { SolutionPageTemplate } from "@/components/admin/admin-website/solution-page-template";

const TITLE = "Nail Salon Management & Booking Software | Fyncho";
const DESCRIPTION =
  "Fyncho helps nail salons manage online bookings, technician schedules, nail service menus, add-ons and client records — all from one platform.";

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
      heroTitle={<>Nail salon management as polished as the results you deliver.</>}
      heroIntro="Fyncho gives nail salons a professional website, direct online booking and the tools to manage every technician, service and client — without the admin overhead."
      heroImage="/assets/admin-website/avivane-banner-craft.jpg"
      heroImageAlt="Nail technician working at a modern nail studio"
      challenges={[
        {
          title: "Short services, high volume",
          description: "Nail services are short but high-frequency. Managing a full day of back-to-back appointments across technicians needs precision.",
        },
        {
          title: "Add-ons and upgrade decisions",
          description: "Clients often decide on gel, nail art or extra treatments at the point of booking. The service menu needs to support this clearly.",
        },
        {
          title: "Portfolio and gallery",
          description: "Nail work is visual. New clients need to see your style before they commit — a static Instagram profile isn't the same as a branded gallery.",
        },
        {
          title: "Repeat client management",
          description: "Regular clients want their favourite technician and their preferred service easy to rebook without starting from scratch.",
        },
      ]}
      howFynchoHelps={[
        {
          title: "Online booking",
          description: "Clients book service, technician and time from your nail salon website. Add-ons are presented clearly in the flow.",
        },
        {
          title: "Service & add-on management",
          description: "Build a service menu with base services, gel upgrades, nail art options and durations. Clients see exactly what they are booking.",
        },
        {
          title: "Staff management",
          description: "Set each technician's working hours and availability. Bookings land in the right column without double-booking.",
        },
        {
          title: "Gallery",
          description: "Show your work through your branded website gallery — giving new clients the confidence to book and returning clients a reason to try something new.",
        },
        {
          title: "Customer management",
          description: "Client profiles hold visit history, preferred technician, notes and spend — all in one record.",
        },
        {
          title: "Payments",
          description: "Accept deposits and card payments at checkout. Track revenue by technician and service.",
        },
      ]}
      useCases={[
        "Classic manicure and pedicure",
        "Gel and shellac nails",
        "Acrylic and structured extensions",
        "Nail art and custom designs",
        "Russian manicure and cuticle care",
        "Warm stone pedicure treatments",
        "Technician-specific bookings",
        "Repeat client rebooking with history",
      ]}
      benefits={[
        "Clients book service, add-ons and technician in a single flow",
        "Your gallery turns scroll time into confirmed appointments",
        "Repeat clients rebook their favourites in seconds",
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
