import { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { DEFAULT_PORTAL_PASSWORD } from "@/lib/adminPortalPassword";

const ALLOWED_ADMINS = ["rajkumarmanna0004@gmail.com", "nithyathummapudi@gmail.com"];

function getStoredPortalPassword() {
  return localStorage.getItem("admin_portal_password") || DEFAULT_PORTAL_PASSWORD;
}

export default function AdminDashboard() {
  const [adminEmail, setAdminEmail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [galleryItems, setGalleryItems] = useState([]);
  const [activeTab, setActiveTab] = useState("overview");
  const [newReview, setNewReview] = useState({ customer_name: "", rating: 5, review_text: "", event_type: "", is_approved: true });
  const [newGalleryItem, setNewGalleryItem] = useState({ photo_url: "", event_category: "", caption: "", sort_order: 0 });
  const [galleryUploadMode, setGalleryUploadMode] = useState("file"); // "file" | "url"
  const [galleryFile, setGalleryFile] = useState(null);
  const [galleryPreview, setGalleryPreview] = useState("");
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState("");
  const [pwdForm, setPwdForm] = useState({ current: "", newPwd: "", confirm: "" });
  const [pwdError, setPwdError] = useState("");

  useEffect(() => {
    const loggedIn = sessionStorage.getItem("admin_logged_in");
    const email = sessionStorage.getItem("admin_email");

    if (!loggedIn || !email || !ALLOWED_ADMINS.includes(email)) {
      window.location.href = "/admin-login";
      return;
    }

    setAdminEmail(email);

    Promise.all([
      base44.entities.Review.list(),
      base44.entities.GalleryItem.list(),
    ]).then(([r, g]) => {
      setReviews(r || []);
      setGalleryItems(g || []);
    }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("admin_logged_in");
    sessionStorage.removeItem("admin_email");
    window.location.href = "/";
  };

  const handleDeleteReview = async (id) => {
    if (!confirm("Delete this review?")) return;
    await base44.entities.Review.delete(id);
    setReviews((prev) => prev.filter((r) => r.id !== id));
    showToast("Review deleted.");
  };

  const handleToggleApprove = async (review) => {
    await base44.entities.Review.update(review.id, { is_approved: !review.is_approved });
    setReviews((prev) => prev.map((r) => r.id === review.id ? { ...r, is_approved: !review.is_approved } : r));
    showToast(`Review ${!review.is_approved ? "approved" : "hidden"}.`);
  };

  const handleAddReview = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const created = await base44.entities.Review.create(newReview);
      setReviews((prev) => [created, ...prev]);
      setNewReview({ customer_name: "", rating: 5, review_text: "", event_type: "", is_approved: true });
      showToast("Review added successfully!");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteGallery = async (id) => {
    if (!confirm("Delete this gallery item?")) return;
    await base44.entities.GalleryItem.delete(id);
    setGalleryItems((prev) => prev.filter((g) => g.id !== id));
    showToast("Gallery item deleted.");
  };

  const handleGalleryFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setGalleryFile(file);
    setGalleryPreview(URL.createObjectURL(file));
  };

  const handleAddGallery = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      let photo_url = newGalleryItem.photo_url;
      if (galleryUploadMode === "file" && galleryFile) {
        const result = await base44.integrations.Core.UploadFile({ file: galleryFile });
        photo_url = result.file_url;
      }
      if (!photo_url) { showToast("Please provide an image."); setSaving(false); return; }
      const created = await base44.entities.GalleryItem.create({ ...newGalleryItem, photo_url });
      setGalleryItems((prev) => [created, ...prev]);
      setNewGalleryItem({ photo_url: "", event_category: "", caption: "", sort_order: 0 });
      setGalleryFile(null);
      setGalleryPreview("");
      showToast("Gallery item added!");
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    setPwdError("");
    const current = getStoredPortalPassword();
    if (pwdForm.current !== current) {
      setPwdError("Current password is incorrect.");
      return;
    }
    if (pwdForm.newPwd.length < 6) {
      setPwdError("New password must be at least 6 characters.");
      return;
    }
    if (pwdForm.newPwd !== pwdForm.confirm) {
      setPwdError("New passwords do not match.");
      return;
    }
    localStorage.setItem("admin_portal_password", pwdForm.newPwd);
    setPwdForm({ current: "", newPwd: "", confirm: "" });
    showToast("Portal password updated successfully!");
  };

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center" style={{ background: "#4A0E06" }}>
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white text-sm">Verifying access...</p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: "overview", label: "📊 Overview" },
    { id: "reviews", label: "⭐ Reviews" },
    { id: "gallery", label: "🖼️ Gallery" },
    { id: "password", label: "🔑 Change Password" },
  ];

  return (
    <div className="min-h-screen" style={{ background: "#FFFDF7" }}>
      {/* Toast */}
      {toast && (
        <div className="fixed top-6 right-6 z-50 px-6 py-3 rounded-full text-white text-sm font-semibold shadow-xl brand-gradient">
          ✓ {toast}
        </div>
      )}

      {/* Header */}
      <header className="sticky top-0 z-40 shadow-md" style={{ background: "#4A0E06" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="https://media.base44.com/images/public/6a3f721c39cb0235b5cf3bac/b1780d871_Logo.png"
              alt="Logo"
              className="w-9 h-9 rounded-full object-contain"
            />
            <div>
              <p className="text-white font-bold text-sm" style={{ fontFamily: "'Playfair Display', serif" }}>Aishwarya Events</p>
              <p className="text-xs" style={{ color: "#F5C100" }}>Admin Portal</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs hidden sm:block" style={{ color: "#E8C4B8" }}>
              👤 {adminEmail}
            </span>
            <a href="/" target="_blank" rel="noopener noreferrer"
              className="text-xs px-3 py-1.5 rounded-full border transition-all hover:bg-white/10"
              style={{ borderColor: "#F47420", color: "#F47420" }}>
              View Site
            </a>
            <button
              onClick={handleLogout}
              className="text-xs px-4 py-1.5 rounded-full font-semibold transition-all hover:scale-105"
              style={{ background: "#E8230A", color: "white" }}>
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-8 flex-wrap">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200"
              style={activeTab === tab.id
                ? { background: "linear-gradient(135deg, #E8230A, #F47420)", color: "white" }
                : { background: "white", color: "#4A0E06", border: "2px solid #F0D9C0" }
              }
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Overview */}
        {activeTab === "overview" && (
          <div>
            <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: "'Playfair Display', serif", color: "#4A0E06" }}>
              Dashboard Overview
            </h2>
            <div className="grid sm:grid-cols-3 gap-6 mb-8">
              {[
                { label: "Total Reviews", value: reviews.length, icon: "⭐", color: "#F5C100" },
                { label: "Approved Reviews", value: reviews.filter((r) => r.is_approved).length, icon: "✅", color: "#22C55E" },
                { label: "Gallery Items", value: galleryItems.length, icon: "🖼️", color: "#F47420" },
              ].map((stat) => (
                <div key={stat.label} className="bg-white rounded-2xl p-6 shadow-md" style={{ borderLeft: `4px solid ${stat.color}` }}>
                  <div className="text-3xl mb-2">{stat.icon}</div>
                  <div className="text-3xl font-extrabold" style={{ color: "#4A0E06", fontFamily: "'Playfair Display', serif" }}>{stat.value}</div>
                  <div className="text-sm font-semibold mt-1" style={{ color: "#6B3A35" }}>{stat.label}</div>
                </div>
              ))}
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <h3 className="font-bold mb-4" style={{ color: "#4A0E06", fontFamily: "'Playfair Display', serif" }}>Quick Links</h3>
              <div className="flex flex-wrap gap-3">
                <button onClick={() => setActiveTab("reviews")} className="brand-gradient text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:shadow-lg transition-all">Manage Reviews</button>
                <button onClick={() => setActiveTab("gallery")} className="brand-gradient text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:shadow-lg transition-all">Manage Gallery</button>
              </div>
            </div>
          </div>
        )}

        {/* Reviews */}
        {activeTab === "reviews" && (
          <div>
            <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: "'Playfair Display', serif", color: "#4A0E06" }}>Manage Reviews</h2>

            <div className="bg-white rounded-2xl p-6 shadow-md mb-8" style={{ border: "1px solid #F0D9C0" }}>
              <h3 className="font-bold mb-4" style={{ color: "#4A0E06" }}>Add New Review</h3>
              <form onSubmit={handleAddReview} className="grid sm:grid-cols-2 gap-4">
                <input required value={newReview.customer_name} onChange={(e) => setNewReview({ ...newReview, customer_name: e.target.value })}
                  placeholder="Customer Name" className="rounded-xl border-2 px-4 py-2.5 text-sm outline-none focus:border-orange-400" style={{ borderColor: "#F0D9C0" }} />
                <input value={newReview.event_type} onChange={(e) => setNewReview({ ...newReview, event_type: e.target.value })}
                  placeholder="Event Type (e.g. Wedding)" className="rounded-xl border-2 px-4 py-2.5 text-sm outline-none focus:border-orange-400" style={{ borderColor: "#F0D9C0" }} />
                <select value={newReview.rating} onChange={(e) => setNewReview({ ...newReview, rating: Number(e.target.value) })}
                  className="rounded-xl border-2 px-4 py-2.5 text-sm outline-none focus:border-orange-400" style={{ borderColor: "#F0D9C0" }}>
                  {[5, 4, 3, 2, 1].map((r) => <option key={r} value={r}>{r} Stars</option>)}
                </select>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="approved" checked={newReview.is_approved} onChange={(e) => setNewReview({ ...newReview, is_approved: e.target.checked })} className="w-4 h-4" />
                  <label htmlFor="approved" className="text-sm font-semibold" style={{ color: "#4A0E06" }}>Approve immediately</label>
                </div>
                <textarea required value={newReview.review_text} onChange={(e) => setNewReview({ ...newReview, review_text: e.target.value })}
                  placeholder="Review text..." rows={3}
                  className="sm:col-span-2 rounded-xl border-2 px-4 py-2.5 text-sm outline-none focus:border-orange-400 resize-none" style={{ borderColor: "#F0D9C0" }} />
                <button type="submit" disabled={saving}
                  className="sm:col-span-2 brand-gradient text-white font-semibold py-3 rounded-full text-sm uppercase tracking-widest hover:shadow-lg transition-all disabled:opacity-60">
                  {saving ? "Saving..." : "Add Review"}
                </button>
              </form>
            </div>

            <div className="space-y-4">
              {reviews.length === 0 && <p className="text-center py-10" style={{ color: "#9B8B8B" }}>No reviews yet.</p>}
              {reviews.map((review) => (
                <div key={review.id} className="bg-white rounded-2xl p-5 shadow-md flex items-start gap-4" style={{ border: `2px solid ${review.is_approved ? "#F0D9C0" : "#FEE2E2"}` }}>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="font-bold text-sm" style={{ color: "#4A0E06" }}>{review.customer_name}</span>
                      <span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{ background: review.is_approved ? "#D1FAE5" : "#FEE2E2", color: review.is_approved ? "#065F46" : "#B91C1C" }}>
                        {review.is_approved ? "Approved" : "Hidden"}
                      </span>
                      {review.event_type && <span className="text-xs" style={{ color: "#F47420" }}>{review.event_type}</span>}
                    </div>
                    <div className="text-sm mb-1">{"⭐".repeat(review.rating)}</div>
                    <p className="text-sm" style={{ color: "#6B3A35" }}>{review.review_text}</p>
                  </div>
                  <div className="flex flex-col gap-2 flex-shrink-0">
                    <button onClick={() => handleToggleApprove(review)}
                      className="text-xs px-3 py-1.5 rounded-full font-semibold border transition-all"
                      style={{ borderColor: "#F47420", color: "#F47420" }}>
                      {review.is_approved ? "Hide" : "Approve"}
                    </button>
                    <button onClick={() => handleDeleteReview(review.id)}
                      className="text-xs px-3 py-1.5 rounded-full font-semibold"
                      style={{ background: "#FEE2E2", color: "#B91C1C" }}>
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Gallery */}
        {activeTab === "gallery" && (
          <div>
            <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: "'Playfair Display', serif", color: "#4A0E06" }}>Manage Gallery</h2>

            <div className="bg-white rounded-2xl p-6 shadow-md mb-8" style={{ border: "1px solid #F0D9C0" }}>
              <h3 className="font-bold mb-4" style={{ color: "#4A0E06" }}>Add Gallery Item</h3>

              {/* Toggle */}
              <div className="flex gap-2 mb-5">
                <button type="button" onClick={() => { setGalleryUploadMode("file"); setGalleryFile(null); setGalleryPreview(""); }}
                  className="px-4 py-2 rounded-full text-sm font-semibold transition-all"
                  style={galleryUploadMode === "file" ? { background: "linear-gradient(135deg,#E8230A,#F47420)", color: "white" } : { background: "#FFF5E4", color: "#4A0E06", border: "2px solid #F0D9C0" }}>
                  📁 Upload from Device
                </button>
                <button type="button" onClick={() => { setGalleryUploadMode("url"); setGalleryFile(null); setGalleryPreview(""); }}
                  className="px-4 py-2 rounded-full text-sm font-semibold transition-all"
                  style={galleryUploadMode === "url" ? { background: "linear-gradient(135deg,#E8230A,#F47420)", color: "white" } : { background: "#FFF5E4", color: "#4A0E06", border: "2px solid #F0D9C0" }}>
                  🔗 Paste URL
                </button>
              </div>

              <form onSubmit={handleAddGallery} className="grid sm:grid-cols-2 gap-4">
                {/* Image input */}
                {galleryUploadMode === "file" ? (
                  <label className="sm:col-span-2 flex flex-col items-center justify-center border-2 border-dashed rounded-xl py-6 cursor-pointer transition-all hover:border-orange-400" style={{ borderColor: "#F0D9C0", background: "#FFFDF7" }}>
                    {galleryPreview ? (
                      <img src={galleryPreview} alt="preview" className="h-36 rounded-xl object-cover mb-2" />
                    ) : (
                      <>
                        <span className="text-4xl mb-2">🖼️</span>
                        <span className="text-sm font-semibold" style={{ color: "#4A0E06" }}>Click to choose image or video</span>
                        <span className="text-xs mt-1" style={{ color: "#9B8B8B" }}>JPG, PNG, MP4, etc.</span>
                      </>
                    )}
                    <input type="file" accept="image/*,video/*" className="hidden" onChange={handleGalleryFileChange} />
                  </label>
                ) : (
                  <input value={newGalleryItem.photo_url} onChange={(e) => setNewGalleryItem({ ...newGalleryItem, photo_url: e.target.value })}
                    placeholder="Paste image or video URL" className="sm:col-span-2 rounded-xl border-2 px-4 py-2.5 text-sm outline-none focus:border-orange-400" style={{ borderColor: "#F0D9C0" }} />
                )}

                <input required value={newGalleryItem.event_category} onChange={(e) => setNewGalleryItem({ ...newGalleryItem, event_category: e.target.value })}
                  placeholder="Event Category (e.g. Wedding)" className="rounded-xl border-2 px-4 py-2.5 text-sm outline-none focus:border-orange-400" style={{ borderColor: "#F0D9C0" }} />
                <input value={newGalleryItem.caption} onChange={(e) => setNewGalleryItem({ ...newGalleryItem, caption: e.target.value })}
                  placeholder="Caption" className="rounded-xl border-2 px-4 py-2.5 text-sm outline-none focus:border-orange-400" style={{ borderColor: "#F0D9C0" }} />
                <input type="number" value={newGalleryItem.sort_order} onChange={(e) => setNewGalleryItem({ ...newGalleryItem, sort_order: Number(e.target.value) })}
                  placeholder="Sort Order" className="rounded-xl border-2 px-4 py-2.5 text-sm outline-none focus:border-orange-400" style={{ borderColor: "#F0D9C0" }} />
                <button type="submit" disabled={saving}
                  className="brand-gradient text-white font-semibold py-3 rounded-full text-sm uppercase tracking-widest hover:shadow-lg transition-all disabled:opacity-60">
                  {saving ? "Uploading..." : "Add to Gallery"}
                </button>
              </form>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {galleryItems.length === 0 && <p className="col-span-3 text-center py-10" style={{ color: "#9B8B8B" }}>No gallery items yet.</p>}
              {galleryItems.map((item) => {
                const isVideo = item.photo_url && /\.(mp4|webm|mov|ogg)(\?|$)/i.test(item.photo_url);
                return (
                  <div key={item.id} className="bg-white rounded-2xl overflow-hidden shadow-md" style={{ border: "1px solid #F0D9C0" }}>
                    <div className="h-40 overflow-hidden">
                      {isVideo ? (
                        <video src={item.photo_url} className="w-full h-full object-cover" muted />
                      ) : (
                        <img src={item.photo_url} alt={item.caption} className="w-full h-full object-cover" />
                      )}
                    </div>
                    <div className="p-4">
                      <p className="text-xs font-semibold uppercase tracking-wider mb-0.5" style={{ color: "#F47420" }}>{item.event_category}</p>
                      <p className="text-sm font-bold mb-3" style={{ color: "#4A0E06" }}>{item.caption || "—"}</p>
                      <button onClick={() => handleDeleteGallery(item.id)}
                        className="text-xs px-4 py-1.5 rounded-full font-semibold"
                        style={{ background: "#FEE2E2", color: "#B91C1C" }}>
                        Delete
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Change Password */}
        {activeTab === "password" && (
          <div className="max-w-md">
            <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: "'Playfair Display', serif", color: "#4A0E06" }}>Change Portal Password</h2>
            <div className="bg-white rounded-2xl p-6 shadow-md" style={{ border: "1px solid #F0D9C0" }}>
              <p className="text-sm mb-6" style={{ color: "#6B3A35" }}>
                Update the shared admin portal password. All admins must use the new password going forward.
              </p>
              <form onSubmit={handleChangePassword} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: "#F47420" }}>Current Password</label>
                  <input type="password" required value={pwdForm.current}
                    onChange={(e) => setPwdForm({ ...pwdForm, current: e.target.value })}
                    placeholder="Enter current password"
                    className="w-full rounded-xl border-2 px-4 py-3 text-sm outline-none focus:border-orange-400"
                    style={{ borderColor: "#F0D9C0", color: "#4A0E06", background: "#FFFDF7" }} />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: "#F47420" }}>New Password</label>
                  <input type="password" required value={pwdForm.newPwd}
                    onChange={(e) => setPwdForm({ ...pwdForm, newPwd: e.target.value })}
                    placeholder="Enter new password"
                    className="w-full rounded-xl border-2 px-4 py-3 text-sm outline-none focus:border-orange-400"
                    style={{ borderColor: "#F0D9C0", color: "#4A0E06", background: "#FFFDF7" }} />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: "#F47420" }}>Confirm New Password</label>
                  <input type="password" required value={pwdForm.confirm}
                    onChange={(e) => setPwdForm({ ...pwdForm, confirm: e.target.value })}
                    placeholder="Re-enter new password"
                    className="w-full rounded-xl border-2 px-4 py-3 text-sm outline-none focus:border-orange-400"
                    style={{ borderColor: "#F0D9C0", color: "#4A0E06", background: "#FFFDF7" }} />
                </div>
                {pwdError && (
                  <div className="p-3 rounded-xl text-sm font-semibold" style={{ background: "#FEE2E2", color: "#B91C1C" }}>
                    ⚠️ {pwdError}
                  </div>
                )}
                <button type="submit"
                  className="w-full brand-gradient text-white font-semibold py-3 rounded-full text-sm uppercase tracking-widest hover:shadow-lg transition-all">
                  🔑 Update Password
                </button>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}