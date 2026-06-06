import MainLayout from '../../../components/layout/MainLayout';

export default function CmsLayout({ children }: { children: React.ReactNode }) {
  return <MainLayout>{children}</MainLayout>;
}
