import Button from "@/components/ui/Button";
import Logo from "@/components/ui/Logo";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <Logo size="lg" className="mb-8" />
      <h1 className="text-6xl font-bold text-gradient mb-4">404</h1>
      <p className="text-xl text-slate-400 mb-8">Page not found</p>
      <a href="/">
        <Button>Back to Home</Button>
      </a>
    </div>
  );
}
