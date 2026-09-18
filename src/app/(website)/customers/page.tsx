import type { Metadata } from "next";
import { SiteShell, PageHero } from "@/components/admin/admin-website/site-shell";
import { ClosingCta, MetricBand, SectionHeading } from "@/components/admin/admin-website/marketing-sections";

const TITLE = "Customer Stories — Salons Growing on Avivane";
const DESCRIPTION =
  "How salons, spas and barbershops around the world grew bookings and retention after launching their own Avivane website.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: { title: TITLE, description: DESCRIPTION, type: "website" },
  twitter: { card: "summary_large_image" },
};

const stories = [
  {
    salon: "Glam Studio",
    type: "Hair salon · Lisbon",
    challenge: "Bookings lived in DMs and a paper diary.",
    help: "A website at avivane.com/glam-studio with 24/7 booking and automatic reminders.",
    result: "+38% online bookings in three months.",
  },
  {
    salon: "Nordlys Spa",
    type: "Spa · Oslo",
    challenge: "Treatment packages were impossible to sell online.",
    help: "Memberships and packages sold directly from the salon website.",
    result: "1 in 4 clients now on a monthly plan.",
  },
  {
    salon: "Baxter & Son",
    type: "Barbershop · Manchester",
    challenge: "No-shows on peak Saturday slots.",
    help: "Deposits at checkout and one-tap rebooking for regulars.",
    result: "No-shows down 61%.",
  },
  {
    salon: "Maison Lumière",
    type: "Beauty group · Paris",
    challenge: "Four locations, four disconnected systems.",
    help: "One brand on Avivane with group-wide reporting.",
    result: "Reporting time cut from a day to minutes.",
  },
];

export default function CustomersPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Customer stories"
        title={<>Salons that gave themselves an address.</>}
        intro="Every story starts the same way — a salon claims its slug — and then diverges into whatever growth looks like for that business."
        image="/assets/admin-website/avivane-banner-craft.jpg"
        imageAlt="Salon owner creating a polished client experience"
      />

      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
          <img
            src="/assets/admin-website/owner-portrait.jpg"
            alt="Marielle Okonkwo, owner of Glam Studio"
            loading="lazy"
            width={912}
            height={1104}
            className="aspect-4/5 w-full rounded-2xl object-cover lg:col-span-4"
          />
          <blockquote className="lg:col-span-8">
            <p className="font-display text-3xl leading-snug text-balance sm:text-4xl">
              “Clients used to ask where to book. Now they just type our name. Having our own site
              changed how the salon is seen.”
            </p>
            <footer className="mt-6 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Marielle Okonkwo · Owner, Glam Studio · Lisbon
            </footer>
          </blockquote>
        </div>
      </section>

      <section className="border-y border-line bg-surface py-16">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-5 px-6 sm:grid-cols-2">
          {stories.map((s) => (
            <article key={s.salon} className="card-lux bg-background p-8">
              <h2 className="text-2xl">{s.salon}</h2>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-brass">{s.type}</p>
              <dl className="mt-5 space-y-3 text-sm">
                <div>
                  <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                    Challenge
                  </dt>
                  <dd className="mt-1">{s.challenge}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                    With Avivane
                  </dt>
                  <dd className="mt-1">{s.help}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                    Result
                  </dt>
                  <dd className="mt-1 font-display text-2xl">{s.result}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
        <SectionHeading eyebrow="What changed" title="Growth looked different in every salon. The common thread was a better direct relationship." description="Owners used Avivane to remove friction from discovery, booking and return visits—then measured the operational effect behind the scenes." />
        <div className="mt-12"><MetricBand items={[
          { value: "+38%", label: "Online bookings", detail: "Glam Studio after three months." },
          { value: "25%", label: "Members", detail: "Nordlys Spa clients on a plan." },
          { value: "−61%", label: "No-shows", detail: "Baxter & Son with deposits." },
          { value: "Minutes", label: "Group reporting", detail: "Down from one working day." },
        ]} /></div>
      </section>

      <section className="border-y border-line bg-surface py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5"><SectionHeading eyebrow="Glam Studio, Lisbon" title="From messages and paper notes to a booking experience that feels like the brand." description="Marielle wanted the salon to look established online without losing its independent personality. The team also needed fewer interruptions during appointments." /></div>
            <div className="divide-y divide-line border-y border-line lg:col-span-7">
              {[
                ["Before", "Clients asked for prices and availability through social messages. Staff copied bookings into a paper diary."],
                ["Launch", "Glam Studio claimed its address, published services and team profiles, and enabled direct online booking."],
                ["After", "More clients booked independently, reminders reduced manual follow-up, and the salon finally had one authoritative destination."],
              ].map(([title, copy], index) => <div key={title} className="grid gap-4 py-7 sm:grid-cols-4"><span className="font-mono text-xs text-brass">0{index + 1}</span><div className="sm:col-span-3"><h3 className="text-2xl">{title}</h3><p className="mt-2 leading-relaxed text-muted-foreground">{copy}</p></div></div>)}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
        <SectionHeading eyebrow="Across every story" title="The outcomes began with a few practical changes." />
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {[
            ["One trusted address", "Clients always know where to view accurate services, prices, policies and availability."],
            ["Less front-desk friction", "Routine questions, confirmations and rebooking move into a clear self-service journey."],
            ["Better business context", "Bookings, client behaviour and revenue contribute to one useful performance view."],
          ].map(([title, copy], index) => <article key={title} className="border-t border-brass pt-6"><span className="font-mono text-xs text-brass">0{index + 1}</span><h3 className="mt-4 text-3xl">{title}</h3><p className="mt-3 leading-relaxed text-muted-foreground">{copy}</p></article>)}
        </div>
      </section>

      <ClosingCta title="Make your salon the next story clients remember." description="Start with a direct digital home, then build a calmer operation and a stronger reason for clients to return." secondary={{ label: "How It Works", to: "/how-it-works" }} />
    </SiteShell>
  );
}