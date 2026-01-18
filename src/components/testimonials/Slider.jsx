import { useState } from "react";
import Image from "./Image";
import Slides, { slides } from "./Slides";
import Buttons from "./Buttons";

function Slider() {
  const [curSlide, setCurSlide] = useState(0);
  const totalSlides = slides.length;

  function handlePrev() {
    setCurSlide((prevSlide) =>
      totalSlides === 0 ? 0 : (prevSlide - 1 + totalSlides) % totalSlides
    );
  }
  function handleNext() {
    setCurSlide((prevSlide) =>
      totalSlides === 0 ? 0 : (prevSlide + 1) % totalSlides
    );
  }

  return (
    <div className="relative h-96 bg-gray-600 text-left outline outline-8 outline-offset-[4px] outline-gray-100 md:outline-offset-[16px]">
      <Image curSlide={curSlide} />

      <Slides curSlide={curSlide} />

      <Buttons handlePrev={handlePrev} handleNext={handleNext} />
    </div>
  );
}

export default Slider;
