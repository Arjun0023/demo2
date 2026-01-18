import SocialLinks from "../footer/SocialLinks";
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";

const headingStyles = `relative mb-4 mt-6 pb-2 text-xl font-bold capitalize before:absolute before:bottom-0 before:h-1 before:w-16 before:bg-red`;

function InfoAyush() {
  return (
    <div>
      <h3 className="mb-4 text-3xl font-bold">
        Get in Touch with Ayush Enterprise
      </h3>
      <p className="font-medium text-gray-300">

      "Ayush enterprise (Ayush sports) is a premier sports facility specialising in world-class football courts and turfs, designed to provide athletes and sports enthusiasts with an exceptional playing experience. Our state-of-the-art facilities feature high-quality artificial and natural turfs that cater to all levels of play, from casual games to competitive leagues. Whether you’re looking for a space to train, host a tournament, or enjoy a friendly match, we offer flexible rental options, professional-grade equipment, and a vibrant community atmosphere. Our commitment to quality, safety, and customer satisfaction makes us the go-to destination for artificial turfs , football court, gym equipment and many more gymming products"
      </p>
      
      <div className="grid 2xl:grid-cols-2 2xl:gap-y-8">
        <div>
          <h4 className={headingStyles}>Store Location</h4>
          <address className="font-medium not-italic text-gray-300 flex items-start gap-3">
            <FaMapMarkerAlt className="text-red mt-1 flex-shrink-0" />
            <div>
              Shop No 1, Nakhate Complex,<br />
              Vijay Nagar, Kalewadi,<br />
              Pimpri-Chinchwad, Pune,<br />
              Maharashtra 411017
            </div>
          </address>
          <a
            href="https://share.google/vkzLx1uui7kpivrtQ"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-3 text-red font-semibold hover:underline"
          >
            View on Google Maps →
          </a>
        </div>
        
        <div>
          <h4 className={headingStyles}>Store Hours</h4>
          <p className="whitespace-nowrap font-medium text-gray-300">
            Mon to Sat: 10:00 AM — 8:00 PM
          </p>
          <p className="whitespace-nowrap font-medium text-gray-300">
            Sunday: 11:00 AM — 6:00 PM
          </p>
          <p className="mt-2 text-sm text-red font-medium">
            *Open all days except national holidays
          </p>
        </div>
        
        <div>
          <h4 className={headingStyles}>Contact Information</h4>
          <a
            href="tel:+918446915179"
            className="flex items-center gap-3 font-medium text-gray-300 hover:text-red transition-colors mb-2"
          >
            <FaPhone className="text-red" />
            +91 8446915179
          </a>
          <a
            href="mailto:info@ayushenterprise.com"
            className="flex items-center gap-3 font-medium text-gray-300 hover:text-red transition-colors"
          >
            <FaEnvelope className="text-red" />
            info@ayushenterprise.com
          </a>
        </div>
        
        <div>
          <h4 className={headingStyles}>Follow Us On</h4>
          <SocialLinks />
          <p className="mt-4 text-sm text-gray-300">
            Stay updated with our latest products and offers
          </p>
        </div>
      </div>
    </div>
  );
}

export default InfoAyush;
