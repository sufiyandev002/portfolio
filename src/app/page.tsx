import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Services from "@/components/sections/Services";
import Portfolio from "@/components/sections/Portfolio";
import Projects from "@/components/sections/Projects";
import Stack from "@/components/sections/Stack";

export default function Home() {
  return (
    <main className="bg-background">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Services />
      <Portfolio />
      <Projects />
      <Stack />
    </main>
  );
}