import { useState } from "react";
import ProfileSidebar from "@/components/ProfileSidebar";
import TopNav from "@/components/TopNav";
import About from "@/components/About";
import CurrentlyWorkingOn from "@/components/CurrentlyWorkingOn";
import Resume from "@/components/Resume";
import Projects from "@/components/Projects";
import Achievements from "@/components/Achievements";
import OpenSourceContributions from "@/components/OpenSourceContributions";
import Certifications from "@/components/Certifications";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ResumeModal from "@/components/ResumeModal";
import { tagline } from "@/data/portfolioData";

const Index = () => {
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-background text-foreground">
      <TopNav />
      <div className="mx-auto max-w-6xl px-6 py-12 lg:grid lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-16 lg:py-16">
        {/* Left profile sidebar */}
        <div className="mb-12 lg:mb-0 lg:sticky lg:top-16 lg:h-fit lg:self-start">
          <ProfileSidebar />
        </div>

        {/* Right content column */}
        <main className="w-full min-w-0 max-w-2xl">
          <section id="home" className="mb-4">
            <p className="font-serif text-2xl leading-snug text-foreground">{tagline.primary}</p>
            <p className="mt-2 text-muted-foreground">{tagline.secondary}</p>
          </section>

          <About />
          <CurrentlyWorkingOn />
          <Resume onViewResume={() => setIsResumeModalOpen(true)} />
          <Projects />
          <Achievements />
          <OpenSourceContributions />
          <Certifications />
          <Contact />
          <Footer />
        </main>
      </div>

      <ResumeModal isOpen={isResumeModalOpen} onClose={() => setIsResumeModalOpen(false)} />
    </div>
  );
};

export default Index;
