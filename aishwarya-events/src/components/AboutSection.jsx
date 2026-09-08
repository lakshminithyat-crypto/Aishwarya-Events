const WHY_CARDS = [
  { icon: "🏆", title: "Extensive Experience", body: "Established in 2008 with extensive industry expertise." },
  { icon: "🏕️", title: "Premium Structures", body: "High-end German Hanger solutions for events of all sizes." },
  { icon: "🎯", title: "Complete Solutions", body: "End-to-end event infrastructure and management services." },
  { icon: "👥", title: "Expert Team", body: "A professional and highly experienced team dedicated to your event." },
  { icon: "⚡", title: "Flawless Execution", body: "High-quality equipment combined with timely, reliable execution." },
  { icon: "✨", title: "Bespoke Designs", body: "Fully customized solutions tailored to suit every client's unique vision." },
];

export default function AboutSection() {
  return (
    <section id="about">
      {/* ── Story Section ── */}
      <div className="py-24 px-4 sm:px-6 lg:px-8" style={{ background: "#FFFDF7" }}>
        <div className="max-w-7xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-16">
            <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#F47420" }}>Who We Are</span>
            <h2
              className="text-4xl sm:text-5xl font-bold mt-3 mb-5"
              style={{ fontFamily: "'Playfair Display', serif", color: "#4A0E06" }}
            >
              About <span className="brand-gradient-text italic">Aishwarya Events</span>
            </h2>
            <div className="flex justify-center gap-1 mb-6">
              <div className="h-1 w-8 rounded-full" style={{ background: "#E8230A" }} />
              <div className="h-1 w-16 rounded-full" style={{ background: "#F47420" }} />
              <div className="h-1 w-8 rounded-full" style={{ background: "#F5C100" }} />
            </div>
          </div>

          {/* Split layout */}
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Text */}
            <div>
              <h3
                className="text-2xl sm:text-3xl font-bold mb-7 leading-snug"
                style={{ fontFamily: "'Playfair Display', serif", color: "#0D4A45" }}
              >
                Crafting Unforgettable Experiences
              </h3>
              <div className="space-y-5 text-base" style={{ color: "#444444", lineHeight: 1.9 }}>
                <p>
                  Aishwarya Events has been creating unforgettable experiences since 2008. With over 18 years of expertise in the event industry, we are one of the leading event infrastructure and event management companies, delivering exceptional solutions for events of every scale.
                </p>
                <p>
                  We specialize in creating memorable experiences for Weddings, Sangeeth Ceremonies, School Annual Days, Corporate Meetings, and Public Gatherings. At Aishwarya Events, we combine innovation, quality, and professionalism to transform every event into a remarkable celebration.
                </p>
                <p>
                  Whether it's an intimate family celebration or a large-scale corporate or public event, we are committed to delivering excellence with world-class infrastructure, modern equipment, and reliable support.
                </p>
              </div>
              {/* Stats */}
              <div className="flex gap-10 mt-10 flex-wrap">
                {[
                  { value: "18+", label: "Years of Excellence" },
                  { value: "500+", label: "Events Delivered" },
                  { value: "100%", label: "Client Satisfaction" },
                ].map((s) => (
                  <div key={s.label}>
                    <p className="text-3xl font-extrabold brand-gradient-text" style={{ fontFamily: "'Playfair Display', serif" }}>
                      {s.value}
                    </p>
                    <p className="text-xs font-semibold uppercase tracking-wider mt-1" style={{ color: "#6B3A35" }}>{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Image */}
            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl" style={{ border: "4px solid #F0D9C0" }}>
                <img
                  src="https://media.base44.com/images/public/6a3f721c39cb0235b5cf3bac/5939b85f3_WhatsAppImage2026-06-28at92512AM.jpg"
                  alt="Elegant event setup by Aishwarya Events"
                  className="w-full h-[420px] object-cover"
                />
              </div>
              <div
                className="absolute -bottom-6 -left-6 bg-white rounded-2xl px-6 py-4 shadow-xl"
                style={{ border: "2px solid #F0D9C0" }}
              >
                <p className="text-2xl font-extrabold brand-gradient-text" style={{ fontFamily: "'Playfair Display', serif" }}>18+</p>
                <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#6B3A35" }}>Years of Excellence</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Core Highlight Banner ── */}
      <div className="py-20 px-4 sm:px-6 lg:px-8" style={{ background: "#F0FAF9", borderTop: "1px solid #B2DFDB", borderBottom: "1px solid #B2DFDB" }}>
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#F47420" }}>What Sets Us Apart</span>
          <h2
            className="text-3xl sm:text-4xl font-bold mt-3 mb-6"
            style={{ fontFamily: "'Playfair Display', serif", color: "#F47420" }}
          >
            Our Signature Strength
          </h2>
          <div className="flex justify-center gap-1 mb-8">
            <div className="h-1 w-8 rounded-full" style={{ background: "#E8230A" }} />
            <div className="h-1 w-16 rounded-full" style={{ background: "#F47420" }} />
            <div className="h-1 w-8 rounded-full" style={{ background: "#F5C100" }} />
          </div>
          <p className="text-lg leading-relaxed" style={{ color: "#333333", lineHeight: 1.9 }}>
            Our strength lies in providing premium <strong>German Hanger Structures</strong>, offering spacious, elegant, weather-resistant, and customizable venues suitable for both indoor and outdoor events. From concept and planning to execution, our experienced team ensures flawless service, attention to detail, and complete customer satisfaction.
          </p>
        </div>
      </div>

      {/* ── Why Choose Us ── */}
      <div className="py-24 px-4 sm:px-6 lg:px-8" style={{ background: "#FFFDF7" }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#F47420" }}>Our Promise</span>
            <h2
              className="text-3xl sm:text-4xl font-bold mt-3"
              style={{ fontFamily: "'Playfair Display', serif", color: "#0D4A45" }}
            >
              Why Choose Aishwarya Events?
            </h2>
            <div className="flex justify-center gap-1 mt-5">
              <div className="h-1 w-8 rounded-full" style={{ background: "#E8230A" }} />
              <div className="h-1 w-16 rounded-full" style={{ background: "#F47420" }} />
              <div className="h-1 w-8 rounded-full" style={{ background: "#F5C100" }} />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHY_CARDS.map((card) => (
              <div
                key={card.title}
                className="bg-white rounded-3xl p-8 transition-all duration-300 hover:-translate-y-2"
                style={{ border: "1px solid #F0D9C0", boxShadow: "0 4px 20px rgba(232,35,10,0.05)" }}
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-5"
                  style={{ background: "linear-gradient(135deg, #FFF5E4, #FFE5D0)" }}
                >
                  {card.icon}
                </div>
                <h3
                  className="text-lg font-bold mb-3"
                  style={{ fontFamily: "'Playfair Display', serif", color: "#0D4A45" }}
                >
                  {card.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "#555555", lineHeight: 1.8 }}>
                  {card.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Bottom CTA ── */}
      <div
        className="py-20 px-4 text-center"
        style={{ background: "linear-gradient(135deg, #E8230A 0%, #F47420 50%, #F5C100 100%)" }}
      >
        <h2
          className="text-4xl sm:text-5xl font-bold text-white mb-8 leading-tight max-w-4xl mx-auto"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Aishwarya Events – We Create to Celebrate.
        </h2>
        <a
          href="https://wa.me/917702627777?text=Hello%20Aishwarya%20Events%2C%20I%20would%20like%20to%20plan%20an%20event."
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-white font-bold py-4 px-10 rounded-full text-base uppercase tracking-widest transition-all hover:shadow-2xl hover:scale-105"
          style={{ color: "#0D4A45" }}
        >
          Plan Your Event With Us
        </a>
      </div>
    </section>
  );
}