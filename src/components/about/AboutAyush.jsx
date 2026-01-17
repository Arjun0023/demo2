import SecondaryHeading from "../headings/SecondaryHeading";
import TertiaryHeading from "../headings/TertiaryHeading";
import PrimaryButton from "../buttons/PrimaryButton";
import { FaFutbol, FaUserTie, FaTags, FaTools } from "react-icons/fa";

function AboutAyush() {
  return (
    <section className="py-12 sm:py-20 bg-gray-50">
      <div className="container px-4 sm:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center max-w-6xl mx-auto">
          {/* Content */}
          <div>
            <SecondaryHeading textColor="white" bgColor="red">
              About Us
            </SecondaryHeading>
            <TertiaryHeading>
              Your Partner in Sports Infrastructure
            </TertiaryHeading>

            <div className="space-y-4 text-gray-350 mb-6 sm:mb-8 text-sm sm:text-base">
              <p>
                Ayush enterprise (Ayush sports) is a premier sports facility specialising in world-class
                football courts and turfs, designed to provide athletes and sports enthusiasts with an
                exceptional playing experience. Our state-of-the-art facilities feature high-quality
                artificial and natural turfs that cater to all levels of play, from casual games to
                competitive leagues.
              </p>

              <p>
                Whether you’re looking for a space to train, host a tournament, or enjoy a friendly match,
                we offer flexible rental options, professional-grade equipment, and a vibrant community
                atmosphere.
              </p>

              <p>
                Our commitment to quality, safety, and customer satisfaction makes us the go-to destination
                for artificial turfs, football court, gym equipment and many more gymming products.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
              <div className="text-center sm:text-left">
                <h4 className="text-2xl sm:text-3xl font-bold text-red mb-1 sm:mb-2">50+</h4>
                <p className="text-gray-350 text-xs sm:text-base">Turfs Installed</p>
              </div>
              <div className="text-center sm:text-left">
                <h4 className="text-2xl sm:text-3xl font-bold text-red mb-1 sm:mb-2">8+</h4>
                <p className="text-gray-350 text-xs sm:text-base">Years of Experience</p>
              </div>
              <div className="text-center sm:text-left">
                <h4 className="text-2xl sm:text-3xl font-bold text-red mb-1 sm:mb-2">100+</h4>
                <p className="text-gray-350 text-xs sm:text-base">Projects Completed</p>
              </div>
            </div>

            <PrimaryButton to="/contact">Get in Touch</PrimaryButton>
          </div>

          {/* Images */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="relative overflow-hidden rounded-lg">
                <img
                  src="https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=600&h=400&fit=crop"
                  alt="Football Turf"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="relative overflow-hidden rounded-lg mt-8">
                <img
                  src="https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&h=400&fit=crop"
                  alt="Sports Flooring"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
            </div>

            {/* Decorative Element */}
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-red/10 rounded-full -z-10"></div>
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-red/10 rounded-full -z-10"></div>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mt-12 sm:mt-20">
          <div className="text-center group">
            <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3 sm:mb-4 bg-red/10 rounded-full flex items-center justify-center group-hover:bg-red transition-all duration-300">
              <FaFutbol className="w-8 h-8 sm:w-10 sm:h-10 text-red group-hover:text-white transition-all duration-300" />
            </div>
            <h4 className="text-sm sm:text-lg font-bold text-gray-600 mb-1 sm:mb-2">Premium Quality</h4>
            <p className="text-xs sm:text-sm text-gray-350 px-2">FIFA standard turf and materials</p>
          </div>

          <div className="text-center group">
            <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3 sm:mb-4 bg-red/10 rounded-full flex items-center justify-center group-hover:bg-red transition-all duration-300">
              <FaUserTie className="w-8 h-8 sm:w-10 sm:h-10 text-red group-hover:text-white transition-all duration-300" />
            </div>
            <h4 className="text-sm sm:text-lg font-bold text-gray-600 mb-1 sm:mb-2">Expert Installation</h4>
            <p className="text-xs sm:text-sm text-gray-350 px-2">Professional team for perfect laying</p>
          </div>

          <div className="text-center group">
            <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3 sm:mb-4 bg-red/10 rounded-full flex items-center justify-center group-hover:bg-red transition-all duration-300">
              <FaTags className="w-8 h-8 sm:w-10 sm:h-10 text-red group-hover:text-white transition-all duration-300" />
            </div>
            <h4 className="text-sm sm:text-lg font-bold text-gray-600 mb-1 sm:mb-2">Competitive Prices</h4>
            <p className="text-xs sm:text-sm text-gray-350 px-2">Best rates in the market</p>
          </div>

          <div className="text-center group">
            <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3 sm:mb-4 bg-red/10 rounded-full flex items-center justify-center group-hover:bg-red transition-all duration-300">
              <FaTools className="w-8 h-8 sm:w-10 sm:h-10 text-red group-hover:text-white transition-all duration-300" />
            </div>
            <h4 className="text-sm sm:text-lg font-bold text-gray-600 mb-1 sm:mb-2">Maintenance</h4>
            <p className="text-xs sm:text-sm text-gray-350 px-2">Long-term maintenance support</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutAyush;
