import type { Metadata } from "next";
import { SolutionPageTemplate } from "@/components/admin/admin-website/solution-page-template";

const TITLE = "Yoga & Pilates Studio Management & Booking Software | Fyncho";
const DESCRIPTION =
  "Fyncho helps yoga and Pilates studios manage class bookings, memberships, instructor schedules and client records — all from one platform.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: { title: TITLE, description: DESCRIPTION, type: "website" },
  twitter: { card: "summary_large_image" },
};

export default function YogaPilatesPage() {
  return (
    <SolutionPageTemplate
      eyebrow="Yoga & Pilates Studios"
      heroTitle={<>Yoga and Pilates studio management that keeps operations as calm as the practice.</>}
      heroIntro="Fyncho gives yoga and Pilates studios a professional software, direct class and session booking, and the operational tools to manage instructors, memberships and customers — in one connected platform."
      heroImage="/assets/admin-website/avivane-banner-interior.jpg"
      heroImageAlt="Clean, light-filled yoga and Pilates studio space"
      challenges={[
        { title: "Class and session scheduling", description: "Studios need to manage both group classes and individual sessions, with accurate capacity and instructor availability." },
        { title: "Memberships and class packs", description: "Yoga and Pilates customers typically commit to memberships or session packs. Managing these manually creates billing complexity." },
        { title: "Drop-in and regular customer mix", description: "Studios serve a mix of members, pack holders and drop-ins. The booking flow needs to handle this distinction clearly." },
        { title: "Instructor management", description: "Different instructors teach different styles and have different availability. Customers often want to book a specific instructor." },
      ]}
      howFynchoHelps={[
        { title: "Online booking", description: "Customers book classes and individual sessions from your studio software, with real-time availability and instructor selection." },
        { title: "Service management", description: "Define class types, session formats and private training options with durations, pricing and capacity rules." },
        { title: "Memberships", description: "Offer monthly memberships and session packs. Customers manage their credits and membership status from their account." },
        { title: "Staff management", description: "Set each instructor's schedule, class eligibility and availability. Bookings reflect real capacity automatically." },
        { title: "Customer management", description: "Customer profiles hold attendance history, membership status and preferences — giving your instructors useful context." },
        { title: "Payments", description: "Accept payments for memberships, packs and drop-in sessions at checkout." },
      ]}
      useCases={[
        "Group yoga class bookings",
        "Pilates reformer class scheduling",
        "Private one-to-one sessions",
        "Instructor-specific class bookings",
        "Monthly membership management",
        "Session pack and credit tracking",
        "Workshop and intensive bookings",
        "Drop-in client management",
      ]}
      benefits={[
        "Members, pack holders and drop-ins are managed in one system",
        "Instructor availability and class capacity resolve automatically",
        "Memberships and packs support the regular commitment yoga and Pilates clients make",
      ]}
      relatedSolutions={[
        { label: "Wellness Centers", to: "/solutions/wellness" },
        { label: "Massage Therapy", to: "/solutions/massage-therapy" },
        { label: "Spa", to: "/solutions/spa" },
      ]}
    />
  );
}
