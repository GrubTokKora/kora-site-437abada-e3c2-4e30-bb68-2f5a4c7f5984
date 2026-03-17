import { useEffect, useState } from 'react';

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="relative h-screen min-h-[600px] w-full overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/assets/asset_1.jpg)',
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4">
        {/* Logo */}
        <div
          className={`flex flex-col items-center transition-all duration-1000 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* VEGA Logo Circles */}
          <div className="flex items-center gap-1 mb-2">
            {['V', 'E', 'G', 'A'].map((letter, index) => (
              <div
                key={letter}
                className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-primary flex items-center justify-center text-white text-2xl md:text-3xl font-light tracking-wider"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                {letter}
              </div>
            ))}
          </div>

          {/* Mexican Cuisine Text */}
          <p className="text-white/90 text-sm md:text-base tracking-[0.3em] mb-8">
            mexican cuisine
          </p>

          {/* Tagline */}
          <h1 className="text-white text-2xl md:text-4xl font-light tracking-wider text-shadow mb-2">
            EAT. DRINK. FIESTA
          </h1>

          {/* Hashtag */}
          <p className="text-white/80 text-sm md:text-base tracking-widest">
            #CELEBRATINGMEXICO
          </p>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-1">
          <div className="w-1.5 h-3 bg-white/70 rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
}
