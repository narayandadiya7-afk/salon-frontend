import type { Metadata } from "next";
import { SolutionPageTemplate } from "@/components/admin/admin-website/solution-page-template";

const TITLE = "Men's Grooming Business Management & Booking Software | Fyncho";
const DESCRIPTION =
  "Fyncho helps men's grooming businesses manage online bookings, stylist schedules, grooming packages, memberships and client records — all from one platform.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: { title: TITLE, description: DESCRIPTION, type: "website" },
  twitter: { card: "summary_large_image" },
};

export default function MensGroomingPage() {
  return (
    <SolutionPageTemplate
      eyebrow="Men's Grooming"
      heroTitle={<>Men's grooming management built for a modern, returning clientele.</>}
      heroIntro="Fyncho gives men's grooming businesses a professional website, direct online booking and the tools to manage services, memberships and client relationships — designed for businesses where loyalty and repeat visits are everything."
      heroImage="/assets/admin-website/avivane-banner-craft.jpg"
      heroImageAlt="Modern men's grooming studio with premium tools and finishes"
      challenges={[
        {
          title: "Frequent repeat visits",
          description: "Men's grooming clients return regularly. The booking experience needs to be fast, familiar and easy — or they'll go somewhere that makes it simpler.",
        },
        {
          title: "Packages and bundles",
          description: "Grooming businesses that offer combined services — cut, beard and skin treatment — need a booking flow that handles packages cleanly.",
        },
        {
          title: "Membership and loyalty",
          description: "Monthly grooming memberships are a natural fit for this clientele. Managing them manually creates billing and communication complexity.",
        },
        {
          title: "Premium positioning online",
          description: "Men's grooming businesses often invest in a premium environment. Their online presence should reflect the same standard.",
        },
      ]}
      howFynchoHelps={[
        {
          title: "Online booking",
          description: "Clients book their service, professional and time from your branded website — in under a minute.",
        },
        {
          title: "Services & packages",
          description: "Define individual services and combined grooming packages with clear durations and pricing.",
        },
        {
          title: "Memberships",
          description: "Offer monthly grooming memberships that lock in regular visits and create a dependable revenue stream.",
        },
        {
          title: "Loyalty",
          description: "Reward returning clients with points and perks that reinforce the habit of choosing your business.",
        },
        {
          title: "Customer management",
          description: "Client profiles hold visit history, preferences and notes — so every visit reflects the relationship built over time.",
        },
        {
          title: "Payments",
          description: "Accept card payments and tips at checkout. Track revenue by service and professional.",
        },
      ]}
      useCases={[
        "Haircuts and styled finishes",
        "Beard shaping and maintenance",
        "Hot towel shaving services",
        "Scalp treatments",
        "Grooming packages — cut, beard and skin",
        "Monthly grooming memberships",
        "Skin care consultations for men",
        "Repeat client scheduling and rebooking",
      ]}
      benefits={[
        "Memberships create a predictable monthly revenue base",
        "Fast rebooking keeps your regulars on the right cadence",
        "A premium website matches the environment you have created in-studio",
      ]}
      relatedSolutions={[
        { label: "Barbershops", to: "/solutions/barbershop" },
        { label: "Hair Salons", to: "/solutions/hair-salon" },
        { label: "Skin Care", to: "/solutions/skincare" },
      ]}
    />
  );
}
