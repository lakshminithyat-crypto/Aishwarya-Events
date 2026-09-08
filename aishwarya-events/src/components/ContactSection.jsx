import { useState, useRef, useEffect } from "react";

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", phone: "", event_type: "", event_date: "", event_venue: "", message: "" });
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

  const handleWhatsAppSubmit = (e) => {
    e.preventDefault();
    const msg = `Hello Aishwarya Events!%0A%0AName: ${encodeURIComponent(form.name)}%0APhone: ${encodeURIComponent(form.phone)}%0AEvent Type: ${encodeURIComponent(form.event_type)}%0AEvent Date: ${encodeURIComponent(form.event_date)}%0AEvent Venue: ${encodeURIComponent(form.event_venue)}%0AMessage: ${encodeURIComponent(form.message)}`;
    window.open(`https://wa.me/917702627777?text=${msg}`, "_blank");
  };

  return (
    <section id="contact" ref={sectionRef} className="relative py-28 overflow-hidden" style={{ background: "linear-gradient(135deg, #FFF5E4 0%, #FFFDF7 100%)" }}>
      {/* Top wave */}
      <div className="absolute top-0 left-0 right-0 h-16 overflow-hidden">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full h-full">
          <path d="M0,30 C360,60 1080,0 1440,30 L1440,0 Z" fill="#FFFDF7" />
        </svg>
      </div>

      {/* Mandala watermark */}
      <div className="mandala-bg -left-16 top-1/2 -translate-y-1/2 w-[400px] h-[400px]">
        <svg viewBox="0 0 400 400" className="w-full h-full">
          {[...Array(16)].map((_, i) => (
            <g key={i} transform={`rotate(${i * 22.5} 200 200)`}>
              <ellipse cx="200" cy="50" rx="10" ry="24" fill="#F47420" />
            </g>
          ))}
          <circle cx="200" cy="200" r="85" fill="none" stroke="#E8230A" strokeWidth="2" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20 fade-up">
          <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#F47420" }}>Get In Touch</span>
          <h2
            className="text-4xl sm:text-5xl font-bold mt-3 mb-5"
            style={{ fontFamily: "'Playfair Display', serif", color: "#4A0E06" }}
          >
            Start Your <span className="brand-gradient-text italic">Celebration</span> Today
          </h2>
          <div className="flex justify-center gap-1 mb-6">
            <div className="h-1 w-8 rounded-full" style={{ background: "#E8230A" }} />
            <div className="h-1 w-16 rounded-full" style={{ background: "#F47420" }} />
            <div className="h-1 w-8 rounded-full" style={{ background: "#F5C100" }} />
          </div>
          <p className="max-w-xl mx-auto text-lg leading-relaxed" style={{ color: "#4A0E06", lineHeight: 1.8 }}>
            Ready to create something extraordinary? Reach out — we'd love to hear about your vision.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Info */}
          <div className="space-y-8 fade-up">
            {/* Big WhatsApp CTA */}
            <div
              className="rounded-3xl p-8 text-white brand-gradient shadow-xl"
            >
              <h3 className="text-3xl font-bold mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                Chat with Us on WhatsApp
              </h3>
              <p className="mb-6 text-white/90">
                The fastest way to reach us. Send a message and we'll reply within minutes.
              </p>
              <a
                href="https://wa.me/917702627777?text=Hello%20Aishwarya%20Events%2C%20I%20would%20like%20to%20plan%20an%20event."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-white font-bold py-4 px-8 rounded-full text-sm uppercase tracking-widest transition-all hover:shadow-lg hover:scale-105"
                style={{ color: "#E8230A" }}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#25D366">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                +91 77026 27777
              </a>
            </div>

            {/* Info cards */}
            {[
              { icon: "📞", label: "Phone", value: "+91 77026 27777", link: "tel:+917702627777" },
              { icon: "📧", label: "Email", value: "rajkumarmanna0004@gmail.com", link: "mailto:rajkumarmanna0004@gmail.com" },
              { icon: "📍", label: "Location", value: "Venkatarama Colony, Suraram\nHyderabad, Telangana 500055", link: "https://maps.google.com/?q=Venkatarama+Colony,Suraram,Hyderabad,Telangana+500055" },
              { icon: "🕐", label: "Working Hours", value: "Mon – Sat: 9:00 AM – 8:00 PM\nSunday: By Appointment", link: null },
            ].map(({ icon, label, value, link }) => (
              <div key={label} className="fade-up flex items-center gap-5 bg-white rounded-2xl p-5 review-card">
                <div className="text-3xl w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: "linear-gradient(135deg, #FFF5E4, #FFE5D0)" }}>
                  {icon}
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider mb-0.5" style={{ color: "#F47420" }}>{label}</p>
                  {link ? (
                    <a href={link} target="_blank" rel="noopener noreferrer" className="font-semibold hover:underline" style={{ color: "#4A0E06", whiteSpace: "pre-line" }}>{value}</a>
                  ) : (
                    <p className="font-semibold" style={{ color: "#4A0E06", whiteSpace: "pre-line" }}>{value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Contact Form */}
          <div className="fade-up bg-white rounded-3xl p-8 shadow-lg" style={{ border: "1px solid rgba(244,116,32,0.15)" }}>
            <h3 className="text-2xl font-bold mb-2" style={{ fontFamily: "'Playfair Display', serif", color: "#4A0E06" }}>
              Send Us an Enquiry
            </h3>
            <p className="text-sm mb-7" style={{ color: "#6B3A35" }}>Fill this form and we'll contact you on WhatsApp instantly</p>

            <form onSubmit={handleWhatsAppSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: "#F47420" }}>Your Name *</label>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full rounded-xl border-2 px-4 py-3 text-sm outline-none transition-all focus:border-orange-400"
                  style={{ borderColor: "#F0D9C0", color: "#4A0E06", background: "#FFFDF7" }}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: "#F47420" }}>Phone Number *</label>
                <input
                  required
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="+91 98765 43210"
                  className="w-full rounded-xl border-2 px-4 py-3 text-sm outline-none transition-all focus:border-orange-400"
                  style={{ borderColor: "#F0D9C0", color: "#4A0E06", background: "#FFFDF7" }}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: "#F47420" }}>Event Type</label>
                <select
                  value={form.event_type}
                  onChange={(e) => setForm({ ...form, event_type: e.target.value })}
                  className="w-full rounded-xl border-2 px-4 py-3 text-sm outline-none transition-all focus:border-orange-400"
                  style={{ borderColor: "#F0D9C0", color: form.event_type ? "#4A0E06" : "#9B8B8B", background: "#FFFDF7" }}
                >
                  <option value="">Select event type...</option>
                  {["Wedding", "Reception", "Engagement", "Birthday Party", "Anniversary", "Corporate Event", "Baby Shower", "Haldi / Mehendi", "Other"].map((o) => (
                    <option key={o} value={o}>{o}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: "#F47420" }}>Event Date</label>
                <input
                  type="date"
                  value={form.event_date}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(e) => setForm({ ...form, event_date: e.target.value })}
                  className="w-full rounded-xl border-2 px-4 py-3 text-sm outline-none transition-all focus:border-orange-400"
                  style={{ borderColor: "#F0D9C0", color: form.event_date ? "#4A0E06" : "#9B8B8B", background: "#FFFDF7" }}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: "#F47420" }}>Event Venue</label>
                <input
                  value={form.event_venue}
                  onChange={(e) => setForm({ ...form, event_venue: e.target.value })}
                  placeholder="e.g. Kalyana Mantapam, Banjara Hills, Hyderabad"
                  className="w-full rounded-xl border-2 px-4 py-3 text-sm outline-none transition-all focus:border-orange-400"
                  style={{ borderColor: "#F0D9C0", color: "#4A0E06", background: "#FFFDF7" }}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: "#F47420" }}>Message</label>
                <textarea
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell us about your event — date, venue, expected guests..."
                  className="w-full rounded-xl border-2 px-4 py-3 text-sm outline-none transition-all focus:border-orange-400 resize-none"
                  style={{ borderColor: "#F0D9C0", color: "#4A0E06", background: "#FFFDF7" }}
                />
              </div>
              <button
                type="submit"
                className="w-full brand-gradient shimmer-btn text-white font-semibold py-4 rounded-full text-sm uppercase tracking-widest transition-all hover:shadow-xl hover:scale-[1.02] flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Send via WhatsApp
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}