import { useState, useEffect, useRef } from "react";
import { base44 } from "@/api/base44Client";

const SEED_REVIEWS = [
  { id: "s1", customer_name: "Priya Reddy", rating: 5, event_type: "Wedding", review_text: "Aishwarya Events made our wedding absolutely magical! The floral arrangements and lighting were beyond our imagination. Every guest kept complimenting the décor. Truly the best decision we made!" },
  { id: "s2", customer_name: "Kiran & Sunita", rating: 5, event_type: "Reception", review_text: "From the very first meeting to the last moment of our reception, the team was professional, creative, and incredibly warm. The mandap setup was a dream come true!" },
  { id: "s3", customer_name: "Raghav Sharma", rating: 5, event_type: "Birthday Party", review_text: "Threw a 50th birthday party for my father and the whole family was blown away. The theme execution was perfect and the tent setup was world-class. Highly recommend!" },
  { id: "s4", customer_name: "Meena Lakshmi", rating: 4, event_type: "Engagement", review_text: "Beautiful engagement setup with lovely flower arches and ambient lighting. The team was responsive and executed everything on time. Will definitely use their services again." },
];

function StarRating({ rating }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star} className={star <= rating ? "star-filled" : "star-empty"} style={{ fontSize: "1.1rem" }}>★</span>
      ))}
    </div>
  );
}

function StarPicker({ value, onChange }) {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="flex gap-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(0)}
          className="text-3xl transition-transform hover:scale-110"
          style={{ color: star <= (hovered || value) ? "#F5C100" : "#d1c4a0" }}
        >★</button>
      ))}
    </div>
  );
}

export default function ReviewsSection() {
  const [reviews, setReviews] = useState(SEED_REVIEWS);
  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const sectionRef = useRef(null);

  const [form, setForm] = useState({
    customer_name: "",
    rating: 5,
    event_type: "",
    review_text: "",
    photo_url: ""
  });
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState("");

  useEffect(() => {
    const fetchReviews = () => {
      base44.entities.Review.filter({ is_approved: true }, "-created_date", 50)
        .then((data) => {
          if (data && data.length > 0) setReviews(data);
        })
        .catch(() => {});
    };
    fetchReviews();
    // Auto-refresh every 30 seconds to pull in new reviews automatically
    const interval = setInterval(fetchReviews, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".fade-up").forEach((el, i) => {
              setTimeout(() => el.classList.add("visible"), i * 100);
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setPhotoFile(file);
    setPhotoPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.customer_name || !form.review_text) return;
    setSubmitting(true);
    let photo_url = "";
    try {
      if (photoFile) {
        const result = await base44.integrations.Core.UploadFile({ file: photoFile });
        photo_url = result.file_url;
      }
      await base44.entities.Review.create({ ...form, photo_url, is_approved: false });
      const updated = await base44.entities.Review.filter({ is_approved: true }, "-created_date", 50);
      if (updated && updated.length > 0) setReviews(updated);
      setSubmitted(true);
      setTimeout(() => {
        setShowModal(false);
        setSubmitted(false);
        setForm({ customer_name: "", rating: 5, event_type: "", review_text: "", photo_url: "" });
        setPhotoFile(null);
        setPhotoPreview("");
      }, 2500);
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const VISIBLE = 3;
  const displayed = reviews.slice(currentIndex, currentIndex + VISIBLE);
  const canPrev = currentIndex > 0;
  const canNext = currentIndex + VISIBLE < reviews.length;

  return (
    <section id="reviews" ref={sectionRef} className="relative py-28 overflow-hidden" style={{ background: "#FFFDF7" }}>
      {/* Mandala watermark */}
      <div className="mandala-bg left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px]">
        <svg viewBox="0 0 600 600" className="w-full h-full">
          {[...Array(24)].map((_, i) => (
            <g key={i} transform={`rotate(${i * 15} 300 300)`}>
              <ellipse cx="300" cy="70" rx="10" ry="22" fill="#E8230A" />
            </g>
          ))}
          <circle cx="300" cy="300" r="120" fill="none" stroke="#F47420" strokeWidth="2" />
          <circle cx="300" cy="300" r="80" fill="none" stroke="#F5C100" strokeWidth="1.5" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20 fade-up">
          <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#F47420" }}>What Clients Say</span>
          <h2
            className="text-4xl sm:text-5xl font-bold mt-3 mb-5"
            style={{ fontFamily: "'Playfair Display', serif", color: "#4A0E06" }}
          >
            Circle of <span className="brand-gradient-text italic">Trust</span>
          </h2>
          <div className="flex justify-center gap-1 mb-6">
            <div className="h-1 w-8 rounded-full" style={{ background: "#E8230A" }} />
            <div className="h-1 w-16 rounded-full" style={{ background: "#F47420" }} />
            <div className="h-1 w-8 rounded-full" style={{ background: "#F5C100" }} />
          </div>
        </div>

        {/* Reviews grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {displayed.map((r, i) => (
            <div
              key={r.id || i}
              className="fade-up review-card bg-white rounded-3xl p-7 flex flex-col"
            >
              {/* Top */}
              <div className="flex items-start gap-4 mb-4">
                {r.photo_url ? (
                  <img
                    src={r.photo_url}
                    alt={r.customer_name}
                    className="w-14 h-14 rounded-full object-cover flex-shrink-0 border-2"
                    style={{ borderColor: "#F47420" }}
                  />
                ) : (
                  <div
                    className="w-14 h-14 rounded-full flex-shrink-0 flex items-center justify-center text-white text-xl font-bold brand-gradient"
                  >
                    {r.customer_name.charAt(0)}
                  </div>
                )}
                <div>
                  <p className="font-bold text-base" style={{ color: "#4A0E06", fontFamily: "'Playfair Display', serif" }}>
                    {r.customer_name}
                  </p>
                  {r.event_type && (
                    <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#F47420" }}>
                      {r.event_type}
                    </span>
                  )}
                  <div className="mt-1">
                    <StarRating rating={r.rating} />
                  </div>
                </div>
              </div>
              <p className="text-base leading-relaxed flex-1 italic" style={{ color: "#6B3A35", lineHeight: 1.8 }}>
                "{r.review_text}"
              </p>
            </div>
          ))}
        </div>

        {/* Carousel controls */}
        {reviews.length > VISIBLE && (
          <div className="flex justify-center gap-4 mb-12">
            <button
              onClick={() => setCurrentIndex((p) => Math.max(0, p - 1))}
              disabled={!canPrev}
              className="w-11 h-11 rounded-full border-2 flex items-center justify-center transition-all hover:scale-105 disabled:opacity-30"
              style={{ borderColor: "#F47420", color: "#F47420" }}
            >←</button>
            <button
              onClick={() => setCurrentIndex((p) => p + 1)}
              disabled={!canNext}
              className="w-11 h-11 rounded-full brand-gradient text-white flex items-center justify-center transition-all hover:scale-105 disabled:opacity-30"
            >→</button>
          </div>
        )}

        {/* Add Review CTA */}
        <div className="text-center fade-up">
          <div
            className="inline-block bg-white rounded-3xl p-8 cursor-pointer transition-all hover:shadow-xl review-card"
            onClick={() => setShowModal(true)}
          >
            <div className="text-4xl mb-3">✍️</div>
            <h3 className="text-xl font-bold mb-2" style={{ fontFamily: "'Playfair Display', serif", color: "#4A0E06" }}>
              Share Your Experience
            </h3>
            <p className="text-sm mb-5" style={{ color: "#6B3A35" }}>
              Had an event with us? We'd love to hear your story.
            </p>
            <button className="brand-gradient shimmer-btn text-white font-semibold py-3 px-8 rounded-full text-sm uppercase tracking-widest transition-all hover:scale-105">
              Add Your Review
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 modal-backdrop"
          onClick={(e) => { if (e.target === e.currentTarget) setShowModal(false); }}
        >
          <div className="bg-white rounded-3xl p-8 w-full max-w-lg shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center text-lg transition-all hover:scale-110"
              style={{ background: "#FFF5E4", color: "#4A0E06" }}
            >✕</button>

            {submitted ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-5">🎉</div>
                <h3 className="text-2xl font-bold mb-3 brand-gradient-text" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Thank You!
                </h3>
                <p style={{ color: "#6B3A35" }}>Your review has been submitted and is pending approval. Thank you for your kind words!</p>
              </div>
            ) : (
              <>
                <h3 className="text-2xl font-bold mb-2" style={{ fontFamily: "'Playfair Display', serif", color: "#4A0E06" }}>
                  Your Review
                </h3>
                <p className="text-sm mb-7" style={{ color: "#6B3A35" }}>Share your celebration story with us</p>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: "#F47420" }}>Your Name *</label>
                    <input
                      required
                      value={form.customer_name}
                      onChange={(e) => setForm({ ...form, customer_name: e.target.value })}
                      placeholder="e.g. Priya Reddy"
                      className="w-full rounded-xl border-2 px-4 py-3 text-sm outline-none transition-all focus:border-orange-400"
                      style={{ borderColor: "#F0D9C0", color: "#4A0E06", background: "#FFFDF7" }}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: "#F47420" }}>Event Type</label>
                    <input
                      value={form.event_type}
                      onChange={(e) => setForm({ ...form, event_type: e.target.value })}
                      placeholder="e.g. Wedding, Birthday, Engagement"
                      className="w-full rounded-xl border-2 px-4 py-3 text-sm outline-none transition-all focus:border-orange-400"
                      style={{ borderColor: "#F0D9C0", color: "#4A0E06", background: "#FFFDF7" }}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "#F47420" }}>Your Rating *</label>
                    <StarPicker value={form.rating} onChange={(v) => setForm({ ...form, rating: v })} />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: "#F47420" }}>Your Review *</label>
                    <textarea
                      required
                      rows={4}
                      value={form.review_text}
                      onChange={(e) => setForm({ ...form, review_text: e.target.value })}
                      placeholder="Tell us about your experience with Aishwarya Events..."
                      className="w-full rounded-xl border-2 px-4 py-3 text-sm outline-none transition-all focus:border-orange-400 resize-none"
                      style={{ borderColor: "#F0D9C0", color: "#4A0E06", background: "#FFFDF7" }}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "#F47420" }}>Add a Photo (optional)</label>
                    <label className="flex flex-col items-center justify-center border-2 border-dashed rounded-xl py-6 cursor-pointer transition-all hover:border-orange-400"
                      style={{ borderColor: "#F0D9C0", background: "#FFFDF7" }}>
                      {photoPreview ? (
                        <img src={photoPreview} alt="preview" className="w-24 h-24 rounded-xl object-cover" />
                      ) : (
                        <>
                          <span className="text-3xl mb-2">📷</span>
                          <span className="text-sm" style={{ color: "#6B3A35" }}>Click to upload a photo</span>
                        </>
                      )}
                      <input type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full brand-gradient text-white font-semibold py-4 rounded-full text-sm uppercase tracking-widest transition-all hover:shadow-lg hover:scale-[1.02] disabled:opacity-60"
                  >
                    {submitting ? "Submitting..." : "Submit My Review"}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
}