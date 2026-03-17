import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import BackNavigation from "../components/BackNavigation";
import NebulaBackground from "../components/NebulaBackground";
import api from "../utils/api";

function Photography() {

  const isAdmin = !!localStorage.getItem("token");
  const fileInputRef = useRef(null);
  const [images, setImages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [pendingFile, setPendingFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  const fetchImages = async () => {
    const res = await api.get("/images");
    const photos = res.data.filter(i => i.category === "photography");
    setImages(photos);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  function handleFileSelect(event) {
    const file = event.target.files[0];
    if (!file) return;
    setPendingFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setShowModal(true);
    if (fileInputRef.current) fileInputRef.current.value = '';
  }

  async function handleUploadSubmit() {
    if (!pendingFile) return;
    setUploading(true);
    const formData = new FormData();
    formData.append('file', pendingFile);
    formData.append('category', 'photography');
    try {
      await api.post("/images", formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      fetchImages();
      setShowModal(false);
      setPendingFile(null);
      setPreviewUrl("");
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Failed to upload image');
    }
    setUploading(false);
  }

  async function deleteImage(id) {
    await api.delete(`/images/${id}`);
    fetchImages();
  }

  return (
    <>
      <NebulaBackground />

      {/* UPLOAD MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-[#1a1a2e] border border-purple-500/40 rounded-2xl p-8 w-full max-w-md shadow-2xl shadow-purple-500/20">
            <h3 className="text-xl font-bold text-purple-400 mb-6">Upload Photo</h3>
            <div className="space-y-4">
              {previewUrl && (
                <img src={previewUrl} alt="preview" className="w-full h-48 object-cover rounded-lg border border-purple-500/20" />
              )}
              <div className="bg-white/5 border border-purple-500/20 rounded-lg px-4 py-3 text-sm text-gray-300">
                {pendingFile?.name}
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
            Photography
          </h1>

          {isAdmin && (
            <div className="mb-10">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                style={{ display: 'none' }}
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="bg-green-500 px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
              >
                Add Photo
              </button>
            </div>
          )}

          <div className="grid md:grid-cols-3 gap-8">

            {images.map((img) => (
              <motion.div
                key={img._id}
                className="relative"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
              >
                <img
                  src={img.url}
                  alt="photo"
                  className="rounded-xl hover:scale-105 transition w-full h-64 object-cover"
                />
                {isAdmin && (
                  <button
                    onClick={() => deleteImage(img._id)}
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

export default Photography;