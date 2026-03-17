import { useState, useEffect } from "react";
import api from "../utils/api";
import BackNavigation from "../components/BackNavigation";
import NebulaBackground from "../components/NebulaBackground";
import { motion } from "framer-motion";

function Paintings() {

  const isAdmin = !!localStorage.getItem("token");

  const [images, setImages] = useState([]);

  const fetchImages = async () => {

    const res = await api.get("/images");

    const paintings = res.data.filter(i => i.category === "painting");

    setImages(paintings);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  async function addImage() {

    const url = prompt("Image URL");

    await api.post("/images", {
      url,
      category: "painting"
    });

    fetchImages();
  }

  async function deleteImage(id) {

    await api.delete(`/images/${id}`);

    fetchImages();
  }

  return (
    <>
      <NebulaBackground />
      <div className="min-h-screen px-6 py-20 text-white relative z-10">

        <div className="max-w-6xl mx-auto">

          <BackNavigation />

          <h1 className="text-4xl font-bold text-purple-400 mb-12">
            Paintings
          </h1>

          {isAdmin && (
            <div className="mb-10">
              <button
                onClick={addImage}
                className="bg-green-500 px-4 py-2 rounded-lg"
              >
                Add Image
              </button>
            </div>
          )}

          <div className="grid md:grid-cols-3 gap-8">

            {images.map(img => (
              <motion.div
                key={img._id}
                className="relative"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
              >
                <img
                  src={img.url}
                  alt="painting"
                  className="rounded-xl hover:scale-105 transition w-full"
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

export default Paintings;