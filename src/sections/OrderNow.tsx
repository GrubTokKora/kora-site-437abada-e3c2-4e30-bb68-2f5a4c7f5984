import { useEffect, useRef, useState } from 'react';

const orderPlatforms = [
  {
    id: 1,
    name: 'VEGA Direct Order (Menufy)',
    logo: (
      <img
        src="https://www.vegamexican.com/images/order-online/menufy.jpg"
        alt="Order online with Menufy"
        className="h-24 md:h-32 w-full max-w-xs md:max-w-sm object-contain"
      />
    ),
    link: 'https://order.toasttab.com/online/vegamexicancuisine',
    bgColor: '',
  },
  {
    id: 2,
    name: 'Uber Eats',
    logo: (
      <img
        src="https://www.vegamexican.com/images/order-online/ubereats.jpg"
        alt="Order on Uber Eats"
        className="h-24 md:h-32 w-full max-w-xs md:max-w-sm object-contain"
      />
    ),
    link: 'https://www.ubereats.com/en-US/nyc-suburbs/food-delivery/vega-mexican-cuisine/QriofYpPQe-azvJYF1qjqw/',
    bgColor: '',
  },
  {
    id: 3,
    name: 'Grubhub',
    logo: (
      <img
        src="https://www.vegamexican.com/images/order-online/grubhub.jpg"
        alt="Order on Grubhub"
        className="h-24 md:h-32 w-full max-w-xs md:max-w-sm object-contain"
      />
    ),
    link: 'http://menus.fyi/805136',
    bgColor: '',
  },
  {
    id: 4,
    name: 'DoorDash',
    logo: (
      <img
        src="https://www.vegamexican.com/images/order-online/doordash.jpg"
        alt="Order on DoorDash"
        className="h-24 md:h-32 w-full max-w-xs md:max-w-sm object-contain"
      />
    ),
    link: 'https://www.doordash.com/store/vega-mexican-cuisine-hartsdale-118573/en-US',
    bgColor: '',
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
              className={`rounded-lg flex items-center justify-center transition-all duration-500 hover:scale-105 ${
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
