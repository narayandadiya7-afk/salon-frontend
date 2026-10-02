import type { Metadata } from "next";
import { SolutionPageTemplate } from "@/components/admin/admin-website/solution-page-template";

const TITLE = "Skin Care & Facial Business Management Software | Fyncho";
const DESCRIPTION =
  "Fyncho helps skin care businesses and facial studios manage online bookings, treatment schedules, client records and payments — all from one platform.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: { title: TITLE, description: DESCRIPTION, type: "website" },
  twitter: { card: "summary_large_image" },
};

export default function SkincareePage() {
  return (
    <SolutionPageTemplate
      eyebrow="Skin Care & Facials"
      heroTitle={<>Skin care management as considered as the treatments you offer.</>}
      heroIntro="Fyncho gives skin care businesses a professional website, direct client bookings and the tools to manage every treatment, professional and client record — from one place."
      heroImage="/assets/admin-website/avivane-banner-interior.jpg"
      heroImageAlt="Skin care treatment room with professional equipment and soft lighting"
      challenges={[
        {
          title: "Treatment complexity and duration",
          description: "Facial treatments vary significantly in preparation, duration and aftercare. Booking rules need to reflect this accurately.",
        },
        {
          title: "Client skin history",
          description: "Effective skin care depends on knowing what has been used before, any sensitivities and the treatment progression. This needs a structured client record.",
        },
        {
          title: "Course and series bookings",
          description: "Many skin care protocols require multiple sessions. Managing a course of treatments manually creates admin and communication overhead.",
        },
        {
          title: "Presenting the treatment menu clearly",
          description: "Clients booking skin treatments need clear descriptions of what each treatment involves before they commit.",
        },
      ]}
      howFynchoHelps={[
        {
          title: "Online booking",
          description: "Clients browse your treatment menu and book directly from your own website — with clear descriptions, durations and pricing for every service.",
        },
        {
          title: "Service management",
          description: "Define treatments with precise durations, preparation requirements, add-ons and booking intervals. The calendar manages availability automatically.",
        },
        {
          title: "Customer management",
          description: "Client profiles hold treatment history, skin notes, preferences and visit records — giving your practitioners the context they need before every appointment.",
        },
        {
          title: "Staff management",
          description: "Set practitioner availability, specialisations and booking eligibility. Clients book the right person for their treatment.",
        },
        {
          title: "Payments",
          description: "Accept secure online payments at checkout and track revenue by treatment and practitioner.",
        },
        {
          title: "Memberships",
          description: "Offer skin care membership plans that bring clients in for regular treatments on a predictable schedule.",
        },
      ]}
      useCases={[
        "Classic and deep-cleansing facials",
        "Enzyme resurfacing and peels",
        "LED light therapy sessions",
        "Hydrating and anti-ageing facial treatments",
        "Hydrafacial and aqua dermabrasion",
        "Lymphatic facial massage",
        "Multi-session treatment courses",
        "Skin consultation appointments",
      ]}
      benefits={[
        "Client skin history is always accessible before the appointment begins",
        "Treatment courses can be booked and managed as a series, not individual sessions",
        "Your website presents treatments clearly — so clients arrive informed",
      ]}
      relatedSolutions={[
        { label: "Spa", to: "/solutions/spa" },
        { label: "Beauty Salons", to: "/solutions/beauty-salon" },
        { label: "Nail Salons", to: "/solutions/nail-salon" },
      ]}
    />
  );
}
