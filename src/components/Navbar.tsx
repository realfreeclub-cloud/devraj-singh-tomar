"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, User, Briefcase, Mail, MessageSquare, Sun, Moon } from "lucide-react";
import { useState, useEffect } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const navLinks = [
    { label: "Home", href: "/", icon: Home },
    { label: "About", href: "/about", icon: User },
    { label: "Ventures", href: "/ventures", icon: Briefcase },
    { label: "Blog", href: "/blog", icon: MessageSquare }, // Chat bubble logic
    { label: "Contact", href: "/contact", icon: Mail },
  ];

  return (
    <>
      {/* Theme Toggle - Top Right */}
      <div className="fixed top-5 right-5 z-50 lg:right-5">
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="w-12 h-12 flex items-center justify-center rounded-full bg-secondary hover:bg-primary transition-colors hover:text-white text-foreground shadow-lg"
          aria-label="Toggle Theme"
        >
          {!isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>

      {/* Desktop Right Sidebar Navigation */}
      <nav className="hidden lg:flex flex-col items-center justify-center fixed right-0 top-0 h-screen w-24 z-40 gap-6">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              title={link.label}
              className={`w-12 h-12 flex items-center justify-center rounded-full transition-all duration-300 group ${
                isActive
                  ? "bg-primary text-white"
                  : "bg-[#2b2a2a] text-gray-300 hover:bg-primary hover:text-white"
              }`}
            >
              <link.icon size={20} className="relative z-10" />
            </Link>
          );
        })}
      </nav>

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 w-full bg-[#222222] border-t border-[#333333] z-50 flex items-center justify-around py-3 px-4">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              aria-label={link.label}
              className={`w-12 h-12 flex items-center justify-center rounded-full transition-all duration-300 ${
                isActive
                  ? "bg-primary text-white"
                  : "bg-transparent text-gray-400 hover:text-white hover:bg-[#333333]"
              }`}
            >
              <link.icon size={22} />
            </Link>
          );
        })}
      </nav>
    </>
  );
}
