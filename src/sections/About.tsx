import { useEffect, useRef, useState } from 'react';

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

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

  return (
    <section
      id="about"
      ref={sectionRef}
      className="bg-vega-bg-light py-16 md:py-20"
    >
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Heading */}
        <h2
          className={`text-4xl md:text-5xl font-serif text-primary text-center mb-12 relative pb-4 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          About Us
          <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-0.5 bg-secondary" />
        </h2>

        {/* Content */}
        <div
          className={`space-y-6 text-center transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="text-gray-700 text-base md:text-lg leading-relaxed">
            VEGA was founded to share our love of all things Mexican: the food, the music, 
            the culture. With a contemporary menu inspired by fresh and authentic flavors, 
            you won't need to make a trip to Mexico to find great Mexican food. You can find 
            it right here in Hartsdale, NY.
          </p>

          <p className="text-gray-700 text-base md:text-lg leading-relaxed">
            Along with a striking modern design, VEGA provides a relaxing atmosphere where 
            you and your loved ones can sit back and enjoy one of our famous meals - whether 
            it be our tableside guacamole or classic margaritas. Here at VEGA, our friendly 
            and experienced team is committed to serving you the best traditional Mexican 
            flavors that will satisfy your tastebuds.
          </p>

          <p className="text-gray-800 text-lg md:text-xl font-medium italic pt-4">
            Bienvenido a VEGA!
          </p>
        </div>
      </div>
    </section>
  );
}
