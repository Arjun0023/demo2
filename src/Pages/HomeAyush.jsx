import HeroAyush from "../components/hero/HeroAyush";
import AboutAyush from "../components/about/AboutAyush";
import ProductsCatalog from "../components/products/ProductsCatalog";
import GoogleMapsSection from "../components/map/GoogleMapsSection";
import ContactForm from "../components/contact-page/ContactForm";
import CallToAction from "../components/call-to-action/CallToAction";
import Testimonials from "../components/testimonials/Testimonials";
import WhatsAppButton from "../components/whatsapp/WhatsAppButton";

function HomeAyush() {
  return (
    <main>
      <HeroAyush />
      <AboutAyush />
      <ProductsCatalog />
      <CallToAction />
      <Testimonials />
      <GoogleMapsSection />
      <ContactForm />
      <WhatsAppButton />
    </main>
  );
}

export default HomeAyush;
