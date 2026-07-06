import OwnerLayout from '../../../components/layout/OwnerLayout';

export default async function SalonOwnerLayout({ children, params }: { children: React.ReactNode; params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <OwnerLayout salonSlug={slug}>{children}</OwnerLayout>;
}
