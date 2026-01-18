import defaultImage from "../../images/testimonials/person.webp";

const heroImages = Object.values(
  import.meta.glob("../../assets/hero/*.{png,jpg,jpeg,webp}", {
    eager: true,
    as: "url",
  })
);

function Image({ curSlide }) {
  const imageIndex =
    heroImages.length > 0 ? curSlide % heroImages.length : 0;
  const backgroundImage =
    heroImages.length > 0 ? heroImages[imageIndex] : defaultImage;

  return (
    <div
      className="absolute bottom-0 z-20 hidden h-[450px] w-2/5 rounded-tr-[50%] bg-cover bg-top xl:block"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    ></div>
  );
}

export default Image;
