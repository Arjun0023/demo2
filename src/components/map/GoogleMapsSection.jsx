import SecondaryHeading from "../headings/SecondaryHeading";
import TertiaryHeading from "../headings/TertiaryHeading";
import { FaMapMarkerAlt, FaDirections } from "react-icons/fa";

function GoogleMapsSection() {
  const handleDirections = () => {
    // Replace with actual coordinates
    window.open(
      "https://www.google.com/maps/dir/?api=1&destination=28.6139,77.2090&travelmode=driving",
      "_blank"
    );
  };

  return (
    <section className="py-12 sm:py-20 bg-white">
      <div className="container px-4 sm:px-8">
        <div className="mx-auto max-w-3xl text-center mb-8 sm:mb-12">
          <SecondaryHeading textColor="white" bgColor="red">
            Visit Our Store
          </SecondaryHeading>
          <TertiaryHeading>
            Find Us on the Map
          </TertiaryHeading>
          <p className="text-gray-350 text-sm sm:text-base px-4">
            Visit our showroom to experience our premium gym equipment firsthand
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-[1fr,400px] gap-6 lg:gap-8 items-start lg:items-center">
            {/* Map Container */}
            <div className="relative rounded-lg overflow-hidden shadow-xl h-[300px] sm:h-[400px] lg:h-[500px] order-2 lg:order-1">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.0170739398707!2d77.20695831508289!3d28.613939182417534!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDM2JzUwLjIiTiA3N8KwMTInMzIuNCJF!5e0!3m2!1sen!2sin!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale hover:grayscale-0 transition-all duration-500"
              ></iframe>
              
              {/* Custom Marker Overlay */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-full">
                <div className="bg-red text-white p-2 sm:p-3 rounded-full shadow-lg animate-bounce">
                  <FaMapMarkerAlt className="w-4 h-4 sm:w-6 sm:h-6" />
                </div>
              </div>
            </div>

            {/* Info Card */}
            <div className="bg-gray-50 p-6 sm:p-8 rounded-lg order-1 lg:order-2">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-600 mb-4 sm:mb-6">
                Store Location
              </h3>
              
              <div className="space-y-4 mb-6 sm:mb-8">
                <div className="flex items-start gap-3 sm:gap-4">
                  <FaMapMarkerAlt className="text-red mt-1 flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5" />
                  <div>
                    <p className="font-semibold text-gray-600 text-sm sm:text-base">Ayush Enterprise</p>
                    <p className="text-gray-350 text-sm sm:text-base">
                      123, Fitness Avenue,<br />
                      Near Sports Complex,<br />
                      New Delhi - 110001
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={handleDirections}
                className="focus relative inline-flex items-center gap-2 bg-red px-6 sm:px-8 py-3 sm:py-4 text-xs sm:text-sm font-bold uppercase text-white before:absolute before:left-3 before:top-[-12px] before:z-[-1] before:h-full before:w-full before:border before:border-solid before:border-gray-400/50 before:transition-all before:duration-500 hover:before:translate-x-[-12px] hover:before:translate-y-[12px] w-full justify-center"
              >
                <FaDirections className="w-3 h-3 sm:w-4 sm:h-4" />
                Get Directions
              </button>

              <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-white rounded-lg">
                <p className="text-xs sm:text-sm text-gray-350">
                  <span className="font-semibold">Store Hours:</span><br />
                  Monday - Saturday: 10:00 AM - 8:00 PM<br />
                  Sunday: 11:00 AM - 6:00 PM
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default GoogleMapsSection;
