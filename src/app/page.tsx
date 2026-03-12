import ScrollyCanvas from "@/components/ScrollyCanvas";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#121212] text-white">
      <ScrollyCanvas />
      <div className="relative z-10 bg-black">
        <About className="border-t border-white/5" />
        <Projects className="border-t border-white/5" />
        <Contact className="border-t border-white/5" />
      </div>
    </main>
  );
}
