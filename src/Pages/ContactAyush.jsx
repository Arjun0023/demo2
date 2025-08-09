import HeroPages from "../components/hero-pages/HeroPages";
import ContactForm from "../components/contact-page/ContactFormAyush";
import Map from "../components/contact-page/Map";
import WhatsAppButton from "../components/whatsapp/WhatsAppButton";

function ContactAyush() {
  return (
    <main>
      <HeroPages title="Contact Us" />
      <ContactForm />
      <Map />
      <WhatsAppButton />
    </main>
  );
}

export default ContactAyush;
