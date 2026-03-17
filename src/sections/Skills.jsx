import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import api from "../utils/api";

function Skills() {

  const isAdmin = !!localStorage.getItem("token");

  const [skills, setSkills] = useState([]);

  const fetchSkills = async () => {
    const res = await api.get("/skills");
    setSkills(res.data);
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  async function addSkill() {
    const name = prompt("Enter skill name");
    if (!name) return;

    await api.post("/skills", { name });

    fetchSkills();
  }

  async function editSkill(skill) {

    const name = prompt("Edit skill", skill.name);

    if (!name) return;

    await api.put(`/skills/${skill._id}`, { name });

    fetchSkills();
  }

  async function deleteSkill(id) {

    await api.delete(`/skills/${id}`);

    fetchSkills();
  }

  return (
    <section
      id="skills"
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
          Skills
        </motion.h2>

        {/* ADMIN ADD BUTTON */}
        {isAdmin && (
          <motion.div
            className="flex justify-center mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <button
              onClick={addSkill}
              className="bg-green-600/80 px-4 py-2 rounded-lg text-white font-medium hover:bg-green-600 transition-colors"
            >
              Add Skill
            </button>
          </motion.div>
        )}

        {/* SKILL GRID */}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

          {skills.map(skill => (
            <motion.div
              key={skill._id}
              className="backdrop-blur-md bg-white/5 border border-purple-500/30 rounded-lg py-4 px-6 text-center font-semibold hover:bg-purple-500/10 hover:shadow-purple-500/30 shadow-md transition-all"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: skills.indexOf(skill) * 0.1 }}
              viewport={{ once: true }}
            >
              {skill.name}

              {isAdmin && (
                <div className="flex justify-center gap-2 mt-3">
                  <button
                    onClick={() => editSkill(skill)}
                    className="bg-blue-500 px-2 py-1 rounded text-xs hover:bg-blue-600 transition-colors"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteSkill(skill._id)}
                    className="bg-red-500 px-2 py-1 rounded text-xs hover:bg-red-600 transition-colors"
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

export default Skills;