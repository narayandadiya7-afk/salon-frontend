import type { Metadata } from "next";
import { SolutionPageTemplate } from "@/components/admin/admin-website/solution-page-template";

const TITLE = "Skin Care & Facial Business Management Software | Fyncho";
const DESCRIPTION =
  "Fyncho helps skin care businesses and facial studios manage online bookings, treatment schedules, customer records and payments — all from one platform.";

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
      heroIntro="Fyncho gives skin care businesses a professional software, direct customer bookings and the tools to manage every treatment, professional and customer record — from one place."
      heroImage="/assets/admin-website/avivane-banner-interior.jpg"
      heroImageAlt="Skin care treatment room with professional equipment and soft lighting"
      challenges={[
        {
          title: "Treatment complexity and duration",
          description: "Facial treatments vary significantly in preparation, duration and aftercare. Booking rules need to reflect this accurately.",
        },
        {
          title: "Customer and service history",
          description: "Building strong customer relationships requires easy access to customer details, past appointments, and the services they've booked. Keeping this information organized helps businesses provide a more consistent experience.",
        },
        {
          title: "Repeat treatment bookings",
          description: "Many skin care services require customers to return for multiple appointments. Managing repeat bookings manually can create unnecessary administrative and communication work.",
        },
        {
          title: "Presenting the treatment menu clearly",
          description: "Customers booking skin treatments need clear descriptions of what each treatment involves before they commit.",
        },
      ]}
      howFynchoHelps={[
        {
          title: "Online booking",
          description: "Customers browse your treatment menu and book directly from your own software — with clear descriptions, durations and pricing for every service.",
        },
        {
          title: "Service management",
          description: "Define treatments with precise durations, preparation requirements, add-ons and booking intervals. The calendar manages availability automatically.",
        },
        {
          title: "Customer management",
          description: "Keep customer profiles, appointment history, preferences, and important customer information organized in one place — giving your team the context they need to provide a consistent experience.",
        },
        {
          title: "Staff management",
          description: "Set practitioner availability, specialisations and booking eligibility. Customers book the right person for their treatment.",
        },
        {
          title: "Payments",
          description: "Accept secure online payments at checkout and track revenue by treatment and practitioner.",
        },
        {
          title: "Memberships",
          description: "Offer skin care membership plans that bring customers in for regular treatments on a predictable schedule.",
        },
      ]}
      useCases={[
        "Classic and deep-cleansing facials",
        "Enzyme resurfacing and peels",
        "LED light therapy sessions",
        "Hydrating and anti-ageing facial treatments",
        "Hydrafacial and aqua dermabrasion",
        "Lymphatic facial massage",
        "Skin consultation appointments",
      ]}
      benefits={[
        "Customer details and appointment history are organized in one place, so your team has the information they need before each appointment.",
        "Services, durations, team availability, and bookings are managed together, making it easier to keep appointments organized.",
        "Your business presence presents services and information clearly, helping customers understand what you offer and book with confidence.",
      ]}
      relatedSolutions={[
        { label: "Spa", to: "/solutions/spa" },
        { label: "Beauty Salons", to: "/solutions/beauty-salon" },
        { label: "Nail Salons", to: "/solutions/nail-salon" },
      ]}
    />
  );
}
