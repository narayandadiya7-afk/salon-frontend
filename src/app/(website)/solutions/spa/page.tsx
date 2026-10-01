import type { Metadata } from "next";
import { SolutionPageTemplate } from "@/components/admin/admin-website/solution-page-template";

const TITLE = "Spa Management & Online Booking Software | Fyncho";
const DESCRIPTION =
  "Fyncho helps spas manage online bookings, treatment room scheduling, therapist availability, packages, memberships and payments — from one platform.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: { title: TITLE, description: DESCRIPTION, type: "website" },
  twitter: { card: "summary_large_image" },
};

export default function SpaPage() {
  return (
    <SolutionPageTemplate
      eyebrow="Spa"
      heroTitle={<>Spa management as serene as the experience you deliver.</>}
      heroIntro="Fyncho gives spas a polished booking software, treatment room scheduling and the operational tools to manage every therapist, package and customer journey — in one connected platform."
      heroImage="/assets/admin-website/avivane-banner-interior.jpg"
      heroImageAlt="Serene spa treatment room with soft lighting and premium linens"
      challenges={[
        {
          title: "Service and staff scheduling",
          description: "Different treatments require specific team members and durations. Fyncho helps align service availability, staff schedules, and appointment times to create a smoother booking experience.",
        },
        {
          title: "Package and series bookings",
          description: "Spa packages often span multiple sessions and treatments. Managing these manually leads to errors and missed appointments.",
        },
        {
          title: "Customer experience consistency",
          description: "Returning customers expect their preferences, therapist choices and treatment history to be known without re-explaining every visit.",
        },
        {
          title: "Memberships and recurring revenue",
          description: "Spas with membership programmes need a system to manage recurring billing, usage tracking and member communications.",
        },
      ]}
      howFynchoHelps={[
        {
          title: "Online booking",
          description: "Customers book treatments, choose their therapist and select available times directly from your spa software — at any hour.",
        },
        {
          title: "Staff management",
          description: "Set therapist availability, specialisations and booking rules. The platform resolves conflicts automatically.",
        },
        {
          title: "Services & packages",
          description: "Build your treatment menu with durations, add-ons and packages. Customers see exactly what is available and what it includes.",
        },
        {
          title: "Memberships",
          description: "Offer recurring spa memberships with defined entitlements. Turn occasional visitors into committed monthly customers.",
        },
        {
          title: "Customer management",
          description: "Customer profiles hold treatment history, preferences and notes — so every visit feels considered from the first greeting.",
        },
        {
          title: "Payments",
          description: "Accept deposits and full payments at checkout. Track revenue by treatment, therapist and period.",
        },
      ]}
      useCases={[
        "Full-body massage and deep tissue treatments",
        "Facial and skin treatments",
        "Body wraps and scrubs",
        "Hammam and ritual experiences",
        "Spa day packages and couple experiences",
        "Therapist-specific bookings",
        "Monthly spa membership management",
        "Treatment series and course bookings",
      ]}
      benefits={[
        "Customers book the full spa experience — package, therapist and time — in one flow",
        "Memberships create a predictable recurring revenue stream",
        "Customer history and preferences inform every visit before it begins",
      ]}
      relatedSolutions={[
        { label: "Massage Therapy", to: "/solutions/massage-therapy" },
        { label: "Wellness Centers", to: "/solutions/wellness" },
        { label: "Skin Care", to: "/solutions/skincare" },
        { label: "Med-Spa", to: "/solutions/med-spa" },
      ]}
    />
  );
}
