import HeroPages from "../components/hero-pages/HeroPages";
import AboutAyush from "../components/about/AboutAyush";
import Testimonials from "../components/testimonials/Testimonials";
import CallToAction from "../components/call-to-action/CallToAction";
import WhatsAppButton from "../components/whatsapp/WhatsAppButton";

function AboutAyushPage() {
  return (
    <main>
      <HeroPages title="About Us" />
      <AboutAyush />
      <Testimonials />
      <CallToAction />
      <WhatsAppButton />
    </main>
  );
}

export default AboutAyushPage;
