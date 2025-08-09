const slides = [
  {
    quote:
      "I've been purchasing equipment from Ayush Enterprise for the past 2 years and their quality is outstanding. The team is knowledgeable and supportive, the equipment is top-notch, and their after-sales service is excellent.",
    name: "James Anderson",
    desc: "Gym Owner",
  },
  {
    quote:
      "Ayush Enterprise provided all the equipment for my home gym. Their prices are competitive, delivery was prompt, and the quality of equipment exceeds my expectations. Highly recommended!",
    name: "Ketty Mario",
    desc: "Fitness Enthusiast",
  },
  {
    quote:
      "As a commercial gym owner, I trust Ayush Enterprise for all our equipment needs. Their professional guidance in selecting the right equipment and excellent support makes them our go-to supplier.",
    name: "Susan Brown",
    desc: "Fitness Center Owner",
  },
];

function Slides({ curSlide }) {
  return (
    <div className="relative h-full w-full overflow-hidden">
      {slides.map((slide, i) => (
        <div
          key={i}
          style={{ transform: `translateX(${(i - curSlide) * 130}%)` }}
          className="absolute inset-0 flex h-full w-full flex-col justify-between bg-gray-600 bg-[url('./images/testimonials/shape.svg')] bg-bottom bg-no-repeat p-5 transition-all duration-1000 before:absolute before:top-[-40px] before:z-10 before:h-32 before:w-32 before:animate-float1 before:text-[180px] before:font-bold before:text-gray-500 before:content-['\02EE'] xl:ml-auto xl:w-3/5"
        >
          <blockquote className="mb-4 mt-20 font-medium italic text-gray-150">
            <q>{slide.quote}</q>
          </blockquote>
          <div>
            <h4 className="text-xl font-bold text-white">{slide.name}</h4>
            <p className="font-medium text-gray-150">{slide.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Slides;
