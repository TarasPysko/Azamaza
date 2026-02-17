import Image from "next/image";
import Link from "next/link";
import { Header } from "@/app/components/Header";
import { ALL_PAGE_CATEGORIES } from "@/app/data/categories";

export default function AllCategoriesPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="px-[15px] pt-6 pb-8">
        <h1 className="font-onest mb-4 text-xl font-semibold text-[#151414]">
          All categories
        </h1>
        <ul className="flex flex-wrap gap-2">
          {ALL_PAGE_CATEGORIES.map(({ label, icon, href, active }) => (
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
      </main>
    </div>
  );
}
