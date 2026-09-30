import type { Metadata } from "next";
import { SolutionPageTemplate } from "@/components/admin/admin-website/solution-page-template";

const TITLE = "Beauty Salon Management & Booking Software | Fyncho";
const DESCRIPTION =
  "Fyncho helps beauty salons manage online bookings, staff schedules, multi-service menus, client records and payments — all from one platform.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: { title: TITLE, description: DESCRIPTION, type: "website" },
  twitter: { card: "summary_large_image" },
};

export default function BeautySalonPage() {
  return (
    <SolutionPageTemplate
      eyebrow="Beauty Salons"
      heroTitle={<>Beauty salon management that covers every service, every professional, every customer.</>}
      heroIntro="Fyncho gives full-service beauty salons a branded software, online booking and the operational tools to manage hair, skin, nails and more — across the whole team."
      heroImage="/assets/admin-website/avivane-banner-interior.jpg"
      heroImageAlt="Full-service beauty salon with multiple treatment stations"
      challenges={[
        {
          title: "A wide service menu to manage",
          description: "Beauty salons offer services across hair, skin, nails and body. Keeping the service menu organised and bookable requires structure.",
        },
        {
          title: "Cross-category scheduling",
          description: "A customer may book a haircut and a facial on the same visit. Managing simultaneous services across staff and rooms is complex without the right tools.",
        },
        {
          title: "Staff specialisations",
          description: "Not every professional offers every service. Booking rules need to reflect individual skills and availability accurately.",
        },
        {
          title: "Customer retention",
          description: "A beauty salon's best customers visit regularly across several services. Memberships, loyalty and consistent records are key to keeping them.",
        },
      ]}
      howFynchoHelps={[
        {
          title: "Online booking",
          description: "Customers browse your full service menu, pick their professional and book a time — from your own software, not a marketplace.",
        },
        {
          title: "Service management",
          description: "Organise services by category — hair, skin, nails, spa — with individual durations, pricing and booking rules per service.",
        },
        {
          title: "Staff management",
          description: "Set skills, working hours and service eligibility per professional. The calendar resolves availability in real time.",
        },
        {
          title: "Customer management",
          description: "Customer profiles hold visit history across all service categories, preferences, notes and spend — keeping the whole team informed.",
        },
        {
          title: "Memberships & loyalty",
          description: "Offer memberships and loyalty programmes that reward customers for regular visits and encourage them to explore more of your menu.",
        },
        {
          title: "Payments",
          description: "Manage secure online payments at checkout and track revenue across services, team members, and time periods.",
        },
      ]}
      useCases={[
        "Hair services — cuts, colour, treatments",
        "Facials and skin treatments",
        "Manicure and pedicure bookings",
        "Waxing and hair removal",
        "Brow and lash services",
        "Body treatments and massage",
        "Multi-service combination bookings",
        "Cross-department scheduling for the same customer",
      ]}
      benefits={[
        "One software and one dashboard for the whole salon — not one per department",
        "Customers can book across your full menu in a single visit",
        "Memberships and loyalty keep multi-service customers returning",
      ]}
      relatedSolutions={[
        { label: "Hair Salons", to: "/solutions/hair-salon" },
        { label: "Nail Salons", to: "/solutions/nail-salon" },
        { label: "Lash & Brow", to: "/solutions/lash-brow" },
        { label: "Skin Care", to: "/solutions/skincare" },
      ]}
    />
  );
}
