import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import api from "../utils/api";

function Skills() {

  const isAdmin = !!localStorage.getItem("token");
  const [skills, setSkills] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingSkill, setEditingSkill] = useState(null);
  const [skillName, setSkillName] = useState("");

  const fetchSkills = async () => {
    const res = await api.get("/skills");
    setSkills(res.data);
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  function openAddModal() {
    setEditingSkill(null);
    setSkillName("");
    setShowModal(true);
  }

  function openEditModal(skill) {
    setEditingSkill(skill);
    setSkillName(skill.name || "");
    setShowModal(true);
  }

  async function handleSubmit() {
    if (!skillName.trim()) return;
    if (editingSkill) {
      await api.put(`/skills/${editingSkill._id}`, { name: skillName });
    } else {
      await api.post("/skills", { name: skillName });
    }
    setShowModal(false);
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

        {/* MODAL */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="bg-[#1a1a2e] border border-purple-500/40 rounded-2xl p-8 w-full max-w-sm shadow-2xl shadow-purple-500/20">
              <h3 className="text-xl font-bold text-purple-400 mb-6">{editingSkill ? "Edit Skill" : "Add Skill"}</h3>
              <div>
                <label className="text-sm text-gray-400 mb-1 block">Skill Name *</label>
                <input
                  className="w-full bg-white/5 border border-purple-500/30 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-purple-400"
                  placeholder="e.g. Python"
                  value={skillName}
                  onChange={e => setSkillName(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                  autoFocus
                />
              </div>
              <div className="flex gap-3 mt-6">
                <button onClick={handleSubmit} className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg font-medium transition-colors">{editingSkill ? "Save Changes" : "Add Skill"}</button>
                <button onClick={() => setShowModal(false)} className="flex-1 bg-white/5 hover:bg-white/10 text-gray-300 py-2 rounded-lg font-medium transition-colors">Cancel</button>
              </div>
            </div>
          </div>
        )}

        {/* ADMIN ADD BUTTON */}
        {isAdmin && (
          <motion.div
            className="flex justify-center mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <button
              onClick={openAddModal}
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
                    onClick={() => openEditModal(skill)}
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