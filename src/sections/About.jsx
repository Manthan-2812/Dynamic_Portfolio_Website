import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import profile from "../assets/images/Portfolio.jpg";
import resumeFile from "../assets/resume/Manthan Parekh New Resume .pdf";

function About() {
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
            <p className="leading-relaxed bg-gradient-to-r from-purple-200 via-pink-200 to-blue-200 bg-clip-text text-transparent font-medium">
              I am passionate about exploring the intersection of <span className="font-semibold text-purple-300 drop-shadow-lg">technology and finance</span>,
              particularly <span className="font-semibold text-purple-300 drop-shadow-lg">FinTech and data-driven financial solutions</span>.
              My goal is to build a career in <span className="font-semibold text-purple-300 drop-shadow-lg">FinTech and Data Science</span>,
              leveraging AI to develop intelligent financial systems and tools.
            </p>
            
            <p className="leading-relaxed bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 bg-clip-text text-transparent font-medium">
              Beyond technology, I enjoy <span className="font-semibold text-purple-300 drop-shadow-lg">painting and sketching</span>, which helps me build
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
            
            <motion.a
              href={resumeFile}
              download="Manthan Parekh New Resume .pdf"
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-full shadow-lg hover:shadow-purple-500/50 hover:scale-105 transition-all duration-300 border border-purple-400/30"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Download Resume
            </motion.a>
          </div>

        </motion.div>

      </div>
    </section>
  );
}

export default About;