import type { Metadata } from "next";
import {
  SiteShell,
  PageHero,
} from "@/components/admin/admin-website/site-shell";
import {
  ClosingCta,
  SectionHeading,
} from "@/components/admin/admin-website/marketing-sections";

const TITLE = "Customer Stories — How Service Businesses Use Fyncho";

const DESCRIPTION =
  "See how salons, barbershops, spas, wellness businesses, studios, and independent professionals can use Fyncho to manage services, bookings, customers, teams, payments, and daily operations.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

const stories = [
  {
    business: "Hair Salons",
    type: "Salons & Studios",
    challenge:
      "Managing services, different durations, team schedules, and customer bookings can become difficult as the salon grows.",
    help:
      "Fyncho brings services, team availability, online booking, customer profiles, appointments, payments, and reports together in one place.",
    result:
      "A simpler way to manage the salon",
  },
  {
    business: "Barbershops",
    type: "Grooming",
    challenge:
      "Busy appointment schedules and frequent repeat visits can create unnecessary work when bookings are managed manually.",
    help:
      "Customers can book online while the business manages barbers, services, schedules, customers, deposits, and payments from one platform.",
    result:
      "More time focused on the business",
  },
  {
    business: "Spa",
    type: "Wellness & Body",
    challenge:
      "Spas often manage a broad range of services, different team schedules, and customers returning for regular appointments.",
    help:
      "Fyncho brings services, team schedules, bookings, customer information, memberships, loyalty, and payments together.",
    result:
      "A more connected customer experience",
  },
  {
    business: "Nail Studios",
    type: "Salons & Studios",
    challenge:
      "Different nail services can have different durations, prices, and team availability, making manual scheduling harder to manage.",
    help:
      "Customers can explore services and book online while the business manages services, team members, appointments, customers, and payments.",
    result:
      "A clearer booking experience",
  },
  {
    business: "Massage & Wellness",
    type: "Wellness, Skin & Body",
    challenge:
      "Independent professionals and growing wellness businesses need to manage bookings without spending their day coordinating messages and appointments.",
    help:
      "Fyncho provides online booking, service management, customer profiles, appointment history, deposits, reminders, and payments.",
    result:
      "Less booking administration",
  },
  {
    business: "Independent Professionals",
    type: "Solo Businesses",
    challenge:
      "Running a business alone means managing services, customers, appointments, payments, and the business presence yourself.",
    help:
      "Fyncho gives independent professionals their own business software, business address, online booking, customer management, and payment tools.",
    result:
      "Everything managed from one place",
  },
];

export default function CustomersPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Customer stories"
        title={<>Built around the businesses that use it.</>}
        intro="Every service business works a little differently. Fyncho brings the essential tools together while giving each business its own professional business software and customer experience."
        image="/assets/admin-website/avivane-banner-craft.jpg"
        imageAlt="Service business owner creating a polished customer experience"
      />

      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
          <img
            src="/assets/admin-website/owner-portrait.jpg"
            alt="Service business owner in a professional studio"
            loading="lazy"
            width={912}
            height={1104}
            className="aspect-4/5 w-full rounded-2xl object-cover lg:col-span-4"
          />

          <div className="lg:col-span-8">
            <p className="eyebrow">One platform, different businesses</p>

            <blockquote className="mt-5">
              <p className="font-display text-3xl leading-snug text-balance sm:text-4xl">
                "Your business should have the tools to manage the work behind
                every customer experience."
              </p>
            </blockquote>

            <p className="mt-6 max-w-[58ch] leading-relaxed text-muted-foreground">
              Whether you run a salon, barbershop, spa, studio, wellness
              business, or work independently, Fyncho is built around the same
              essential goal: make it easier to manage your business and give
              customers a simple way to book with you.
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-surface py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-10 max-w-2xl">
            <p className="eyebrow">Different businesses</p>

            <h2 className="mt-3 text-4xl leading-tight text-balance sm:text-5xl">
              The same platform. A different fit for every business.
            </h2>

            <p className="mt-4 leading-relaxed text-muted-foreground">
              These examples show how different types of service businesses can
              use Fyncho to bring their day-to-day operations together.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {stories.map((story) => (
              <article
                key={story.business}
                className="card-lux bg-background p-8"
              >
                <h2 className="text-2xl">{story.business}</h2>

                <p className="mt-1 font-mono text-xs uppercase tracking-[0.18em] text-brass">
                  {story.type}
                </p>

                <dl className="mt-6 space-y-5 text-sm">
                  <div>
                    <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                      The challenge
                    </dt>

                    <dd className="mt-2 leading-relaxed">
                      {story.challenge}
                    </dd>
                  </div>

                  <div>
                    <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                      With Fyncho
                    </dt>

                    <dd className="mt-2 leading-relaxed">
                      {story.help}
                    </dd>
                  </div>

                  <div className="border-t border-line pt-5">
                    <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                      The outcome
                    </dt>

                    <dd className="mt-2 font-display text-2xl leading-tight">
                      {story.result}
                    </dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
        <SectionHeading
          eyebrow="What Fyncho brings together"
          title="The practical tools behind a smoother customer experience."
          description="Fyncho connects the essential parts of running a service business so owners and teams can manage their work from one place."
        />

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {[
            [
              "Services",
              "Manage service descriptions, durations, pricing, and the services customers can book.",
            ],
            [
              "Team",
              "Manage team members, availability, schedules, services, and appointments in one place.",
            ],
            [
              "Customers",
              "Keep customer profiles and appointment history organized for a consistent experience.",
            ],
            [
              "Bookings",
              "Give customers a direct way to explore services and book appointments online.",
            ],
            [
              "Payments",
              "Accept deposits and online payments while keeping business revenue information organized.",
            ],
            [
              "Memberships & Loyalty",
              "Offer memberships and loyalty programs that encourage customers to return regularly.",
            ],
          ].map(([title, copy], index) => (
            <article
              key={title}
              className="border-t border-brass pt-6"
            >
              <span className="font-mono text-xs text-brass">
                0{index + 1}
              </span>

              <h3 className="mt-4 text-3xl">{title}</h3>

              <p className="mt-3 leading-relaxed text-muted-foreground">
                {copy}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-line bg-surface py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <SectionHeading
                eyebrow="From independent to growing"
                title="Start with the way your business works today."
                description="Fyncho is designed for independent professionals, growing teams, specialist studios, and businesses operating across multiple locations."
              />
            </div>

            <div className="divide-y divide-line border-y border-line lg:col-span-7">
              {[
                [
                  "01",
                  "Independent",
                  "Manage your services, customers, bookings, payments, and daily business operations from one place.",
                ],
                [
                  "02",
                  "Growing Team",
                  "Bring team members, services, schedules, appointments, and customers together as the business grows.",
                ],
                [
                  "03",
                  "Specialist Studio",
                  "Present your services professionally while giving customers a simple way to explore and book.",
                ],
                [
                  "04",
                  "Multi-Location Group",
                  "Bring multiple locations, teams, services, customers, and bookings together on one platform.",
                ],
              ].map(([number, title, copy]) => (
                <div
                  key={title}
                  className="grid gap-4 py-7 sm:grid-cols-4"
                >
                  <span className="font-mono text-xs text-brass">
                    {number}
                  </span>

                  <div className="sm:col-span-3">
                    <h3 className="text-2xl">{title}</h3>

                    <p className="mt-2 leading-relaxed text-muted-foreground">
                      {copy}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
        <SectionHeading
          eyebrow="The Fyncho experience"
          title="A direct connection between your business and your customers."
          description="Give customers a clear place to discover your business, explore services, book appointments, manage bookings, and return again."
        />

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {[
            ["01", "Discover", "Customers find your business and explore what you offer."],
            ["02", "Explore", "Services, team information, gallery, and business details are available in one place."],
            ["03", "Book", "Customers choose a service and available appointment time."],
            ["04", "Manage", "Customers can access their appointments and return to book again."],
            ["05", "Return", "Memberships and loyalty help businesses build lasting customer relationships."],
          ].map(([number, title, copy]) => (
            <article key={number} className="border-t border-brass pt-6">
              <span className="font-mono text-xs text-brass">
                {number}
              </span>

              <h3 className="mt-4 text-2xl">{title}</h3>

              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {copy}
              </p>
            </article>
          ))}
        </div>
      </section>

      <ClosingCta
        title="Give your business a place of its own."
        description="Create your Fyncho business software, choose your unique business address, and bring your services, customers, bookings, and daily operations together."
        primary={{ label: "Get Started Free", to: "/register" }}
        secondary={{ label: "How It Works", to: "/how-it-works" }}
      />
    </SiteShell>
  );
}