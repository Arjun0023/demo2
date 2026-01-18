import { Link } from "react-router-dom";
import {
  FaLocationDot,
  FaPhone,
  FaEnvelope,
  FaFacebookF,
  FaXTwitter,
  FaInstagram,
} from "react-icons/fa6";

import CloseButton from "./CloseButton";
import Logo from "../logo/Logo";

import heroBg from "../../assets/hero/hero-bg.png";
import heroImg from "../../assets/hero/image.png";
import heroImg1 from "../../assets/hero/image1.png";
import heroImg2 from "../../assets/hero/image2.png";
import heroImg3 from "../../assets/hero/image3.png";
import heroImg4 from "../../assets/hero/image4.png";
import heroImg5 from "../../assets/hero/image5.png";
import heroImg6 from "../../assets/hero/image6.png";
import heroImg7 from "../../assets/hero/image7.png";
import heroImg8 from "../../assets/hero/image8.png";
import heroImg9 from "../../assets/hero/image9.png";
import heroImg10 from "../../assets/hero/image10.png";

function Sidebar({ isSidebarOpen, handleToggleSidebar }) {
  return (
    <aside
      className={`fixed bottom-0 left-0 top-0 z-50 flex w-3/4 flex-col gap-12 overflow-y-scroll bg-white px-9 py-7 shadow-2xl transition-all duration-300 ${
        isSidebarOpen ? "translate-x-[0%]" : "translate-x-[-100%]"
      }`}
    >
      <header>
        <Logo size="w-32" type="black" />
        <CloseButton onClick={handleToggleSidebar} />
      </header>
      <section className="space-y-4">
        <h2 className="text-xl font-bold">About Us</h2>
        <p className="font-medium text-gray-400">
          Ayush enterprise (Ayush sports) is a premier sports facility
          specialising in world-class football courts and turfs, designed to
          provide athletes and sports enthusiasts with an exceptional playing
          experience. Our state-of-the-art facilities feature high-quality
          artificial and natural turfs that cater to all levels of play, from
          casual games to competitive leagues. Whether you&apos;re looking for a
          space to train, host a tournament, or enjoy a friendly match, we offer
          flexible rental options, professional-grade equipment, and a vibrant
          community atmosphere. Our commitment to quality, safety, and customer
          satisfaction makes us the go-to destination for artificial turfs,
          football court, gym equipment and many more gymming products.
        </p>
      </section>
      <section className="space-y-4">
        <h2 className="text-xl font-bold">Gallery</h2>
        <div className="grid grid-cols-3 gap-2.5 3xl:gap-4">
          {[
            heroBg,
            heroImg,
            heroImg1,
            heroImg2,
            heroImg3,
            heroImg4,
            heroImg5,
            heroImg6,
            heroImg7,
            heroImg8,
            heroImg9,
            heroImg10,
          ].map((image, index) => (
            <img
              key={image}
              src={image}
              alt={`Gallery image ${index + 1}`}
              className="h-full w-full cursor-pointer rounded-lg"
            />
          ))}
        </div>
      </section>
      <section className="space-y-4">
        <h2 className="text-xl font-bold">Contact Info</h2>
        <div className="flex flex-col items-start gap-2">
          <Link
            to="/"
            className="focus flex items-center gap-2 font-medium text-gray-400 transition-colors duration-300 hover:text-red"
          >
            <FaLocationDot className="text-red" />
            Shop No 1, Nakhate Complex, Vijay Nagar, Kalewadi,
            Pimpri-Chinchwad, Pune, Maharashtra 411017
          </Link>
          <Link
            to="tel:+918446915179"
            className="focus flex items-center gap-2 font-medium text-gray-400 transition-colors duration-300 hover:text-red"
          >
            <FaPhone className="text-red" /> +91 8446915179
          </Link>
          <Link
            to="mailto:info@ayushenterprise.com"
            className="focus flex items-center gap-2 font-medium text-gray-400 transition-colors duration-300 hover:text-red"
          >
            <FaEnvelope className="text-red" /> info@ayushenterprise.com
          </Link>
        </div>
      </section>
      <section className="space-y-4">
        <h2 className="text-xl font-bold">Follow Us</h2>
        <div className="flex gap-3">
          <Link className="rounded-full bg-red p-3 text-white">
            <FaFacebookF className="h-auto w-6" />
          </Link>
          <Link className="rounded-full bg-red p-3 text-white">
            <FaXTwitter className="h-auto w-6" />
          </Link>
          <Link className="rounded-full bg-red p-3 text-white">
            <FaInstagram className="h-auto w-6" />
          </Link>
        </div>
      </section>
    </aside>
  );
}

export default Sidebar;
