"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";

const MENU_ITEMS = [
  { label: "Currency", href: "/currency" },
  { label: "Language", href: "/language" },
  { label: "Your messages", href: "/messages" },
  { label: "Notification", href: "/notification" },
  { label: "Profile", href: "/profile" },
  { label: "Affiliate", href: "/affiliate" },
  { label: "Popular", href: "/popular" },
] as const;

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }
    if (isMenuOpen) {
      document.addEventListener("click", handleClickOutside);
    }
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isMenuOpen]);

  return (
    <>
      <div ref={menuRef} className="contents">
      <header className="relative flex h-20 items-center bg-[#006CE4] pl-4 pr-2">
        <div className="flex h-full w-full items-center justify-between">
          <Link
            href="/"
            className="flex shrink-0 items-center gap-1 transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#006CE4] rounded"
            aria-label="Azamaza — home"
          >
            <Image
              src="/logo.svg"
              alt=""
              width={26}
              height={24}
              className="shrink-0"
            />
            <span
              className="whitespace-nowrap text-white font-helvetica font-medium text-[18px] leading-[1.2]"
              style={{ letterSpacing: 0 }}
            >
              Azamaza
            </span>
          </Link>

          <Link
            href="/member"
            className="font-inter shrink-0 inline-flex items-center justify-center rounded-[24px] bg-[#F1D246] px-4 py-[10px] font-normal text-[#1a1a1a] transition-colors hover:bg-[#e5c63e] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#006CE4] text-[12px] leading-[1.03] text-center"
            style={{ letterSpacing: "-0.41px" }}
          >
            Become a member
          </Link>

          <Link
            href="/profile"
            className="relative block h-8 w-8 shrink-0 overflow-hidden rounded-full transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#006CE4]"
            aria-label="Profile"
          >
            <Image
              src="/user.png"
              alt=""
              width={32}
              height={32}
              className="object-cover"
            />
          </Link>

          <button
            type="button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="relative flex shrink-0 items-center justify-center rounded transition-colors hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#006CE4]"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
          >
            <Image
              src="/burger.svg"
              alt=""
              width={18}
              height={15}
              className="shrink-0"
            />
            <span
              className="absolute -right-[5px] -top-[14px] flex h-[18px] w-[18px] items-center justify-center rounded-full bg-[#FB2C36] font-onest text-[10px] font-normal leading-[1.03] text-center text-white"
              style={{ letterSpacing: "-0.41px" }}
              aria-hidden
            >
              3
            </span>
          </button>
        </div>
      </header>

      <div
        className="fixed inset-0 z-40 bg-black/40 transition-opacity duration-300"
        style={{
          pointerEvents: isMenuOpen ? "auto" : "none",
          opacity: isMenuOpen ? 1 : 0,
        }}
        aria-hidden
        onClick={() => setIsMenuOpen(false)}
      />

      <aside
        className="fixed right-0 top-0 z-50 h-full w-[min(280px,85vw)] bg-[#006CE4] shadow-xl transition-transform duration-300 ease-out"
        style={{
          transform: isMenuOpen ? "translateX(0)" : "translateX(100%)",
        }}
        role="dialog"
        aria-label="Menu"
        aria-modal="true"
      >
        <nav className="flex flex-col pt-24 pb-6 px-4">
          {MENU_ITEMS.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="rounded-lg px-3 py-3 text-white hover:bg-white/10 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              {label}
            </Link>
          ))}
        </nav>
      </aside>
      </div>
    </>
  );
}
