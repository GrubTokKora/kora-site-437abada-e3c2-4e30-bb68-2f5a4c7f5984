import { Facebook, Instagram, MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="contact" className="bg-vega-bg-light">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 max-w-5xl mx-auto">
          {/* Address Column */}
          <div className="text-center md:text-left">
            <h3 className="text-xl md:text-2xl font-serif text-primary mb-4 relative pb-2 inline-block">
              ADDRESS
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-secondary" />
            </h3>
            <div className="space-y-1 text-gray-700">
              <p className="flex items-center justify-center md:justify-start gap-2">
                <MapPin size={16} className="text-primary" />
                189 E Hartsdale Ave
              </p>
              <p className="pl-6">Hartsdale, NY 10530</p>
            </div>
            {/* Social Icons */}
            <div className="flex items-center justify-center md:justify-start gap-3 mt-4">
              <a
                href="https://www.facebook.com/vegamexican"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border-2 border-gray-400 flex items-center justify-center text-gray-600 hover:bg-primary hover:border-primary hover:text-white transition-all duration-300"
              >
                <Facebook size={18} />
              </a>
              <a
                href="https://www.instagram.com/vegamexican/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border-2 border-gray-400 flex items-center justify-center text-gray-600 hover:bg-primary hover:border-primary hover:text-white transition-all duration-300"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://www.google.com/maps/place/VEGA+Mexican+Cuisine/@41.012408,-73.7958676,15z/data=!4m5!3m4!1s0x0:0xea814ff113fb7ada!8m2!3d41.012408!4d-73.7958676"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border-2 border-gray-400 flex items-center justify-center text-gray-600 hover:bg-primary hover:border-primary hover:text-white transition-all duration-300"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Contact Column */}
          <div className="text-center md:text-left">
            <h3 className="text-xl md:text-2xl font-serif text-primary mb-4 relative pb-2 inline-block">
              CONTACT US
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-secondary" />
            </h3>
            <div className="space-y-3 text-gray-700">
              <a
                href="tel:9147230010"
                className="flex items-center justify-center md:justify-start gap-2 hover:text-primary transition-colors duration-300"
              >
                <Phone size={16} className="text-primary" />
                (914) 723-0010
              </a>
              <a
                href="mailto:info@vegamexican.com"
                className="flex items-center justify-center md:justify-start gap-2 hover:text-primary transition-colors duration-300"
              >
                <Mail size={16} className="text-primary" />
                info@vegamexican.com
              </a>
            </div>
          </div>

          {/* Hours Column */}
          <div className="text-center md:text-left">
            <h3 className="text-xl md:text-2xl font-serif text-primary mb-4 relative pb-2 inline-block">
              HOURS
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-secondary" />
            </h3>
            <div className="space-y-2 text-gray-700">
              <p className="flex items-center justify-center md:justify-start gap-2">
                <Clock size={16} className="text-primary" />
                Sunday - Thursday: 11am - 9pm
              </p>
              <p className="pl-6">Friday - Saturday: 11am - 10pm</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-vega-bg-dark py-4">
        <div className="container mx-auto px-4 text-center">
          <a
            href="https://onebrandingny.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/80 text-sm hover:text-white transition-colors duration-300"
          >
            POWERED BY ONEBRANDING
          </a>
        </div>
      </div>
    </footer>
  );
}
