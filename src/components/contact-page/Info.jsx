import SocialLinks from "../footer/SocialLinks";

const headingStyles = `relative mb-4 mt-6 pb-2 text-xl font-bold capitalize before:absolute before:bottom-0 before:h-1 before:w-16 before:bg-red`;

function Info() {
  return (
    <div>
      <h3 className="mb-4 text-3xl font-bold">
        Build your game at Ayush Enterprise
      </h3>
      <p className="font-medium text-gray-300">
        Ayush Enterprise (Ayush Sports) delivers world-class football courts and
        turfs with professional-grade equipment and flexible rental options.
        From casual kickabouts to competitive leagues, we help athletes and
        sports enthusiasts train, host tournaments, and play at their best in a
        safe, community-first environment.
      </p>
      <div className="grid 2xl:grid-cols-2 2xl:gap-y-8">
        <div>
          <h4 className={headingStyles}>Pune, India</h4>
          <address className="font-medium not-italic text-gray-300">
            Ayush Enterprise,
            <br />  Shop No 1, Nakhate Complex,<br />
                    Vijay Nagar, Kalewadi,<br />
                    Pimpri-Chinchwad, Pune,<br />
                    Maharashtra 411017
          </address>
        </div>
        <div>
          <h4 className={headingStyles}>Opening Hours</h4>
          <p className="whitespace-nowrap font-medium text-gray-300">
            Mon to Sat: 9:00 am — 9:00 pm
          </p>
        </div>
        <div>
          <h4 className={headingStyles}>Information</h4>
          <a
            href="tel:+918446915179"
            className="block font-medium text-gray-300"
          >
            +91 8446915179
          </a>
          <a
            href="mailto:info@ayushenterprise.com"
            className="block font-medium text-gray-300"
          >
            info@ayushenterprise.com
          </a>
        </div>
        <div>
          <h4 className={headingStyles}>Follow Us On</h4>
          <SocialLinks />
        </div>
      </div>
    </div>
  );
}

export default Info;
