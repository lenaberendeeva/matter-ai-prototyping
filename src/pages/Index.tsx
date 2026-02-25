import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import SolutionSection from "@/components/SolutionSection";
import BenefitsSection from "@/components/BenefitsSection";
import OutcomesSection from "@/components/OutcomesSection";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <HeroSection />
    <SolutionSection />
    <BenefitsSection />
    <OutcomesSection />
    <FinalCTA />
    <Footer />
  </div>
);

export default Index;
