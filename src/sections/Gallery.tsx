import { useEffect, useRef, useState } from 'react';

const galleryImages = [
  { id: 1, src: '/assets/gallery/gallery_1.jpg', alt: 'VEGA Restaurant Interior' },
  { id: 2, src: '/assets/gallery/gallery_2.jpg', alt: 'VEGA Dining Area' },
  { id: 3, src: '/assets/gallery/gallery_3.jpg', alt: 'VEGA Restaurant Space' },
  { id: 4, src: '/assets/gallery/gallery_4.jpg', alt: 'VEGA Private Dining' },
  { id: 5, src: '/assets/gallery/gallery_5.jpg', alt: 'VEGA Appetizers' },
  { id: 6, src: '/assets/gallery/gallery_6.jpg', alt: 'VEGA Main Course' },
  { id: 7, src: '/assets/gallery/gallery_7.jpg', alt: 'VEGA Steak Dish' },
  { id: 8, src: '/assets/gallery/gallery_8.jpg', alt: 'VEGA Cocktails' },
];

export default function Gallery() {
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
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="menu"
      ref={sectionRef}
      className="bg-vega-bg-light py-16 md:py-20"
    >
      <div className="container mx-auto px-4">
        {/* Heading */}
        <h2
          className={`text-4xl md:text-5xl font-serif text-primary text-center mb-12 relative pb-4 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          Gallery
          <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-0.5 bg-secondary" />
        </h2>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {galleryImages.map((image, index) => (
            <div
              key={image.id}
              className={`group relative overflow-hidden aspect-[4/3] cursor-pointer transition-all duration-700 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
              style={{
                transitionDelay: `${index * 100}ms`,
              }}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-all duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
