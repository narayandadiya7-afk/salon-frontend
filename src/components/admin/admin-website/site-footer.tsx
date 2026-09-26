import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { CONTACT, toTelHref } from "@/utils/constants";

const columns = [
  {
    title: "Product",
    links: [
      { label: "Features", to: "/features" },
      { label: "Pricing", to: "/pricing" },
      { label: "How it works", to: "/how-it-works" },
    ],
  },
  {
    title: "Beauty & Grooming",
    links: [
      { label: "Hair Salons", to: "/solutions/hair-salon" },
      { label: "Beauty Salons", to: "/solutions/beauty-salon" },
      { label: "Nail Salons", to: "/solutions/nail-salon" },
      { label: "Barbershops", to: "/solutions/barbershop" },
      { label: "Makeup Artists", to: "/solutions/makeup-artist" },
      { label: "Men's Grooming", to: "/solutions/mens-grooming" },
    ],
  },
  {
    title: "Wellness & Aesthetics",
    links: [
      { label: "Spa", to: "/solutions/spa" },
      { label: "Massage Therapy", to: "/solutions/massage-therapy" },
      { label: "Skin Care", to: "/solutions/skincare" },
      { label: "Wellness Centers", to: "/solutions/wellness" },
      { label: "Lash & Brow", to: "/solutions/lash-brow" },
      { label: "All Solutions", to: "/solutions" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", to: "/resources" },
      { label: "Help center", to: "/resources" },
      { label: "Guides", to: "/resources" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", to: "/about" },
      { label: "Contact", to: "/contact" },
      { label: "Customer stories", to: "/customers" },
      { label: "Log in", to: "/login" },
    ],
  },
] as const;

export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:grid-cols-7">
          <div className="col-span-2 sm:col-span-3 lg:col-span-2">
            <span className="font-display text-2xl font-semibold tracking-tight">Fyncho</span>
            <p className="mt-2 max-w-[34ch] font-mono text-xs leading-relaxed text-muted-foreground">
              Business management and booking software for beauty, wellness, grooming, and personal-care businesses.
            </p>

            {/* Direct contact sits under the wordmark so the number is one
                scroll away on every page, not only on /contact. */}
            <div className="mt-6 flex flex-col gap-5">
              {CONTACT.phone && (
                <a href={toTelHref(CONTACT.phone)} className="group inline-flex items-start gap-3">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-surface ring-1 ring-line transition-colors group-hover:ring-brass">
                    <Phone aria-hidden="true" className="size-3.5 text-brass" />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                      Call us
                    </span>
                    <span className="mt-1 block break-words font-display text-lg leading-tight text-foreground transition-colors group-hover:text-brass-soft">
                      {CONTACT.phone}
                    </span>
                  </span>
                </a>
              )}

              {CONTACT.email && (
                <a href={`mailto:${CONTACT.email}`} className="group inline-flex items-start gap-3">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-surface ring-1 ring-line transition-colors group-hover:ring-brass">
                    <Mail aria-hidden="true" className="size-3.5 text-brass" />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                      Email us
                    </span>
                    <span className="mt-1 block break-words text-sm font-medium leading-snug text-foreground transition-colors group-hover:text-brass-soft">
                      {CONTACT.email}
                    </span>
                  </span>
                </a>
              )}
            </div>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-brass">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.to} className="transition-colors hover:text-foreground">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-xs text-muted-foreground">
            © {new Date().getFullYear()} Fyncho · Privacy · Terms · Cookie Policy
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs text-muted-foreground">
            <span>Instagram</span>
            <span>Facebook</span>
            <span>LinkedIn</span>
            <span>English · Global</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
