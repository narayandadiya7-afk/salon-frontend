import type { Metadata } from "next";

import { SolutionPageTemplate } from "@/components/admin/admin-website/solution-page-template";

const TITLE = "Skin Care & Facial Business Management Software | Fyncho";

const DESCRIPTION =
  "Fyncho helps skin care businesses and facial studios manage online bookings, services, team schedules, customers and payments — all from one platform.";

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
      heroIntro="Fyncho gives skin care businesses professional business software, online booking, and the tools to manage services, team schedules, customers, and appointments — all in one place."
      heroImage="/assets/admin-website/avivane-banner-interior.jpg"
      heroImageAlt="Skin care treatment room with professional equipment and soft lighting"
      challenges={[
        {
          title: "Different service durations",
          description:
            "Skin care and facial services can vary significantly in duration. Keeping services, durations, team availability, and appointments organized helps create a smoother booking experience.",
        },
        {
          title: "Customer and appointment history",
          description:
            "Building strong customer relationships requires easy access to customer information and past appointments. Keeping this information organized helps businesses provide a more consistent experience.",
        },
        {
          title: "Repeat treatment bookings",
          description:
            "Many skin care customers return regularly for different services. Making it easy to book again helps create a smoother experience and encourages repeat visits.",
        },
        {
          title: "Presenting services clearly",
          description:
            "Customers want to understand what a skin care service includes before booking. Clear service descriptions, durations, and pricing make the booking experience easier.",
        },
      ]}
      howFynchoHelps={[
        {
          title: "Online booking",
          description:
            "Customers can explore your services and book directly with your business, with clear descriptions, durations, and pricing for each service.",
        },
        {
          title: "Service management",
          description:
            "Define your skin care and facial services with clear descriptions, durations, and pricing so customers know what they are booking.",
        },
        {
          title: "Customer management",
          description:
            "Keep customer profiles and appointment history organized in one place, giving your team the information they need for a consistent experience.",
        },
        {
          title: "Team management",
          description:
            "Manage your practitioners, availability, schedules, and services in one place to keep appointments organized.",
        },
        {
          title: "Payments",
          description:
            "Accept deposits and online payments at checkout. Track revenue by service, team member, and time period from your business dashboard.",
        },
        {
          title: "Memberships",
          description:
            "Offer memberships that encourage customers to return regularly and build lasting relationships with your business.",
        },
      ]}
      useCases={[
        "Classic and deep-cleansing facials",
        "Enzyme resurfacing and peels",
        "LED light therapy sessions",
        "Hydrating and anti-ageing facial treatments",
        "Hydrafacial and aqua dermabrasion",
        "Lymphatic facial massage",
        "Skin care service appointments",
        "Online booking and repeat appointments",
      ]}
      benefits={[
        "Customer profiles and appointment history stay organized in one place",
        "Manage services, durations, team availability, customers, and bookings together",
        "A professional business presence helps customers understand your services and book with confidence",
      ]}
      relatedSolutions={[
        { label: "Spa", to: "/solutions/spa" },
        { label: "Beauty Salons", to: "/solutions/beauty-salon" },
        { label: "Nail Salons", to: "/solutions/nail-salon" },
      ]}
    />
  );
}