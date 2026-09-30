import type { Metadata } from "next";
import { SolutionPageTemplate } from "@/components/admin/admin-website/solution-page-template";

const TITLE = "Bridal Beauty Services Management & Booking Software | Fyncho";
const DESCRIPTION =
  "Fyncho helps bridal beauty professionals manage wedding bookings, trial appointments, packages, deposits and client planning — all from one platform.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: { title: TITLE, description: DESCRIPTION, type: "website" },
  twitter: { card: "summary_large_image" },
};

export default function BridalPage() {
  return (
    <SolutionPageTemplate
      eyebrow="Bridal Services"
      heroTitle={<>Bridal beauty management built for the detail that weddings demand.</>}
      heroIntro="Fyncho gives bridal beauty professionals a professional software, structured booking flows and the tools to manage every trial, wedding-day appointment and bridal party — without losing a detail."
      heroImage="/assets/admin-website/avivane-banner-interior.jpg"
      heroImageAlt="Bridal beauty preparation with professional hair and makeup setup"
      challenges={[
        { title: "Complex multi-appointment planning", description: "Bridal bookings span months — a trial, wedding morning prep and sometimes a party. Managing the full timeline needs structure." },
        { title: "Deposits for high-value dates", description: "Wedding-day bookings deserve a deposit. Without a system, this is awkward to request and hard to track." },
        { title: "Group and party coordination", description: "Bridal parties may need several professionals on the same morning. Coordinating availability and timing manually is error-prone." },
        { title: "Professional portfolio presentation", description: "Brides research extensively before booking. A gallery of real bridal work on a professional software builds the confidence to enquire." },
      ]}
      howFynchoHelps={[
        { title: "Online booking", description: "Brides book trial and wedding-day appointments directly from your software, with clear service descriptions and durations." },
        { title: "Services & packages", description: "Define bridal packages — trial only, trial + wedding day, bridal party rates — with pricing and booking rules." },
        { title: "Deposits", description: "Collect a deposit to secure wedding-date bookings. This protects your diary and sets professional expectations." },
        { title: "Customer management", description: "Customer profiles hold trial notes, wedding-day preferences, timeline requirements and any agreed details." },
        { title: "Gallery", description: "Showcase real bridal work through your branded software gallery — the most persuasive tool for a booking decision." },
        { title: "Payments", description: "Accept deposits and final payments through your software. Track bridal booking revenue by period." },
      ]}
      useCases={[
        "Bridal hair and makeup trial appointments",
        "Wedding morning preparation bookings",
        "Bridal party hair and makeup scheduling",
        "Destination wedding booking management",
        "Pre-wedding skin preparation treatments",
        "Bridal package and bundle management",
        "Deposit collection for wedding-date holds",
        "Timeline planning notes per customer",
      ]}
      benefits={[
        "Every bridal booking from first enquiry to wedding day is managed in one place",
        "Deposits and structured packages protect your most important bookings",
        "A gallery software builds the trust that converts a research browse into a booking",
      ]}
      relatedSolutions={[
        { label: "Makeup Artists", to: "/solutions/makeup-artist" },
        { label: "Hair Salons", to: "/solutions/hair-salon" },
        { label: "Lash & Brow", to: "/solutions/lash-brow" },
        { label: "Freelancers", to: "/solutions/freelancers" },
      ]}
    />
  );
}
