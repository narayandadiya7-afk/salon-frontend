import type { Metadata } from "next";
import { SolutionPageTemplate } from "@/components/admin/admin-website/solution-page-template";

const TITLE = "Med-Spa Management & Booking Software | Fyncho";
const DESCRIPTION =
  "Fyncho helps med-spas manage online bookings, clinical treatment scheduling, practitioner availability, memberships and client records — all from one platform.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: { title: TITLE, description: DESCRIPTION, type: "website" },
  twitter: { card: "summary_large_image" },
};

export default function MedSpaPage() {
  return (
    <SolutionPageTemplate
      eyebrow="Med-Spa"
      heroTitle={<>Med-spa management that bridges clinical precision and luxury experience.</>}
      heroIntro="Fyncho gives med-spas a polished website, structured clinical booking flows and the operational tools to manage treatments, practitioners and client journeys — across both the clinical and wellness sides of the business."
      heroImage="/assets/admin-website/avivane-banner-interior.jpg"
      heroImageAlt="Med-spa environment combining clinical treatment space with luxury spa aesthetic"
      challenges={[
        { title: "Managing clinical and wellness services together", description: "A med-spa runs clinical treatments and traditional spa services side by side. One platform needs to handle both without confusion." },
        { title: "Practitioner credentialing and availability", description: "Clinical services can only be performed by qualified practitioners. Booking rules need to reflect this accurately." },
        { title: "High-value client relationships", description: "Med-spa clients invest significantly in their care. The client experience — from first visit to ongoing care — needs to reflect that value." },
        { title: "Memberships and recurring programmes", description: "Treatment programmes and wellness memberships are a natural fit for med-spa clients — but managing them manually adds complexity." },
      ]}
      howFynchoHelps={[
        { title: "Online booking", description: "Clients book clinical and wellness treatments from your med-spa website, with clear descriptions, practitioner profiles and availability." },
        { title: "Service management", description: "Define your full treatment menu — clinical and wellness — with durations, consultation requirements, pricing and booking rules." },
        { title: "Staff management", description: "Set availability, qualifications and treatment eligibility per practitioner. Clinical bookings route to the right person automatically." },
        { title: "Customer management", description: "Client profiles hold treatment history, clinical notes and wellness preferences — supporting the continuity of a premium care relationship." },
        { title: "Memberships", description: "Offer wellness membership programmes that keep med-spa clients engaged with regular treatments." },
        { title: "Payments", description: "Accept deposits, package payments and card payments at checkout. Track clinical and wellness revenue separately." },
      ]}
      useCases={[
        "Injectables and skin treatment consultations",
        "Body contouring and sculpting appointments",
        "Laser and light therapy sessions",
        "Vitamin IV and wellness infusions",
        "Luxury massage and body treatments",
        "Multi-session clinical programmes",
        "Wellness membership management",
        "Combined clinical and spa day packages",
      ]}
      benefits={[
        "Clinical and wellness services are managed in one platform without workflow conflicts",
        "Practitioner qualifications are reflected in the booking rules automatically",
        "Memberships and programmes support the long-term client relationships med-spas are built on",
      ]}
      relatedSolutions={[
        { label: "Aesthetic Clinics", to: "/solutions/aesthetic-clinic" },
        { label: "Skin Care", to: "/solutions/skincare" },
        { label: "Spa", to: "/solutions/spa" },
        { label: "Wellness Centers", to: "/solutions/wellness" },
      ]}
    />
  );
}
