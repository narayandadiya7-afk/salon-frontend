import type { Metadata } from "next";
import { SolutionPageTemplate } from "@/components/admin/admin-website/solution-page-template";

const TITLE = "Wellness Center Management & Booking Software | Fyncho";
const DESCRIPTION =
  "Fyncho helps wellness centres manage online bookings, multi-practitioner scheduling, memberships and customer records — all from one platform.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: { title: TITLE, description: DESCRIPTION, type: "website" },
  twitter: { card: "summary_large_image" },
};

export default function WellnessPage() {
  return (
    <SolutionPageTemplate
      eyebrow="Wellness Centers"
      heroTitle={<>Wellness centre management designed for the whole customer journey.</>}
      heroIntro="Fyncho gives wellness centres a professional software, multi-practitioner booking and the operational tools to manage services, memberships and customer relationships — in one connected platform."
      heroImage="/assets/admin-website/avivane-banner-interior.jpg"
      heroImageAlt="Wellness centre with calm treatment space and natural light"
      challenges={[
        {
          title: "Multi-practitioner coordination",
          description: "Wellness centres often have practitioners across multiple disciplines. Coordinating availability without overlaps is difficult without a central system.",
        },
        {
          title: "Diverse service offerings",
          description: "A wellness centre may offer massage, nutrition consultations, holistic therapy and energy work — each with different durations and booking requirements.",
        },
        {
          title: "Customer retention and regular visits",
          description: "Wellness customers benefit most from consistent, ongoing care. Memberships and loyalty programmes support this but need a system to manage them.",
        },
        {
          title: "Professional online presence",
          description: "A wellness centre's credibility depends partly on how it presents itself online. A generic booking page is not the same as a branded software.",
        },
      ]}
      howFynchoHelps={[
        {
          title: "Online booking",
          description: "Customers book their preferred practitioner, service and time directly from your wellness centre software — any time of day.",
        },
        {
          title: "Staff management",
          description: "Set each practitioner's availability, disciplines and booking rules. The calendar handles coordination automatically.",
        },
        {
          title: "Service management",
          description: "Define your full service menu across disciplines, with durations, pricing and any specific booking requirements.",
        },
        {
          title: "Memberships",
          description: "Offer wellness membership programmes that commit customers to a regular schedule and provide predictable recurring revenue.",
        },
        {
          title: "Customer management",
          description: "Customer profiles hold visit history, preferences and practitioner notes — supporting the continuity of care that wellness customers value.",
        },
        {
          title: "Payments",
          description: "Accept payments and deposits at checkout. Track revenue by practitioner, service and period.",
        },
      ]}
      useCases={[
        "Holistic therapy and energy healing appointments",
        "Nutritional consultation bookings",
        "Naturopathy and integrative health sessions",
        "Meditation and mindfulness sessions",
        "Wellness packages and programmes",
        "Multi-practitioner scheduling on the same day",
        "Ongoing customer care with visit history",
        "Wellness membership management",
      ]}
      benefits={[
        "Customers can explore your full practice and book any service from one software",
        "Memberships support the regular cadence of wellness care",
        "Practitioner notes and visit history ensure continuity across sessions",
      ]}
      relatedSolutions={[
        { label: "Spa", to: "/solutions/spa" },
        { label: "Massage Therapy", to: "/solutions/massage-therapy" },
        { label: "Yoga & Pilates", to: "/solutions/yoga-pilates" },
        { label: "Skin Care", to: "/solutions/skincare" },
      ]}
    />
  );
}
