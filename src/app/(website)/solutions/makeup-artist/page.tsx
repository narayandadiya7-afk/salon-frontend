import type { Metadata } from "next";
import { SolutionPageTemplate } from "@/components/admin/admin-website/solution-page-template";

const TITLE = "Makeup Artist Booking & Management Software | Fyncho";
const DESCRIPTION =
  "Fyncho helps makeup artists manage client bookings, packages, deposits, bridal appointments and their professional portfolio — all from one platform.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: { title: TITLE, description: DESCRIPTION, type: "website" },
  twitter: { card: "summary_large_image" },
};

export default function MakeupArtistPage() {
  return (
    <SolutionPageTemplate
      eyebrow="Makeup Artists"
      heroTitle={<>Booking and customer management for makeup artists who want to stay focused on the work.</>}
      heroIntro="Fyncho gives makeup artists a professional software, direct customer bookings and the tools to manage every appointment, package and enquiry — without the back-and-forth."
      heroImage="/assets/admin-website/avivane-banner-craft.jpg"
      heroImageAlt="Makeup artist working with a customer in a professional studio"
      challenges={[
        {
          title: "Booking coordination via messages",
          description: "Managing bridal and event bookings through social messages and emails is time-consuming and prone to scheduling errors.",
        },
        {
          title: "Deposits and cancellation terms",
          description: "High-value bookings need a deposit to be taken seriously. Enforcing this without a payment system is awkward.",
        },
        {
          title: "Presenting a professional portfolio",
          description: "Customers want to see your work before committing. A social profile works, but a branded software with a gallery creates a more professional first impression.",
        },
        {
          title: "Managing multiple event types",
          description: "Bridal, editorial, party and event makeup have different requirements, durations and pricing. The booking flow needs to reflect these accurately.",
        },
      ]}
      howFynchoHelps={[
        {
          title: "Online booking",
          description: "Customers book directly from your own software — selecting service type, date and time. No inbox coordination required.",
        },
        {
          title: "Services & packages",
          description: "Define your service menu — bridal trial, wedding day, party makeup, editorial — with individual durations, pricing and add-ons.",
        },
        {
          title: "Deposits",
          description: "Require a deposit at checkout for high-value bookings. This protects your time and gives customers clear confirmation.",
        },
        {
          title: "Customer management",
          description: "Customer profiles hold booking history, event notes and preferences — so every consultation starts from an informed position.",
        },
        {
          title: "Gallery & portfolio",
          description: "Your Fyncho software includes a gallery to showcase your work and give prospective customers the evidence they need to book.",
        },
        {
          title: "Payments",
          description: "Accept deposits and final payments through your software. Track earnings by service and period.",
        },
      ]}
      useCases={[
        "Bridal makeup trials",
        "Wedding day makeup bookings",
        "Event and party makeup",
        "Editorial and photoshoot sessions",
        "Makeup lesson and tutorial appointments",
        "Bridal package and bundle bookings",
        "Portfolio gallery presentation",
        "Deposit collection for event bookings",
      ]}
      benefits={[
        "Deposits protect your diary and set professional expectations from the start",
        "A branded software and gallery replaces a link-in-bio as your professional home",
        "Customer records mean every bridal and event booking starts with full context",
      ]}
      relatedSolutions={[
        { label: "Bridal Services", to: "/solutions/bridal" },
        { label: "Hair Salons", to: "/solutions/hair-salon" },
        { label: "Lash & Brow", to: "/solutions/lash-brow" },
        { label: "Freelancers", to: "/solutions/freelancers" },
      ]}
    />
  );
}
