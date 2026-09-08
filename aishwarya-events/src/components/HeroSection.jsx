import { useEffect, useRef } from "react";

const HERO_VIDEO = "https://media.base44.com/videos/public/6a3f721c39cb0235b5cf3bac/0a16f5f05_WhatsAppVideo2026-06-27at20444PM.mp4";

export default function HeroSection() {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          src={HERO_VIDEO}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover" />
        
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(135deg, rgba(255,253,247,0.82) 0%, rgba(255,253,247,0.55) 50%, rgba(245,193,0,0.1) 100%)"
          }} />
        
      </div>

      {/* Mandala watermark */}
      <div className="mandala-bg right-0 top-0 w-[600px] h-[600px] translate-x-1/4 -translate-y-1/4">
        <svg viewBox="0 0 500 500" className="w-full h-full">
          {[...Array(16)].map((_, i) =>
          <g key={i} transform={`rotate(${i * 22.5} 250 250)`}>
              <ellipse cx="250" cy="80" rx="14" ry="30" fill="#E8230A" />
              <ellipse cx="250" cy="110" rx="8" ry="18" fill="#F47420" />
            </g>
          )}
          {[...Array(12)].map((_, i) =>
          <g key={i} transform={`rotate(${i * 30} 250 250)`}>
              <ellipse cx="250" cy="140" rx="10" ry="22" fill="#F5C100" />
            </g>
          )}
          <circle cx="250" cy="250" r="80" fill="none" stroke="#E8230A" strokeWidth="2" />
          <circle cx="250" cy="250" r="55" fill="none" stroke="#F47420" strokeWidth="1.5" />
          <circle cx="250" cy="250" r="30" fill="none" stroke="#F5C100" strokeWidth="1" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text */}
          <div className="bloom-in">
            {/* Tagline pill */}
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border-2 bg-white/60 backdrop-blur-sm"
            style={{ borderColor: "#F47420" }}>
              <span className="w-2 h-2 rounded-full brand-gradient inline-block"></span>
              <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#F47420", fontFamily: "'Poppins', sans-serif" }}>
                Telangana's Premier Event Specialists
              </span>
            </div>

            <h1
              className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.05] mb-2"
              style={{
                fontFamily: "'Playfair Display', serif",
                letterSpacing: "-0.02em"
              }}>
              
              <span className="brand-gradient-text">WE CREATE.</span>
              <br />
              <span style={{ color: "#4A0E06" }}>YOU</span>{" "}
              <span className="brand-gradient-text italic">CELEBRATE.</span>
            </h1>

            <p className="mt-6 text-lg leading-relaxed max-w-md" style={{ color: "#4A0E06", fontFamily: "'Poppins', sans-serif", fontWeight: 400, lineHeight: 1.8 }}>
              From grand royal weddings to intimate birthday celebrations — Aishwarya Events crafts unforgettable experiences with breathtaking décor, elegant tents, and flawless execution.
            </p>

            {/* Stats row */}
            <div className="flex gap-8 mt-8 mb-10">
              {[["500+", "Events"], ["18+", "Years"], ["100%", "Joy"]].map(([num, label]) =>
              <div key={label} className="text-center">
                  <div className="text-3xl font-extrabold brand-gradient-text" style={{ fontFamily: "'Playfair Display', serif" }}>{num}</div>
                  <div className="text-xs uppercase tracking-widest font-semibold mt-1" style={{ color: "#F47420" }}>{label}</div>
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => scrollTo("gallery")}
                className="brand-gradient text-white font-semibold py-4 px-8 rounded-full text-sm uppercase tracking-widest transition-all duration-300 hover:shadow-xl hover:scale-105 shimmer-btn">
                
                View Our Work
              </button>
              <a
                href="https://wa.me/917702627777?text=Hello%20Aishwarya%20Events%2C%20I%20would%20like%20to%20inquire%20about%20your%20event%20services."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-white border-2 font-semibold py-4 px-8 rounded-full text-sm uppercase tracking-widest transition-all duration-300 hover:shadow-xl hover:scale-105"
                style={{ borderColor: "#25D366", color: "#25D366" }}>
                
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Inquire on WhatsApp
              </a>
            </div>
          </div>

          {/* Right: Floating Image */}
          <div className="hidden lg:flex justify-center items-center relative">
            

















            
            {/* Floating badge */}
            








            
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      


      
    </section>);

}