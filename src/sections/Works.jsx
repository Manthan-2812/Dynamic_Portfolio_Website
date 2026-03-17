import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function Works() {

  const navigate = useNavigate();

  const works = [
    {
      title: "Content Writing",
      description: "Articles and analytical reports based on ideas and experiences I explore.",
      route: "/writing"
    },
    {
      title: "Paintings",
      description: "A collection of paintings and sketches reflecting creativity and discipline.",
      route: "/paintings"
    },
    {
      title: "Photography",
      description: "Captured moments and perspectives through photography.",
      route: "/photography"
    }
  ];

  return (
    <section
      id="works"
      className="min-h-screen flex items-center justify-center px-6"
    >
      <div className="max-w-6xl w-full text-white">

        {/* SECTION TITLE */}

        <motion.h2
          className="text-4xl md:text-5xl font-bold text-purple-400 mb-6 text-center"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          My Works
        </motion.h2>

        <motion.p
          className="text-center text-gray-300 mb-12 text-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Click on each one to explore
        </motion.p>

        {/* WORK CARDS */}

        <div className="grid md:grid-cols-3 gap-8">

          {works.map((work, index) => (
            <motion.div
              key={index}
              onClick={() => navigate(work.route)}
              className="cursor-pointer backdrop-blur-md bg-white/5 border border-purple-500/30 rounded-xl p-8 hover:bg-purple-500/10 hover:shadow-purple-500/30 shadow-lg transition-all"
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >

              <h3 className="text-xl font-semibold mb-4 text-purple-300">
                {work.title}
              </h3>

              <p className="text-gray-300">
                {work.description}
              </p>

            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default Works;