"use client";

import Image from "next/image";
import Link from "next/link";

const CATEGORIES = [
  { label: "Marketplaces", icon: "/marketplace.svg", href: "/category/marketplaces", active: false },
  { label: "Photo", icon: "/photo.svg", href: "/category/photo", active: false },
  { label: "Rent", icon: "/rent.svg", href: "/category/rent", active: false },
  { label: "Hotels", icon: "/hotels.svg", href: "/category/hotels", active: false },
  { label: "Restaurants", icon: "/restaurants.svg", href: "/category/restaurants", active: false },
  { label: "Meet", icon: "/meet.svg", href: "/category/meet", active: false },
  { label: "App Subscription", icon: "/app.svg", href: "/category/app-subscription", active: false },
  { label: "Taxi", icon: "/taxi.svg", href: "/category/taxi", active: false },
  { label: "All", icon: "/all.svg", href: "/category/all", active: true },
] as const;

export function Categories() {
  return (
    <section className="min-w-0" aria-label="Categories">
      <ul className="flex min-w-0 flex-wrap gap-2 justify-between">
        {CATEGORIES.map(({ label, icon, href, active }) => (
          <li key={href}>
            <Link
              href={href}
              className={`group font-onest flex h-[42px] min-w-0 items-center gap-[3px] rounded-[24px] border px-4 text-center text-base font-normal leading-[22px] transition-colors duration-200 ease-out ${active ? "border-[#006CE4] bg-[#006CE4] text-white hover:bg-white hover:text-[#006CE4]" : "border-[#006CE4] bg-white text-[#006CE4] hover:bg-[#006CE4] hover:text-white"}`}
              style={{ letterSpacing: "-0.41px" }}
            >
              <Image
                src={icon}
                alt=""
                width={20}
                height={20}
                className={`h-5 w-5 max-h-5 max-w-5 shrink-0 transition-[filter] duration-200 ease-out ${active ? "brightness-0 invert group-hover:brightness-100 group-hover:invert-0" : "group-hover:brightness-0 group-hover:invert"}`}
              />
              <span>{label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
