export default function Footer() {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative overflow-hidden" style={{ background: "#4A0E06" }}>
      {/* Wave top */}
      <div className="absolute top-0 left-0 right-0 h-16 overflow-hidden">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full h-full">
          <path d="M0,0 C480,60 960,0 1440,40 L1440,0 Z" fill="#FFF5E4" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <div className="grid lg:grid-cols-3 gap-12 mb-16">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  {[...Array(12)].map((_, i) => (
                    <ellipse
                      key={i}
                      cx="50" cy="18" rx="5" ry="10"
                      fill="none"
                      stroke={`hsl(${(i * 30) % 60 + 5}, 90%, 65%)`}
                      strokeWidth="1.5"
                      transform={`rotate(${i * 30} 50 50)`}
                      opacity="0.9"
                    />
                  ))}
                  <circle cx="50" cy="50" r="16" fill="none" stroke="#F47420" strokeWidth="1.5" />
                  <text x="50" y="57" textAnchor="middle" fontSize="20" fontFamily="Playfair Display, serif" fontWeight="700" fill="url(#footerLogoGrad)">a</text>
                  <defs>
                    <linearGradient id="footerLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#E8230A" />
                      <stop offset="100%" stopColor="#F5C100" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div>
                <p className="font-extrabold text-lg tracking-widest uppercase"
                  style={{ fontFamily: "'Poppins', sans-serif", background: "linear-gradient(135deg, #E8230A, #F47420, #F5C100)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  AISHWARYA
                </p>
                <p className="font-bold text-sm tracking-widest uppercase"
                  style={{ fontFamily: "'Poppins', sans-serif", background: "linear-gradient(135deg, #F47420, #F5C100)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  EVENTS
                </p>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "#E8C4B8", lineHeight: 1.8 }}>
              Crafting unforgettable celebrations across Telangana since over a decade. Your joy is our masterpiece.
            </p>
            <p className="text-sm font-semibold italic" style={{ color: "#F5C100" }}>
              "We Create. You Celebrate."
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-widest mb-6" style={{ color: "#F47420" }}>Quick Links</h4>
            <div className="space-y-3">
              {[["home", "Home"], ["services", "Our Services"], ["gallery", "Gallery"], ["reviews", "Reviews"], ["contact", "Contact Us"]].map(([id, label]) => (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  className="block text-sm transition-all hover:translate-x-1"
                  style={{ color: "#E8C4B8" }}
                >
                  → {label}
                </button>
              ))}
            </div>
          </div>

          {/* Contact & WhatsApp */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-widest mb-6" style={{ color: "#F47420" }}>Contact</h4>
            <div className="space-y-4 mb-8">
              <div>
                <p className="text-xs uppercase tracking-wider mb-1" style={{ color: "#F5C100" }}>Phone / WhatsApp</p>
                <a href="tel:+917702627777" className="text-sm font-semibold" style={{ color: "#E8C4B8" }}>
                  +91 77026 27777
                </a>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider mb-1" style={{ color: "#F5C100" }}>Location</p>
                <p className="text-sm" style={{ color: "#E8C4B8" }}>Hyderabad, Telangana, India</p>
              </div>
            </div>
            <a
              href="https://www.instagram.com/aishwarya_events?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mb-3 font-semibold py-3 px-6 rounded-full text-sm uppercase tracking-wider transition-all hover:scale-105 text-white"
              style={{ background: "linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045)" }}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              Follow on Instagram
            </a>
            <br />
            <a
              href="https://wa.me/917702627777?text=Hello%20Aishwarya%20Events%2C%20I%20would%20like%20to%20inquire%20about%20your%20services."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-400 text-white font-semibold py-3 px-6 rounded-full text-sm uppercase tracking-wider transition-all hover:scale-105"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp Us
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px mb-8" style={{ background: "linear-gradient(90deg, transparent, #F47420, transparent)" }} />

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs" style={{ color: "#9B6B63" }}>
          <p>© 2025 Aishwarya Events. All rights reserved.</p>
          <p>Crafted with ❤️ for unforgettable celebrations.</p>
        </div>
      </div>
    </footer>
  );
}