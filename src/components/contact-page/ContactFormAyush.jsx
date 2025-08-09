import InfoAyush from "./InfoAyush";
import Form from "./Form";

function ContactFormAyush() {
  return (
    <section className="px-4 sm:px-6 py-12 sm:py-20">
      <div className="container grid gap-8 sm:gap-10 lg:grid-cols-2">
        <InfoAyush />
        <Form />
      </div>
    </section>
  );
}

export default ContactFormAyush;
