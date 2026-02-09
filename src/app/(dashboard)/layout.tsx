import DashboardSidebar from "@/components/dashboard/DashboardSidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-brand-dark">
      <DashboardSidebar />
      <main className="ml-64 p-8">
        {children}
      </main>
    </div>
  );
}
