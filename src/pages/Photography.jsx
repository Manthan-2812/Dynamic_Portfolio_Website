import { motion } from "framer-motion";
import { useState } from "react";
import BackNavigation from "../components/BackNavigation";
import NebulaBackground from "../components/NebulaBackground";

function Photography() {

  const isAdmin = !!localStorage.getItem("token");

  const [images, setImages] = useState([
    "/photography/p1.jpg",
    "/photography/p2.jpg"
  ]);

  function addImage() {
    const img = prompt("Enter image path (example: /photography/image.jpg)");

    if (!img) return;

    setImages([...images, img]);
  }

  function deleteImage(index) {
    const updated = images.filter((_, i) => i !== index);
    setImages(updated);
  }

  return (
    <>
      <NebulaBackground />
      <div className="min-h-screen px-6 py-20 text-white relative z-10">

        <div className="max-w-6xl mx-auto">

          <BackNavigation />

          <h1 className="text-4xl font-bold text-purple-400 mb-12">
            Photography
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

            {images.map((img, index) => (
              <motion.div
                key={index}
                className="relative"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
              >
                <img
                  src={img}
                  alt="photo"
                  className="rounded-xl hover:scale-105 transition w-full"
                />
                {isAdmin && (
                  <button
                    onClick={() => deleteImage(index)}
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