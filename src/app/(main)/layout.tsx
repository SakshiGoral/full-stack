import MainHeader from '@/components/main-header';

export default function MainAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <MainHeader />
      <main className="flex-1">{children}</main>
    </div>
  );
}
