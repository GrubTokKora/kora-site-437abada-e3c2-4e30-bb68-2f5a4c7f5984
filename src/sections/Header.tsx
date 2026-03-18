import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Menu, X } from 'lucide-react';

const navItems = [
  { label: 'ABOUT', href: '/#about' },
  { label: 'MENU', href: '/#menu' },
  { label: 'PRESS', href: '/#press' },
  { label: 'CONTACT', href: '/#contact' },
  { label: 'HIRING', href: '/hiring' },
  { label: 'RESERVATION', href: 'https://resy.com/cities/hrts/vega-mexican-cuisine', external: true },
  { label: 'GIFT CARD', href: 'https://www.toasttab.com/vegamexicancuisine/giftcards', external: true },
  { label: 'SUBSCRIBE', href: 'https://www.toasttab.com/vegamexicancuisine/marketing-signup', external: true },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'bg-vega-bg-dark/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'
      }`}
    >
      {/* Social Icons - Top Right */}
      <div className="absolute top-4 right-4 flex items-center gap-3">
        <a
          href="https://www.facebook.com/vegamexican"
          target="_blank"
          rel="noopener noreferrer"
          className="w-8 h-8 rounded-full border border-white/50 flex items-center justify-center text-white hover:bg-white hover:text-vega-purple transition-all duration-300"
        >
          <Facebook size={16} />
        </a>
        <a
          href="https://www.instagram.com/vegamexican/"
          target="_blank"
          rel="noopener noreferrer"
          className="w-8 h-8 rounded-full border border-white/50 flex items-center justify-center text-white hover:bg-white hover:text-vega-purple transition-all duration-300"
        >
          <Instagram size={16} />
        </a>
        <a
          href="https://www.yelp.com/biz/vega-mexican-cuisine-hartsdale"
          target="_blank"
          rel="noopener noreferrer"
          className="w-8 h-8 rounded-full border border-white/50 flex items-center justify-center text-white hover:bg-white hover:text-vega-purple transition-all duration-300"
        >
          <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
            <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.5 14.5h-2.1l-.6-2.2c-.2-.6-.4-1.1-.5-1.6h-.1c-.1.5-.3 1-.5 1.6l-.6 2.2h-2.1l1.8-5.3H11l.6-1.8h2.1l1.8 7.1zm-5.8 0H8.6V9.2h2.1v7.3zm-3.2 0H5.4V9.2h2.1v7.3zm10.6 0h-2.1V9.2h2.1v7.3z"/>
          </svg>
        </a>
      </div>

      {/* Navigation */}
      <nav className="container mx-auto px-4 py-4">
        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center justify-center">
          <ul className="flex items-center gap-1 flex-wrap justify-center">
            {navItems.map((item) => (
              <li key={item.label}>
                {item.external ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-2 text-md text-white font-semibold hover:text-primary transition-colors duration-300 tracking-wide"
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    to={item.href}
                    className="px-3 py-2 text-md text-white font-semibold hover:text-primary transition-colors duration-300 tracking-wide"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
            <li>
              <a
                href="https://order.toasttab.com/online/vegamexicancuisine"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 text-md text-primary font-bold hover:text-white transition-colors duration-300 tracking-wide"
              >
                ORDER NOW
              </a>
            </li>
          </ul>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center justify-between">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white p-2"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 bg-vega-bg-dark/95 rounded-lg">
            <ul className="flex flex-col items-center gap-2">
              {navItems.map((item) => (
                <li key={item.label}>
                  {item.external ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block px-4 py-2 text-white hover:text-primary transition-colors duration-300"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </a>
                  ) : (
                    <Link
                      to={item.href}
                      className="block px-4 py-2 text-white hover:text-primary transition-colors duration-300"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
              <li>
                <a
                  href="https://order.toasttab.com/online/vegamexicancuisine"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-4 py-2 text-primary font-semibold"
                >
                  ORDER NOW
                </a>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}
