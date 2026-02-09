import Logo from "@/components/ui/Logo";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-brand-dark flex flex-col items-center justify-center px-4">
      <div className="mb-8">
        <Logo />
      </div>
      <div className="w-full max-w-md">
        {children}
      </div>
    </div>
  );
}
