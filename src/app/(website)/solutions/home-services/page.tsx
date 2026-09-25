import type { Metadata } from "next";
import { SolutionPageTemplate } from "@/components/admin/admin-website/solution-page-template";

const TITLE = "Home-Service & Mobile Beauty Professional Booking Software | Fyncho";
const DESCRIPTION =
  "Fyncho helps home-service and mobile beauty professionals manage online bookings, client records, deposits and payments — without a fixed location.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: { title: TITLE, description: DESCRIPTION, type: "website" },
  twitter: { card: "summary_large_image" },
};

export default function HomeServicesPage() {
  return (
    <SolutionPageTemplate
      eyebrow="Home-Service & Mobile Professionals"
      heroTitle={<>Your services, delivered wherever your clients are — managed from one platform.</>}
      heroIntro="Fyncho gives mobile and home-service beauty professionals a professional website, direct client bookings and the tools to manage every appointment and client record — without a fixed location."
      heroImage="/assets/admin-website/avivane-banner-craft.jpg"
      heroImageAlt="Mobile beauty professional preparing equipment for a home appointment"
      challenges={[
        { title: "No fixed address for clients to find you", description: "Mobile professionals can't rely on a physical location to establish credibility. A professional website is the shop front." },
        { title: "Booking requests via messages and calls", description: "Managing every enquiry and confirmation personally between appointments takes time away from the service itself." },
        { title: "Protecting time and travel costs", description: "Late cancellations from mobile bookings are costly. A deposit system needs to be in place and easy to enforce." },
        { title: "Building a returning client base", description: "Growth depends on repeat bookings and referrals. Client records and follow-up matter as much for mobile professionals as for studios." },
      ]}
      howFynchoHelps={[
        { title: "Your own website", description: "A complete, branded professional website at your own Fyncho URL — with services, gallery and direct booking, accessible from anywhere." },
        { title: "Online booking", description: "Clients book directly from your website. You manage your availability once, and the calendar handles the coordination." },
        { title: "Deposits", description: "Require a deposit for bookings to protect your time and cover the cost of travel when a client cancels." },
        { title: "Customer management", description: "Client profiles hold visit history, address notes and preferences — useful context when you are going to them." },
        { title: "Payments", description: "Accept card payments and track earnings by service and period." },
        { title: "Notifications & reminders", description: "Automated reminders keep clients informed before their appointment, reducing last-minute cancellations." },
      ]}
      useCases={[
        "Home visit hair styling and cuts",
        "Mobile makeup for events and occasions",
        "In-home massage therapy sessions",
        "Mobile nail services",
        "Home-visit lash and brow treatments",
        "Bridal morning-of mobile services",
        "Corporate wellness sessions",
        "Care home and assisted-living beauty visits",
      ]}
      benefits={[
        "A professional website replaces a social profile as your business front door",
        "Deposits protect the time and travel investment of every mobile booking",
        "Client address notes and history travel with every appointment",
      ]}
      relatedSolutions={[
        { label: "Freelancers", to: "/solutions/freelancers" },
        { label: "Massage Therapy", to: "/solutions/massage-therapy" },
        { label: "Makeup Artists", to: "/solutions/makeup-artist" },
        { label: "Bridal Services", to: "/solutions/bridal" },
      ]}
    />
  );
}
