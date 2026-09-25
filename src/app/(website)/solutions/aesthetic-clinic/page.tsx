import type { Metadata } from "next";
import { SolutionPageTemplate } from "@/components/admin/admin-website/solution-page-template";

const TITLE = "Aesthetic Clinic Management & Booking Software | Fyncho";
const DESCRIPTION =
  "Fyncho helps aesthetic clinics manage online bookings, consultation flows, practitioner schedules, deposits and client records — all from one platform.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: { title: TITLE, description: DESCRIPTION, type: "website" },
  twitter: { card: "summary_large_image" },
};

export default function AestheticClinicPage() {
  return (
    <SolutionPageTemplate
      eyebrow="Aesthetic Clinics"
      heroTitle={<>Aesthetic clinic management built for the precision your treatments require.</>}
      heroIntro="Fyncho gives aesthetic clinics a professional website, structured booking flows and the operational tools to manage consultations, treatments and client records — with the control that clinical care demands."
      heroImage="/assets/admin-website/avivane-banner-interior.jpg"
      heroImageAlt="Aesthetic clinic treatment room with professional clinical equipment"
      challenges={[
        { title: "Consultation-first booking flows", description: "Many aesthetic treatments require a consultation before proceeding. The booking system needs to support this sequencing." },
        { title: "High-value appointment protection", description: "Clinical appointments are high-value and hard to fill at short notice. Deposits and strict cancellation terms are essential." },
        { title: "Client treatment records", description: "Accurate records of treatments, products used and client responses are critical for safety and consistency." },
        { title: "Practitioner credibility online", description: "Aesthetic clinic clients research carefully. A professional website with clear treatment descriptions builds the trust needed to book." },
      ]}
      howFynchoHelps={[
        { title: "Online booking", description: "Clients book consultation and treatment appointments from your clinic website, with clear treatment descriptions and practitioner profiles." },
        { title: "Service management", description: "Define your treatment menu with consultation requirements, durations, pricing and any pre-treatment conditions." },
        { title: "Deposits", description: "Require deposits for clinical appointments to protect your schedule and reflect the seriousness of the booking." },
        { title: "Customer management", description: "Client profiles hold treatment history, notes and preferences — supporting safe, consistent clinical care." },
        { title: "Staff management", description: "Set each practitioner's availability, treatment eligibility and scheduling rules." },
        { title: "Payments", description: "Accept deposits and full payments at checkout. Track revenue by treatment and practitioner." },
      ]}
      useCases={[
        "Initial consultation bookings",
        "Anti-wrinkle and dermal filler appointments",
        "Microneedling and skin resurfacing",
        "LED and laser treatment sessions",
        "Chemical peel appointments",
        "Thread lift consultations",
        "Treatment course management",
        "Pre and post-treatment follow-up notes",
      ]}
      benefits={[
        "Consultation-first flows ensure clients are correctly assessed before treatment",
        "Deposits protect high-value clinical appointments from late cancellations",
        "Treatment records support safe, consistent care across multiple visits",
      ]}
      relatedSolutions={[
        { label: "Med-Spa", to: "/solutions/med-spa" },
        { label: "Skin Care", to: "/solutions/skincare" },
        { label: "Spa", to: "/solutions/spa" },
      ]}
    />
  );
}
