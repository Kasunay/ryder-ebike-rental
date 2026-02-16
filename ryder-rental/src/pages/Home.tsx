import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { SpecialOffers } from "@/components/SpecialOffers";
import { Bikes } from "@/components/Bikes";
import { Footer } from "@/components/Footer";

export function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <SpecialOffers />
      <Bikes />
      <Footer />
    </div>
  );
}
