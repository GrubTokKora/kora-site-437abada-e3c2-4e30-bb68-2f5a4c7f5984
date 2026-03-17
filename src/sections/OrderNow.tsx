import { useEffect, useRef, useState } from 'react';

const orderPlatforms = [
  {
    id: 1,
    name: 'VEGA Direct Order',
    logo: (
      <div className="flex flex-col items-center">
        <div className="flex gap-1 mb-1">
          {['V', 'E', 'G', 'A'].map((letter) => (
            <div
              key={letter}
              className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-primary flex items-center justify-center text-white text-xs md:text-sm font-light"
            >
              {letter}
            </div>
          ))}
        </div>
        <span className="text-xs text-gray-400">mexican cuisine</span>
        <span className="text-sm md:text-base font-semibold mt-1">Direct Order &gt;</span>
      </div>
    ),
    link: 'https://order.toasttab.com/online/vegamexicancuisine',
    bgColor: 'bg-gray-900',
  },
  {
    id: 2,
    name: 'Uber Eats',
    logo: (
      <div className="flex flex-col items-center">
        <span className="text-xl md:text-2xl font-bold text-black">UBER</span>
        <span className="text-2xl md:text-3xl font-bold text-[#06C167]">eats</span>
      </div>
    ),
    link: 'https://www.ubereats.com/en-US/nyc-suburbs/food-delivery/vega-mexican-cuisine/QriofYpPQe-azvJYF1qjqw/',
    bgColor: 'bg-white',
  },
  {
    id: 3,
    name: 'Grubhub',
    logo: (
      <span className="text-2xl md:text-3xl font-bold text-white tracking-tight">
        GRUBHUB
      </span>
    ),
    link: 'http://menus.fyi/805136',
    bgColor: 'bg-[#F63440]',
  },
  {
    id: 4,
    name: 'DoorDash',
    logo: (
      <div className="flex items-center gap-2">
        <svg viewBox="0 0 24 24" className="w-8 h-8 md:w-10 md:h-10 fill-[#FF3008]">
          <path d="M12.5 2.5a2 2 0 0 1 2 2v5.5h3.25a2.75 2.75 0 0 1 2.75 2.75v7a2.75 2.75 0 0 1-2.75 2.75H6.25A2.75 2.75 0 0 1 3.5 19.75v-7a2.75 2.75 0 0 1 2.75-2.75H9.5V4.5a2 2 0 0 1 2-2h1zm0 1.5h-1a.5.5 0 0 0-.5.5v6.75h6.25a1.25 1.25 0 0 1 1.25 1.25v7a1.25 1.25 0 0 1-1.25 1.25H6.25A1.25 1.25 0 0 1 5 19.75v-7A1.25 1.25 0 0 1 6.25 11.5h3.25V4.5a.5.5 0 0 0-.5-.5h-1z"/>
        </svg>
        <span className="text-lg md:text-xl font-bold text-[#FF3008]">DOORDASH</span>
      </div>
    ),
    link: 'https://www.doordash.com/store/vega-mexican-cuisine-hartsdale-118573/en-US',
    bgColor: 'bg-white',
  },
];

export default function OrderNow() {
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
      ref={sectionRef}
      className="bg-secondary py-12 md:py-16"
    >
      <div className="container mx-auto px-4">
        {/* Heading */}
        <h2
          className={`text-3xl md:text-4xl font-bold text-white text-center mb-10 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          ORDER NOW
        </h2>

        {/* Platform Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {orderPlatforms.map((platform, index) => (
            <a
              key={platform.id}
              href={platform.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`${platform.bgColor} rounded-lg p-4 md:p-6 flex items-center justify-center min-h-[100px] md:min-h-[120px] transition-all duration-500 hover:scale-105 hover:shadow-xl ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
              style={{
                transitionDelay: `${index * 100}ms`,
              }}
            >
              {platform.logo}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
