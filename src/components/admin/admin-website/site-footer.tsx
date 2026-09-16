import Link from "next/link";

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
    title: "Solutions",
    links: [
      { label: "Salon", to: "/solutions" },
      { label: "Spa", to: "/solutions" },
      { label: "Barbershop", to: "/solutions" },
      { label: "Beauty clinic", to: "/solutions" },
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
      { label: "Customer stories", to: "/customers" },
      { label: "Log in", to: "/login" },
    ],
  },
] as const;

export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:grid-cols-5">
          <div className="col-span-2 sm:col-span-3 lg:col-span-1">
            <span className="font-display text-2xl font-semibold tracking-tight">Avivane</span>
            <p className="mt-2 max-w-[30ch] font-mono text-xs leading-relaxed text-muted-foreground">
              The platform for modern salons. Your salon, its own door on the avenue.
            </p>
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
            © {new Date().getFullYear()} Avivane · Privacy · Terms · Cookie Policy
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