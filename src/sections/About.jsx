import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import profile from "../assets/images/Portfolio.jpg";
import resumeFile from "../assets/resume/Manthan Parekh New Resume .pdf";
import { useState, useEffect, useRef } from "react";
import api from "../utils/api";

function About() {
  const isAdmin = !!localStorage.getItem("token");
  const fileInputRef = useRef(null);
  const [resumeUrl, setResumeUrl] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    api.get("/resume").then(res => {
      if (res.data && res.data.url) setResumeUrl(res.data.url);
    }).catch(() => {});
  }, []);

  async function handleDownload() {
    if (resumeUrl) {
      try {
        const response = await fetch(resumeUrl, { method: "GET", mode: "cors" });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const blob = await response.blob();
        const blobUrl = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = blobUrl;
        a.download = "Manthan_Parekh_Resume.pdf";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(blobUrl);
      } catch (e) {
        window.open(resumeUrl, "_blank");
      }
      return;
    }
    const url = resumeFile;
    try {
      const response = await fetch(url, { method: "GET", mode: "cors" });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = "Manthan_Parekh_Resume.pdf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(blobUrl);
    } catch {
      window.open(url, "_blank");
    }
  }

  async function handleResumeUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await api.post("/resume", formData, { headers: { "Content-Type": "multipart/form-data" } });
      setResumeUrl(res.data.url);
    } catch (err) {
      alert("Failed to upload resume");
    }
    setUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }
  return (
    <section
      id="about"
      className="min-h-screen flex items-center justify-center px-6"
    >
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-12 items-center">

        {/* LEFT SIDE */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-white"
        >

          <h1 className="text-4xl md:text-5xl font-bold text-purple-400 mb-6">
            About Me
          </h1>

          <h2 className="text-xl md:text-2xl mb-4">
            AI & Data Science Undergraduate at DJ Sanghvi College of Engineering
          </h2>

          {/* TYPEWRITER TEXT */}
          <div className="text-purple-300 text-xl md:text-3xl font-bold min-h-[41px] mt-2">

            <Typewriter
              words={[
                "Web Developer",
                "FinTech & Financial Markets Enthusiast",
                "Building Data-Driven Financial Solutions",
                "Content Writer",
                "Painter & Sketch Artist"
              ]}
              loop={true}
              cursor
              cursorStyle=""
              typeSpeed={70}
              deleteSpeed={70}
              delaySpeed={1500}
            />

          </div>

          <div className="mt-8 text-[17px] md:text-lg max-w-xl space-y-4">
            <p className="leading-relaxed text-gray-200 font-light tracking-wide italic border-l-2 border-purple-400 pl-4">
              I am passionate about exploring the intersection of <span className="font-semibold text-purple-300 not-italic">technology and finance</span>,
              particularly <span className="font-semibold text-purple-300 not-italic">FinTech and data-driven financial solutions</span>.
              My goal is to build a career in <span className="font-semibold text-purple-300 not-italic">FinTech and Data Science</span>,
              leveraging AI to develop intelligent financial systems and tools.
            </p>
            
            <p className="leading-relaxed text-gray-200 font-light tracking-wide italic border-l-2 border-purple-400 pl-4">
              Beyond technology, I enjoy <span className="font-semibold text-purple-300 not-italic">painting and sketching</span>, which helps me build
              focus, creativity, and discipline. I also write analytical reports and content
              based on ideas and experiences I explore.
            </p>
          </div>

        </motion.div>


        {/* RIGHT SIDE IMAGE */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex justify-center"
        >

          <div className="flex flex-col items-center space-y-6">
            <motion.img
              src={profile}
              alt="profile"
              className="w-52 h-52 md:w-72 md:h-72 object-cover rounded-full border-4 border-purple-500 shadow-lg"
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            
            <motion.button
              onClick={handleDownload}
              download="Manthan_Parekh_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-full shadow-lg hover:shadow-purple-500/50 hover:scale-105 transition-all duration-300 border border-purple-400/30"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Download Resume
            </motion.button>

            {isAdmin && (
              <div className="flex flex-col items-center gap-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="application/pdf"
                  onChange={handleResumeUpload}
                  style={{ display: "none" }}
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                  className="px-4 py-2 text-sm bg-white/10 border border-purple-500/40 text-purple-300 rounded-full hover:bg-purple-500/20 transition-colors disabled:opacity-50"
                >
                  {uploading ? "Uploading..." : "Update Resume"}
                </button>
              </div>
            )}
          </div>

        </motion.div>

      </div>
    </section>
  );
}

export default About;