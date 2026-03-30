import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Services from "@/components/sections/Services";
import Portfolio from "@/components/sections/Portfolio";
import BestThing from "@/components/sections/BestThing";
import HowIWork from "@/components/sections/HowIWork";
import Cta from "@/components/sections/Cta";

export default function Home() {
  return (
    <main className="bg-background">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Services />
      <Portfolio />
      <BestThing />
      <HowIWork />
      <Cta />
    </main>
  );
}