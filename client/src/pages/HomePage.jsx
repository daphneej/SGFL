import HeroSection from "../components/home/HeroSection";
import AboutSection from "../components/home/AboutSection";
import FormationSection from "../components/home/FormationSection";
import ContactSection from "../components/home/ContactSection";
import FooterSection from "../components/home/FooterSection";

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <AboutSection />
      <FormationSection />
      <ContactSection />
      <FooterSection />
    </div>
  );
};

export default HomePage;
