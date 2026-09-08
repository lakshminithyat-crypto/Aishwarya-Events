import { useState, useEffect } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollTo = (id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md border-b border-orange-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Brand Area */}
          <button onClick={() => scrollTo("home")} className="flex items-center gap-2 relative">
            {/* Logo - overflows navbar downward */}
            <div className="relative z-10" style={{ width: 90, height: 90, marginBottom: -35 }}>
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}>
                <img
                  src="https://media.base44.com/images/public/6a3f721c39cb0235b5cf3bac/b1780d871_Logo.png"
                  alt="Aishwarya Events Logo"
                  className="w-full h-full object-contain rounded-full" />
                
              </div>
            </div>
            {/* Name - contained within navbar height */}
            <img src="https://media.base44.com/images/public/6a3f721c39cb0235b5cf3bac/ce89daf74_Name.png"

            alt="Aishwarya Events"
            className="object-contain"
            style={{ height: 56, width: "auto", marginBottom: 0 }} />
            
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {["home", "services", "gallery", "reviews", "contact", "about"].map((id) =>
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="nav-link capitalize">
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </button>
            )}
            <a
              href="https://www.instagram.com/aishwarya_events?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-9 h-9 rounded-full transition-all duration-300 hover:scale-110"
              style={{ background: "linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045)" }}
              aria-label="Instagram"
            >
              <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="white">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a
              href="https://wa.me/917702627777?text=Hello%20Aishwarya%20Events%2C%20I%20would%20like%20to%20book%20an%20event."
              target="_blank"
              rel="noopener noreferrer"
              className="shimmer-btn brand-gradient text-white font-semibold py-2.5 px-6 rounded-full text-sm uppercase tracking-widest transition-all duration-300 hover:shadow-lg hover:scale-105">
              
              Book Now
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}>
            
            <span className={`block w-6 h-0.5 transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} style={{ background: "linear-gradient(135deg, #E8230A, #F5C100)" }} />
            <span className={`block w-6 h-0.5 transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} style={{ background: "linear-gradient(135deg, #F47420, #F5C100)" }} />
            <span className={`block w-6 h-0.5 transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} style={{ background: "linear-gradient(135deg, #F5C100, #E8230A)" }} />
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen &&
        <div className="md:hidden bg-white border-t border-orange-100 py-4 px-2">
            {["home", "services", "gallery", "reviews", "contact", "about"].map((id) =>
          <button
            key={id}
            onClick={() => scrollTo(id)}
            className="block w-full text-left py-3 px-4 nav-link capitalize border-b border-orange-50">
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </button>
          )}
            <a
            href="https://wa.me/917702627777?text=Hello%20Aishwarya%20Events%2C%20I%20would%20like%20to%20book%20an%20event."
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 block text-center shimmer-btn brand-gradient text-white font-semibold py-3 px-6 rounded-full text-sm uppercase tracking-widest">
            
              Book Now
            </a>
          </div>
        }
      </div>
    </nav>);

}