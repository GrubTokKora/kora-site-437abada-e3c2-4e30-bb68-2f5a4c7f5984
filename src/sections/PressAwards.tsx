import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const awards = [
  {
    id: 1,
    image: '/assets/awards_gen/nytimes.png',
    link: 'https://www.nytimes.com/2012/08/12/nyregion/a-review-of-vega-in-hartsdale.html',
    alt: 'The New York Times Review - Real Mexican Cuisine, Right Down to Dessert',
  },
  {
    id: 2,
    image: '/assets/awards_gen/lohud.png',
    link: 'http://food.lohudblogs.com/2010/07/23/vega-the-new-mexican-in-hartsdale/',
    alt: 'Lohud Top 5 Stylish Restaurant',
  },
  {
    id: 3,
    image: '/assets/awards_gen/best_westchester.png',
    link: 'http://www.westchestermagazine.com/Blogs/Eat-Drink-Post/March-2017/Vega-Mexican-Hartsdale/',
    alt: 'Best of Westchester',
  },
  {
    id: 4,
    image: '/assets/awards_gen/restaurant_hunter.png',
    link: 'http://www.fios1news.com/lowerhudsonvalley/restaurant-hunter-vega-hartsdale#.Wl_Vz2bMzv0',
    alt: 'Restaurant Hunter Signature Dish',
  },
];

export default function PressAwards() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % awards.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % awards.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + awards.length) % awards.length);
  };

  return (
    <section
      id="press"
      ref={sectionRef}
      className="relative py-20 md:py-28 overflow-hidden"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/assets/asset_2.jpg)',
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        {/* Heading */}
        <h2
          className={`text-4xl md:text-5xl font-serif text-white text-center mb-12 relative pb-4 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          Press & Awards
          <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-0.5 bg-secondary" />
        </h2>

        {/* Carousel */}
        <div
          className={`relative max-w-3xl mx-auto transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-16 z-20 w-12 h-12 flex items-center justify-center text-white/70 hover:text-white transition-colors duration-300"
            aria-label="Previous award"
          >
            <ChevronLeft size={48} />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-16 z-20 w-12 h-12 flex items-center justify-center text-white/70 hover:text-white transition-colors duration-300"
            aria-label="Next award"
          >
            <ChevronRight size={48} />
          </button>

          {/* Awards Container - Single Award View */}
          <div className="overflow-hidden px-4">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {awards.map((award) => (
                <div
                  key={award.id}
                  className="w-full flex-shrink-0 flex justify-center"
                >
                  <a
                    href={award.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block transform transition-transform duration-300 hover:scale-105"
                  >
                    <img
                      src={award.image}
                      alt={award.alt}
                      className="w-[280px] h-[280px] md:w-[320px] md:h-[320px] object-contain drop-shadow-2xl"
                    />
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-3 mt-8">
            {awards.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-white scale-125'
                    : 'bg-white/40 hover:bg-white/60'
                }`}
                aria-label={`Go to award ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
