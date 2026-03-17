import { useState, useEffect, useRef } from "react";
import api from "../utils/api";
import BackNavigation from "../components/BackNavigation";
import NebulaBackground from "../components/NebulaBackground";
import { motion } from "framer-motion";

function Certifications() {

  const isAdmin = !!localStorage.getItem("token");
  const fileInputRef = useRef(null);
  const [certs, setCerts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [pendingFile, setPendingFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [certTitle, setCertTitle] = useState("");
  const [uploading, setUploading] = useState(false);

  const fetchCerts = async () => {
    const res = await api.get("/certificates");
    setCerts(res.data);
  };

  useEffect(() => {
    fetchCerts();
  }, []);

  function handleFileSelect(event) {
    const file = event.target.files[0];
    if (!file) return;
    setPendingFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setCertTitle("");
    setShowModal(true);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  async function handleUploadSubmit() {
    if (!pendingFile || !certTitle.trim()) return;
    setUploading(true);
    const formData = new FormData();
    formData.append("file", pendingFile);
    formData.append("title", certTitle.trim());
    try {
      await api.post("/certificates", formData, { headers: { "Content-Type": "multipart/form-data" } });
      fetchCerts();
      setShowModal(false);
      setPendingFile(null);
      setPreviewUrl("");
      setCertTitle("");
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Failed to upload certificate");
    }
    setUploading(false);
  }

  async function deleteCert(id) {
    if (!confirm("Delete this certificate?")) return;
    await api.delete(`/certificates/${id}`);
    fetchCerts();
  }

  return (
    <>
      <NebulaBackground />

      {/* UPLOAD MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-[#1a1a2e] border border-purple-500/40 rounded-2xl p-8 w-full max-w-md shadow-2xl shadow-purple-500/20">
            <h3 className="text-xl font-bold text-purple-400 mb-6">Upload Certificate</h3>
            <div className="space-y-4">
              {previewUrl && (
                <img src={previewUrl} alt="preview" className="w-full h-48 object-contain rounded-lg border border-purple-500/20 bg-white/5" />
              )}
              <div>
                <label className="text-sm text-gray-400 mb-1 block">Certificate Title *</label>
                <input
                  className="w-full bg-white/5 border border-purple-500/30 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-purple-400"
                  placeholder="e.g. Python for Data Science - Coursera"
                  value={certTitle}
                  onChange={e => setCertTitle(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && handleUploadSubmit()}
                  autoFocus
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={handleUploadSubmit}
                disabled={uploading}
                className="flex-1 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white py-2 rounded-lg font-medium transition-colors"
              >
                {uploading ? "Uploading..." : "Upload"}
              </button>
              <button
                onClick={() => { setShowModal(false); setPendingFile(null); setPreviewUrl(""); }}
                className="flex-1 bg-white/5 hover:bg-white/10 text-gray-300 py-2 rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="min-h-screen px-6 py-20 text-white relative z-10">
        <div className="max-w-6xl mx-auto">

          <BackNavigation />

          <h1 className="text-4xl font-bold text-purple-400 mb-12">
            Certifications
          </h1>

          {isAdmin && (
            <div className="mb-10">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                style={{ display: "none" }}
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="bg-green-500 px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
              >
                Add Certificate
              </button>
            </div>
          )}

          <div className="grid md:grid-cols-3 gap-8">
            {certs.map((cert, index) => (
              <motion.div
                key={cert._id}
                className="relative backdrop-blur-md bg-white/5 border border-purple-500/30 rounded-xl overflow-hidden hover:shadow-purple-500/30 shadow-lg transition-all"
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <img
                  src={cert.url}
                  alt={cert.title}
                  className="w-full object-contain bg-white/5"
                />
                <div className="p-4">
                  <p className="text-sm font-semibold text-purple-300 text-center">
                    {cert.title}
                  </p>
                </div>
                {isAdmin && (
                  <button
                    onClick={() => deleteCert(cert._id)}
                    className="absolute top-2 right-2 bg-red-500 px-2 py-1 rounded text-xs text-white hover:bg-red-600 transition-colors"
                  >
                    Delete
                  </button>
                )}
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </>
  );
}

export default Certifications;
