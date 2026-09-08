import { useEffect, useRef } from "react";

const SERVICES = [
  {
    icon: "🏕️",
    title: "German Hangers",
    desc: "Grand German hanger structures with premium linings, ornate pillars, and climate control for all-season comfort.",
    color: "#E8230A",
    photo: "https://media.base44.com/images/public/6a3f721c39cb0235b5cf3bac/f3b44a896_image.png"
  },
  {
    icon: "✨",
    title: "Floral & Décor",
    desc: "Marigold garlands, rose petals, jasmine strings — bespoke floral art that transforms any venue into a paradise.",
    color: "#F47420",
    photo: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&q=85&fit=crop"
  },
  {
    icon: "💡",
    title: "Premium Lighting",
    desc: "Fairy lights, LED chandeliers, uplighters, and custom neon signs that create the perfect ambiance for every moment.",
    color: "#F5C100",
    photo: "https://media.base44.com/images/public/6a3f721c39cb0235b5cf3bac/385223d74_image.png"
  },
  {
    icon: "🎵",
    title: "Entertainment",
    desc: "DJ setups, live orchestras, mehendi performers, and compères to keep your guests joyfully engaged.",
    color: "#F47420",
    photo: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=600&q=85&fit=crop"
  },
  {
    icon: "📸",
    title: "Photography & Video",
    desc: "Cinematic wedding films and candid photography that freeze your most precious memories forever.",
    color: "#F5C100",
    photo: "https://media.base44.com/images/public/6a3f721c39cb0235b5cf3bac/db7bc472d_image.png"
  }
];

export default function ServicesSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".fade-up").forEach((el, i) => {
              setTimeout(() => el.classList.add("visible"), i * 120);
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="services" ref={sectionRef} className="relative py-28 overflow-hidden" style={{ background: "#FFFDF7" }}>
      {/* Mandala watermark */}
      <div className="mandala-bg left-0 top-1/2 -translate-y-1/2 -translate-x-1/3 w-[500px] h-[500px]">
        <svg viewBox="0 0 500 500" className="w-full h-full">
          {[...Array(20)].map((_, i) => (
            <g key={i} transform={`rotate(${i * 18} 250 250)`}>
              <ellipse cx="250" cy="60" rx="12" ry="28" fill="#E8230A" />
            </g>
          ))}
          <circle cx="250" cy="250" r="100" fill="none" stroke="#F47420" strokeWidth="2" />
          <circle cx="250" cy="250" r="70" fill="none" stroke="#F5C100" strokeWidth="1.5" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-20 fade-up">
          <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#F47420" }}>What We Offer</span>
          <h2
            className="text-4xl sm:text-5xl font-bold mt-3 mb-5"
            style={{ fontFamily: "'Playfair Display', serif", color: "#4A0E06" }}
          >
            Our <span className="brand-gradient-text italic">Premium</span> Services
          </h2>
          <div className="flex justify-center gap-1 mb-6">
            <div className="h-1 w-8 rounded-full" style={{ background: "#E8230A" }} />
            <div className="h-1 w-16 rounded-full" style={{ background: "#F47420" }} />
            <div className="h-1 w-8 rounded-full" style={{ background: "#F5C100" }} />
          </div>
          <p className="max-w-2xl mx-auto text-lg leading-relaxed" style={{ color: "#4A0E06", lineHeight: 1.8 }}>
            Every detail matters. We offer an end-to-end event experience — from concept to the last confetti.
          </p>
        </div>

        {/* Services grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service, i) => (
            <div
              key={service.title}
              className="fade-up review-card bg-white rounded-3xl p-8 group relative overflow-hidden"
              style={{ borderTop: `4px solid ${service.color}` }}
            >
              {/* Service photo (German Hangers only) */}
              {service.photo && (
                <div className="relative -mx-8 -mt-8 mb-6 h-44 overflow-hidden rounded-t-3xl">
                  <img
                    src={service.photo}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 60%, white 100%)" }} />
                </div>
              )}
              {/* Watermark logo */}
              <img
                src="https://media.base44.com/images/public/6a3f721c39cb0235b5cf3bac/fee30ef67_Logo.png"
                alt=""
                aria-hidden="true"
                className="absolute inset-0 w-full h-full object-contain pointer-events-none p-4"
                style={{ opacity: 0.07 }}
              />

              <h3
                className="text-xl font-bold mb-3"
                style={{ fontFamily: "'Playfair Display', serif", color: "#4A0E06" }}
              >
                {service.title}
              </h3>
              <p className="text-base leading-relaxed" style={{ color: "#6B3A35", lineHeight: 1.8 }}>
                {service.desc}
              </p>
              <div className="mt-6">
                <a
                  href={`https://wa.me/917702627777?text=Hello%20Aishwarya%20Events%2C%20I%20am%20interested%20in%20your%20${encodeURIComponent(service.title)}%20service.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold uppercase tracking-wider flex items-center gap-1 transition-all duration-300 group-hover:gap-2"
                  style={{ color: service.color }}
                >
                  Enquire Now
                  <span>→</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}