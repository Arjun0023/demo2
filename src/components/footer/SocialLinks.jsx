import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa6";

const linkStyles = `focus rounded-full bg-gray-50 p-4 text-gray-400 hover:bg-red hover:text-white`;

function SocialLinks() {
  return (
    <ul className="flex gap-2">
      <a
        className={linkStyles}
        href="https://www.facebook.com/share/17wAqKj4YB/"
        target="_blank"
        rel="noreferrer"
      >
        <FaFacebookF />
      </a>
      <a
        className={linkStyles}
        href="https://www.instagram.com/sport.ayush?igsh=MXExNHgwZ2Jhem1tOQ=="
        target="_blank"
        rel="noreferrer"
      >
        <FaInstagram />
      </a>
      <button type="button" className={linkStyles} aria-label="WhatsApp">
        <FaWhatsapp />
      </button>
    </ul>
  );
}

export default SocialLinks;
