import { useState, useEffect, useRef } from "react";
import { base44 } from "@/api/base44Client";

const PLACEHOLDER_GALLERY = [
{ id: "p1", photo_url: "https://media.base44.com/videos/public/6a3f721c39cb0235b5cf3bac/3fac793c7_WhatsAppVideo2026-06-27at20444PM.mp4", event_category: "Grand Event", caption: "Spectacular event highlights" },
{ id: "p2", photo_url: "https://media.base44.com/images/public/6a3f721c39cb0235b5cf3bac/5939b85f3_WhatsAppImage2026-06-28at92512AM.jpg", event_category: "Royal Wedding", caption: "Grand temple-style mandap décor" },
{ id: "p3", photo_url: "https://media.base44.com/images/public/6a3f721c39cb0235b5cf3bac/6b0f2e7bc_WhatsAppImage2026-06-28at92511AM3.jpg", event_category: "Wedding", caption: "Majestic golden mandap setup" },
{ id: "p4", photo_url: "https://media.base44.com/images/public/6a3f721c39cb0235b5cf3bac/e3e221763_WhatsAppImage2026-06-28at92511AM2.jpg", event_category: "Reception", caption: "Elegant outdoor floral stage" },
{ id: "p5", photo_url: "https://media.base44.com/images/public/6a3f721c39cb0235b5cf3bac/8e3c86080_WhatsAppImage2026-06-28at92511AM1.jpg", event_category: "German Hanger", caption: "Large-scale German hanger venue" },
{ id: "p6", photo_url: "https://media.base44.com/images/public/6a3f721c39cb0235b5cf3bac/bc777b100_WhatsAppImage2026-06-28at92511AM.jpg", event_category: "Floral Décor", caption: "Stunning floral chandelier stage" },
{ id: "p7", photo_url: "https://media.base44.com/images/public/6a3f721c39cb0235b5cf3bac/9d6a9c728_WhatsAppImage2026-06-28at92510AM.jpg", event_category: "Grand Ceremony", caption: "Tiered golden temple mandap" }];


export default function GallerySection() {
  const [items, setItems] = useState(PLACEHOLDER_GALLERY);
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef(null);

  useEffect(() => {
    base44.entities.GalleryItem.list()
      .then((data) => {
        if (data && data.length > 0) {
          // Merge DB items with placeholders — DB items first, then placeholders
          setItems([...data, ...PLACEHOLDER_GALLERY]);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".fade-up").forEach((el, i) => {
              setTimeout(() => el.classList.add("visible"), i * 80);
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
    <section id="gallery" ref={sectionRef} className="relative py-28 overflow-hidden" style={{ background: "linear-gradient(180deg, #FFFDF7 0%, #FFF5E4 100%)" }}>
      {/* Top wave */}
      <div className="absolute top-0 left-0 right-0 h-16 overflow-hidden">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full h-full">
          <path d="M0,0 C360,60 1080,0 1440,40 L1440,0 Z" fill="#FFFDF7" />
        </svg>
      </div>

      {/* Mandala watermark */}
      <div className="mandala-bg right-0 bottom-0 w-[450px] h-[450px] translate-x-1/3 translate-y-1/3">
        <svg viewBox="0 0 400 400" className="w-full h-full">
          {[...Array(18)].map((_, i) =>
          <g key={i} transform={`rotate(${i * 20} 200 200)`}>
              <ellipse cx="200" cy="50" rx="10" ry="25" fill="#F5C100" />
            </g>
          )}
          <circle cx="200" cy="200" r="90" fill="none" stroke="#F47420" strokeWidth="2" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20 fade-up">
          <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#F47420" }}>Our Portfolio</span>
          <h2
            className="text-4xl sm:text-5xl font-bold mt-3 mb-5"
            style={{ fontFamily: "'Playfair Display', serif", color: "#4A0E06" }}>
            
            <span className="brand-gradient-text italic">Visual</span> Legacy
          </h2>
          <div className="flex justify-center gap-1 mb-6">
            <div className="h-1 w-8 rounded-full" style={{ background: "#E8230A" }} />
            <div className="h-1 w-16 rounded-full" style={{ background: "#F47420" }} />
            <div className="h-1 w-8 rounded-full" style={{ background: "#F5C100" }} />
          </div>
          <p className="max-w-xl mx-auto text-lg leading-relaxed" style={{ color: "#4A0E06", lineHeight: 1.8 }}>
            Each event tells a story. Browse our work and imagine your celebration come to life.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {items.map((item, i) => {
            const isVideo = item.photo_url && /\.(mp4|webm|mov|ogg)(\?|$)/i.test(item.photo_url);
            return (
              <div key={item.id || i} className="fade-up break-inside-avoid gallery-card relative group rounded-2xl overflow-hidden shadow-md cursor-pointer">
                {isVideo ?
                <video
                  src={item.photo_url}
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105 hidden"
                  autoPlay loop muted playsInline /> :


                <img
                  src={item.photo_url}
                  alt={item.caption || item.event_category}
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {e.target.src = `https://picsum.photos/seed/${i + 10}/600/400`;}} />

                }
                {/* Hover overlay */}
                <div className="gallery-overlay absolute inset-0 flex flex-col justify-end p-5"
                style={{ background: "linear-gradient(to top, rgba(255,253,247,0.95) 0%, rgba(255,253,247,0.4) 60%, transparent 100%)" }}>
                  <span className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: "#F47420" }}>
                    {item.event_category}
                  </span>
                  <p className="font-bold text-base mb-3" style={{ fontFamily: "'Playfair Display', serif", color: "#4A0E06" }}>
                    {item.caption}
                  </p>
                  <a
                    href={`https://wa.me/917702627777?text=Hello%20Aishwarya%20Events%2C%20I%20am%20interested%20in%20a%20${encodeURIComponent(item.event_category)}%20setup%20similar%20to%20the%20one%20I%20saw%20on%20your%20website.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="brand-gradient text-white text-xs font-semibold uppercase tracking-wider py-2.5 px-5 rounded-full w-fit flex items-center gap-2 transition-all hover:shadow-lg hover:scale-105">
                    
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    Book Similar Setup
                  </a>
                </div>
              </div>);

          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 fade-up">
          <a
            href="https://wa.me/917702627777?text=Hello%20Aishwarya%20Events%2C%20I%20would%20like%20to%20discuss%20my%20event%20requirements."
            target="_blank"
            rel="noopener noreferrer"
            className="brand-gradient shimmer-btn text-white font-semibold py-4 px-10 rounded-full text-sm uppercase tracking-widest transition-all duration-300 hover:shadow-xl hover:scale-105 inline-block">
            
            Plan Your Event With Us
          </a>
        </div>
      </div>
    </section>);

}