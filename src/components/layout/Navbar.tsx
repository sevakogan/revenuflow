"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Logo from "@/components/ui/Logo";
import Button from "@/components/ui/Button";
import { Menu, X } from "@/components/ui/IconSet";
import { NAV_LINKS } from "@/lib/constants";
import useScrollSpy from "@/hooks/useScrollSpy";
import { cn } from "@/lib/utils";
import { useAuth } from "@/components/auth/AuthProvider";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { user, profile, isLoading } = useAuth();
  const activeId = useScrollSpy(
    NAV_LINKS.map((l) => l.href.replace("#", "")),
    80
  );

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-brand-dark/95 backdrop-blur-xl border-b border-white/[0.05]"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Logo />

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors relative",
                  activeId === link.href.replace("#", "")
                    ? "text-white"
                    : "text-slate-400 hover:text-white"
                )}
              >
                {link.label}
                {activeId === link.href.replace("#", "") && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-brand-blue"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            {!isLoading && user ? (
              <Link href={profile?.role === "admin" || profile?.role === "assistant" ? "/admin" : "/dashboard"}>
                <Button size="sm" variant="secondary">
                  {profile?.role === "admin" || profile?.role === "assistant" ? "Admin Panel" : "Dashboard"}
                </Button>
              </Link>
            ) : (
              <>
                <Link href="/login">
                  <Button size="sm" variant="ghost">
                    Log In
                  </Button>
                </Link>
                <Button
                  size="sm"
                  onClick={() =>
                    document.getElementById("cta")?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Get Free Analysis
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label="Toggle menu"
          >
            {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed inset-0 top-16 bg-brand-dark/98 backdrop-blur-xl z-40"
          >
            <div className="flex flex-col items-center justify-center gap-8 pt-20">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileOpen(false)}
                  className="text-lg font-medium text-slate-300 hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              ))}
              {!isLoading && user ? (
                <Link
                  href={profile?.role === "admin" || profile?.role === "assistant" ? "/admin" : "/dashboard"}
                  onClick={() => setIsMobileOpen(false)}
                >
                  <Button>
                    {profile?.role === "admin" || profile?.role === "assistant" ? "Admin Panel" : "Dashboard"}
                  </Button>
                </Link>
              ) : (
                <>
                  <Link href="/login" onClick={() => setIsMobileOpen(false)}>
                    <Button variant="ghost">Log In</Button>
                  </Link>
                  <Button
                    onClick={() => {
                      setIsMobileOpen(false);
                      document
                        .getElementById("cta")
                        ?.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    Get Free Analysis
                  </Button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
