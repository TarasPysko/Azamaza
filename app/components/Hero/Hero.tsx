import Image from "next/image";

const HERO_TEXT =
  "Marketplace of verified services and wholesale offers — travel, shop, and save!";

export function Hero() {
  return (
    <section
      className="relative flex h-[189px] w-full items-center justify-center overflow-hidden bg-gray-200"
      aria-label="Hero banner"
    >
      <Image
        src="/bg.jpg"
        alt=""
        fill
        className="object-cover object-top"
        sizes="100vw"
        priority
      />
      <div
        className="absolute left-1/2 top-1/2 z-[1] h-[125px] w-[339px] -translate-x-1/2 -translate-y-1/2 rounded-[50%]"
        style={{
          backgroundColor: "rgba(21, 20, 20, 0.25)",
          filter: "blur(25px)",
        }}
        aria-hidden
      />
      <p className="relative z-10 px-4 text-center font-sans text-2xl font-extrabold leading-8 tracking-normal text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
        {HERO_TEXT}
      </p>
    </section>
  );
}
