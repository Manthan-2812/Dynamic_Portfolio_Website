import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import api from "../utils/api";

function Experience() {
  const isAdmin = !!localStorage.getItem("token");
  const [experiences, setExperiences] = useState([]);

  const fetchExperiences = async () => {
    const res = await api.get("/experiences");
    setExperiences(res.data);
  };

  useEffect(() => {
    fetchExperiences();
  }, []);

  async function addExperience() {
    const org = prompt("Enter Organization Name");
    const timeline = prompt("Enter Timeline");
    const desc = prompt("Enter Description");

    if (!org || !timeline || !desc) return;

    await api.post("/experiences", {
      org,
      timeline,
      desc
    });

    fetchExperiences();
  }

  async function deleteExperience(id) {
    await api.delete(`/experiences/${id}`);
    fetchExperiences();
  }

  async function editExperience(exp) {
    const org = prompt("Edit Organization", exp.org);
    const timeline = prompt("Edit Timeline", exp.timeline);
    const desc = prompt("Edit Description", exp.desc);

    if (!org || !timeline || !desc) return;

    await api.put(`/experiences/${exp._id}`, {
      org,
      timeline,
      desc
    });

    fetchExperiences();
  }

  return (
    <section
      id="experience"
      className="min-h-screen flex items-center justify-center px-6"
    >
      <div className="max-w-6xl w-full text-white">

        {/* SECTION TITLE */}

        <motion.h2
          className="text-4xl md:text-5xl font-bold text-purple-400 mb-12 text-center"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Experience
        </motion.h2>

        {/* ADMIN BUTTONS */}
        {isAdmin && (
          <motion.div
            className="flex justify-center gap-4 mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <button
              onClick={addExperience}
              className="px-4 py-2 bg-green-600/80 text-white rounded-lg hover:bg-green-600 transition-colors text-sm font-medium"
            >
              Add Experience
            </button>
          </motion.div>
        )}

        {/* EXPERIENCE CARDS */}

        <div className="space-y-6">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              className="backdrop-blur-md bg-white/5 border border-purple-500/30 rounded-xl p-8 shadow-lg hover:shadow-purple-500/20 transition-all"
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
            >

              <div className="flex items-center gap-4 mb-4">

                <div className="w-12 h-12 bg-purple-500/30 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-purple-300 font-bold text-lg">{exp.org.charAt(0)}</span>
                </div>

                <div>
                  <h3 className="text-xl font-semibold">
                    {exp.org}
                  </h3>

                  <p className="text-sm text-gray-400">
                    {exp.timeline}
                  </p>
                </div>

              </div>

              <p className="text-gray-300 leading-relaxed">
                {exp.desc}
              </p>

              {isAdmin && (
                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() => editExperience(exp)}
                    className="bg-blue-500 px-3 py-1 rounded-md text-sm hover:bg-blue-600 transition-colors"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteExperience(exp._id)}
                    className="bg-red-500 px-3 py-1 rounded-md text-sm hover:bg-red-600 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              )}

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Experience;