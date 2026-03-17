import { useEffect, useRef, useState } from 'react';

export default function HoursBanner() {
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
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`bg-secondary py-6 transition-all duration-700 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="container mx-auto px-4 text-center">
        <p className="text-white text-base md:text-lg font-medium mb-1">
          Sunday - Thursday: 11am - 9pm
        </p>
        <p className="text-white text-base md:text-lg font-medium">
          Friday - Saturday: 11am - 10pm
        </p>
      </div>
    </section>
  );
}
