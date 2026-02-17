import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Categories } from "./components/Categories";
import { SearchBlock } from "./components/SearchBlock";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <main className="mx-auto mb-[400px] flex max-w-[1280px] flex-col gap-2 px-4 pt-6 sm:px-6 md:px-8 xl:px-[15px] xl:pt-[24px]">
        <Categories />
        <SearchBlock />
      </main>
    </div>
  );
}
