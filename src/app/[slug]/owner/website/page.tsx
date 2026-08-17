'use client';

import { useState, useRef } from 'react';
import {
  Check,
  CheckCircle,
  ChevronRight,
  Eye,
  Globe,
  Home,
  Image,
  Info,
  MessageSquare,
  MoreHorizontal,
  Plus,
  Save,
  Star,
  Trash2,
  Upload,
  Users,
} from 'lucide-react';
import {
  EmptyState,
  Guard,
  PageHeader,
  SectionCard,
  StatusChip,
  Surface,
} from '@/components/portal/primitives';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useSession } from '@/lib/portal/session';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
}

interface GalleryImage {
  id: string;
  caption: string;
}

interface Testimonial {
  id: string;
  customerName: string;
  rating: number;
  reviewText: string;
  date: string;
  active: boolean;
}

const mockTeam: TeamMember[] = [
  { id: '1', name: 'Ananya Sharma', role: 'Senior Stylist', bio: 'Expert in modern haircuts and styling with 8+ years of experience.' },
  { id: '2', name: 'Rahul Verma', role: 'Barber', bio: 'Master barber specializing in classic and contemporary grooming.' },
  { id: '3', name: 'Priya Patel', role: 'Esthetician', bio: 'Certified skin care specialist with a passion for holistic treatments.' },
  { id: '4', name: 'Vikram Singh', role: 'Colorist', bio: 'Award-winning color specialist known for balayage and creative color.' },
];

const mockGallery: GalleryImage[] = [
  { id: '1', caption: 'Salon Interior' },
  { id: '2', caption: 'Hair Styling' },
  { id: '3', caption: 'Facial Treatment' },
  { id: '4', caption: 'Manicure Station' },
  { id: '5', caption: 'Product Display' },
  { id: '6', caption: 'Team Event' },
];

const mockTestimonials: Testimonial[] = [
  { id: '1', customerName: 'Sarah Johnson', rating: 5, reviewText: 'Absolutely amazing service! Ananya gave me the best haircut I have ever had. The salon ambiance is stunning.', date: '2026-06-15', active: true },
  { id: '2', customerName: 'Meera Patel', rating: 4, reviewText: 'Loved the facial treatment. Priya is incredibly skilled and made me feel so relaxed.', date: '2026-06-10', active: true },
  { id: '3', customerName: 'Amit Khanna', rating: 5, reviewText: 'Best barber in town. Rahul knows exactly what I want every single time.', date: '2026-06-08', active: true },
  { id: '4', customerName: 'Neha Gupta', rating: 4, reviewText: 'Great coloring work by Vikram. The balayage turned out perfect!', date: '2026-05-28', active: false },
];

const sectionIcons: Record<string, React.ReactNode> = {
  'Hero Banner': <Image className="size-4" />,
  'About Section': <Info className="size-4" />,
  Team: <Users className="size-4" />,
  Gallery: <Image className="size-4" />,
  Testimonials: <MessageSquare className="size-4" />,
};

const sectionColors: Record<string, string> = {
  'Hero Banner': 'var(--gold)',
  'About Section': 'var(--royal)',
  Team: 'var(--azure)',
  Gallery: 'var(--emerald)',
  Testimonials: 'var(--emerald)',
};

function UploadZone({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl border-2 border-dashed border-border bg-muted/20 p-8 text-center transition-colors hover:border-gold/30 hover:bg-muted/40 cursor-pointer">
      {children}
    </div>
  );
}

function HeroTab({ heroData, setHeroData }: { heroData: any; setHeroData: (f: any) => void }) {
  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_auto]">
      <div className="space-y-5">
        <div>
          <label className="text-sm font-medium">Headline</label>
          <Input
            value={heroData.headline}
            onChange={(e) => setHeroData((p: any) => ({ ...p, headline: e.target.value }))}
            placeholder="Enter headline text"
            className="mt-1.5"
          />
        </div>
        <div>
          <label className="text-sm font-medium">Subtitle</label>
          <textarea
            rows={3}
            value={heroData.subtitle}
            onChange={(e) => setHeroData((p: any) => ({ ...p, subtitle: e.target.value }))}
            placeholder="Enter subtitle text"
            className="mt-1.5 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">CTA Button Text</label>
            <Input
              value={heroData.ctaText}
              onChange={(e) => setHeroData((p: any) => ({ ...p, ctaText: e.target.value }))}
              placeholder="e.g. Book Now"
              className="mt-1.5"
            />
          </div>
          <div>
            <label className="text-sm font-medium">CTA Link</label>
            <Input
              value={heroData.ctaLink}
              onChange={(e) => setHeroData((p: any) => ({ ...p, ctaLink: e.target.value }))}
              placeholder="e.g. /book"
              className="mt-1.5"
            />
          </div>
        </div>
        <div>
          <label className="text-sm font-medium">Background Image</label>
          <UploadZone>
            <Upload className="mx-auto size-7 text-muted-foreground" />
            <p className="mt-2 text-sm text-muted-foreground">Click or drag image to upload</p>
            <p className="mt-1 text-xs text-muted-foreground/60">Recommended: 1920x800px, max 2MB</p>
          </UploadZone>
        </div>
      </div>
      <div className="lg:w-80">
        <Surface className="overflow-hidden p-0">
          <div className="flex flex-col items-center justify-center bg-gradient-to-br from-[#1A0A12] to-[#2C1020] p-8 text-center min-h-[320px]">
            <div className="mb-4 grid size-12 place-items-center rounded-xl bg-gold text-white">
              <Eye className="size-5" />
            </div>
            <p className="mb-2 text-[10px] uppercase tracking-[1.5px] text-gold/50">Preview</p>
            <p className="mb-2 text-xl font-bold text-white">{heroData.headline || 'Headline'}</p>
            <p className="mb-4 max-w-[280px] text-xs leading-relaxed text-white/60">{heroData.subtitle || 'Subtitle'}</p>
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-gold px-5 py-2 text-sm font-semibold text-white">
              {heroData.ctaText || 'CTA Button'}
            </span>
          </div>
        </Surface>
      </div>
    </div>
  );
}

function AboutTab({ aboutData, setAboutData }: { aboutData: any; setAboutData: (f: any) => void }) {
  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_auto]">
      <div className="space-y-5">
        <div>
          <label className="text-sm font-medium">Our Story</label>
          <textarea
            rows={5}
            value={aboutData.story}
            onChange={(e) => setAboutData((p: any) => ({ ...p, story: e.target.value }))}
            placeholder="Tell your salon's story"
            className="mt-1.5 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none"
          />
          <p className="mt-1 text-xs text-muted-foreground">This appears on the About page of your website</p>
        </div>
        <div>
          <label className="text-sm font-medium">Mission Statement</label>
          <textarea
            rows={3}
            value={aboutData.mission}
            onChange={(e) => setAboutData((p: any) => ({ ...p, mission: e.target.value }))}
            placeholder="Your salon's mission"
            className="mt-1.5 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none"
          />
        </div>
        <div>
          <label className="text-sm font-medium">About Image</label>
          <UploadZone>
            <Upload className="mx-auto size-7 text-muted-foreground" />
            <p className="mt-2 text-sm text-muted-foreground">Upload salon image</p>
          </UploadZone>
        </div>
      </div>
      <div className="lg:w-80">
        <Surface>
          <div className="mb-4 flex items-center gap-2.5 border-b border-border pb-4">
            <div className="grid size-9 place-items-center rounded-lg bg-royal-soft text-royal"><Globe className="size-4" /></div>
            <div>
              <p className="text-sm font-semibold">Live Preview</p>
              <p className="text-xs text-muted-foreground">How this looks on your site</p>
            </div>
          </div>
          <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <div>
              <p className="font-semibold text-foreground">Our Story</p>
              <p className="mt-0.5">{aboutData.story}</p>
            </div>
            <div>
              <p className="font-semibold text-foreground">Our Mission</p>
              <p className="mt-0.5">{aboutData.mission}</p>
            </div>
          </div>
        </Surface>
      </div>
    </div>
  );
}

function TeamTab({ team, setTeam }: { team: TeamMember[]; setTeam: (f: TeamMember[]) => void }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<TeamMember | null>(null);

  const save = () => {
    if (!editing) return;
    if (editing.id) {
      setTeam(team.map((m) => (m.id === editing.id ? editing : m)));
    } else {
      setTeam([...team, { ...editing, id: String(Date.now()) }]);
    }
    setModalOpen(false);
    setEditing(null);
    toast.success('Team member saved');
  };

  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{team.length} team member{team.length !== 1 ? 's' : ''} displayed on website</p>
        <Button variant="gold" size="sm" onClick={() => { setEditing({ id: '', name: '', role: '', bio: '' }); setModalOpen(true); }}>
          <Plus className="size-3.5" /> Add Member
        </Button>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {team.map((m) => (
          <div key={m.id} className="overflow-hidden rounded-xl border border-border bg-card">
            <div className="flex h-40 items-center justify-center bg-gradient-to-br from-[#2C1020] to-[#3D1830]">
              <Avatar className="size-16 border-[3px] border-white/20">
                <AvatarFallback className="bg-gold text-2xl font-semibold text-white">{m.name.charAt(0)}</AvatarFallback>
              </Avatar>
            </div>
            <div className="p-4">
              <p className="font-semibold">{m.name}</p>
              <span className="mt-1 inline-block rounded-md bg-emerald-soft px-2 py-0.5 text-[11px] font-medium text-emerald">{m.role}</span>
              <p className="mt-2.5 text-xs leading-relaxed text-muted-foreground">{m.bio}</p>
              <div className="mt-3 flex gap-2">
                <Button variant="ghost" size="sm" className="h-7 px-2 text-xs" onClick={() => { setEditing({ ...m }); setModalOpen(true); }}>
                  Edit
                </Button>
                <Button variant="ghost" size="sm" className="h-7 px-2 text-xs text-destructive hover:text-destructive" onClick={() => setTeam(team.filter((x) => x.id !== m.id))}>
                  Delete
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={modalOpen} onOpenChange={(o) => { if (!o) { setModalOpen(false); setEditing(null); } }}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{editing?.id ? 'Edit Team Member' : 'Add Team Member'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div>
              <label className="text-sm font-medium">Name</label>
              <Input value={editing?.name || ''} onChange={(e) => setEditing((p) => p ? { ...p, name: e.target.value } : null)} placeholder="Full name" className="mt-1.5" />
            </div>
            <div>
              <label className="text-sm font-medium">Role</label>
              <Input value={editing?.role || ''} onChange={(e) => setEditing((p) => p ? { ...p, role: e.target.value } : null)} placeholder="e.g. Senior Stylist" className="mt-1.5" />
            </div>
            <div>
              <label className="text-sm font-medium">Bio</label>
              <textarea
                rows={3}
                value={editing?.bio || ''}
                onChange={(e) => setEditing((p) => p ? { ...p, bio: e.target.value } : null)}
                placeholder="Brief biography"
                className="mt-1.5 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" onClick={() => { setModalOpen(false); setEditing(null); }}>Cancel</Button>
              <Button variant="gold" onClick={save}>Save</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function GalleryTab({ gallery, setGallery }: { gallery: GalleryImage[]; setGallery: (f: GalleryImage[]) => void }) {
  return (
    <div>
      <UploadZone>
        <Upload className="mx-auto size-9 text-muted-foreground" />
        <p className="mt-3 text-sm font-semibold">Drop images here or click to upload</p>
        <p className="mt-1 text-xs text-muted-foreground/60">Supported: JPG, PNG, WebP — Max 5MB each</p>
      </UploadZone>

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {gallery.map((img) => (
          <div key={img.id} className="group overflow-hidden rounded-xl border border-border bg-card transition-all hover:border-gold/30 hover:shadow-md">
            <div className="flex h-36 items-center justify-center bg-gradient-to-br from-[#1A0A12] to-[#2C1020]">
              <Image className="size-8 text-muted-foreground/30" />
            </div>
            <div className="flex items-center justify-between px-3 py-2.5">
              <span className="text-xs font-semibold">{img.caption}</span>
              <button onClick={() => setGallery(gallery.filter((x) => x.id !== img.id))} className="opacity-0 group-hover:opacity-100 transition-opacity">
                <Trash2 className="size-3.5 text-muted-foreground hover:text-destructive" />
              </button>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-4 text-center text-xs text-muted-foreground">{gallery.length} image{gallery.length !== 1 ? 's' : ''} in gallery</p>
    </div>
  );
}

function TestimonialsTab({ testimonials, setTestimonials }: { testimonials: Testimonial[]; setTestimonials: (f: Testimonial[]) => void }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {testimonials.map((t) => (
        <Surface key={t.id} className={cn('transition-opacity', !t.active && 'opacity-50')}>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="size-10">
                <AvatarFallback className={cn('text-sm font-semibold', t.active ? 'bg-gold text-white' : 'bg-muted text-muted-foreground')}>{t.customerName.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-semibold">{t.customerName}</p>
                <div className="mt-0.5 flex items-center gap-1.5">
                  <span className="flex text-gold">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={cn('size-3', i < t.rating ? 'fill-current' : '')} />
                    ))}
                  </span>
                  <span className="text-[11px] text-muted-foreground">{t.date}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setTestimonials(testimonials.map((x) => x.id === t.id ? { ...x, active: !x.active } : x))}
                className={cn(
                  'relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full transition-colors',
                  t.active ? 'bg-gold' : 'bg-muted',
                )}
              >
                <span className={cn('pointer-events-none block size-4 rounded-full bg-white shadow-sm transition-transform', t.active ? 'translate-x-4.5' : 'translate-x-0.5')} />
              </button>
              <button onClick={() => setTestimonials(testimonials.filter((x) => x.id !== t.id))}>
                <Trash2 className="size-3.5 text-muted-foreground hover:text-destructive" />
              </button>
            </div>
          </div>
          <p className="mt-3 pl-[52px] text-sm italic leading-relaxed text-muted-foreground">&ldquo;{t.reviewText}&rdquo;</p>
          <div className="mt-2 pl-[52px]">
            {t.active ? (
              <span className="inline-flex items-center gap-1 rounded-md bg-emerald-soft px-2 py-0.5 text-[10px] font-medium text-emerald">
                <CheckCircle className="size-3" /> Published
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 rounded-md bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">Draft</span>
            )}
          </div>
        </Surface>
      ))}
    </div>
  );
}

function WebsiteCMSContent() {
  const { can } = useSession();
  const [team, setTeam] = useState<TeamMember[]>(mockTeam);
  const [gallery, setGallery] = useState<GalleryImage[]>(mockGallery);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(mockTestimonials);

  const [heroData, setHeroData] = useState({
    headline: 'Where Style Meets Elegance',
    subtitle: 'Experience premium grooming and beauty treatments in a luxurious setting.',
    ctaText: 'Book Appointment',
    ctaLink: '/book',
  });

  const [aboutData, setAboutData] = useState({
    story: 'Founded in 2018, our salon was built on the belief that everyone deserves to look and feel their best. With a team of passionate professionals, we have created a space where artistry meets hospitality.',
    mission: 'To provide exceptional beauty services in a warm, welcoming environment that inspires confidence and well-being.',
  });

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="CMS"
        title="Website Content"
        description="Manage your salon website content."
        actions={
          <>
            <Button variant="outline" onClick={() => toast.success('Preview opened')}><Eye className="size-4" /> Preview Website</Button>
            <Button variant="gold" onClick={() => toast.success('Changes published')}><Check className="size-4" /> Publish Changes</Button>
          </>
        }
      />

      <Surface className="overflow-hidden p-0">
        <Tabs defaultValue="hero">
          <TabsList className="w-full justify-start rounded-none border-b border-border px-4">
            {[
              { value: 'hero', icon: <Image className="size-3.5" />, label: 'Hero Banner' },
              { value: 'about', icon: <Info className="size-3.5" />, label: 'About' },
              { value: 'team', icon: <Users className="size-3.5" />, label: 'Team' },
              { value: 'gallery', icon: <Image className="size-3.5" />, label: 'Gallery' },
              { value: 'testimonials', icon: <MessageSquare className="size-3.5" />, label: 'Testimonials' },
            ].map((t) => (
              <TabsTrigger key={t.value} value={t.value} className="gap-1.5">
                {t.icon} {t.label}
              </TabsTrigger>
            ))}
          </TabsList>
          <div className="p-6">
            <TabsContent value="hero"><HeroTab heroData={heroData} setHeroData={setHeroData} /></TabsContent>
            <TabsContent value="about"><AboutTab aboutData={aboutData} setAboutData={setAboutData} /></TabsContent>
            <TabsContent value="team"><TeamTab team={team} setTeam={setTeam} /></TabsContent>
            <TabsContent value="gallery"><GalleryTab gallery={gallery} setGallery={setGallery} /></TabsContent>
            <TabsContent value="testimonials"><TestimonialsTab testimonials={testimonials} setTestimonials={setTestimonials} /></TabsContent>
          </div>
        </Tabs>
      </Surface>
    </div>
  );
}

export default function WebsiteCMSPage() {
  return (
    <Guard module="cms" name="Website CMS">
      <WebsiteCMSContent />
    </Guard>
  );
}
