import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import api from "../utils/api";

const emptyExpForm = { org: "", timeline: "", desc: "" };

function Experience() {
  const isAdmin = !!localStorage.getItem("token");
  const [experiences, setExperiences] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingExp, setEditingExp] = useState(null);
  const [form, setForm] = useState(emptyExpForm);

  const fetchExperiences = async () => {
    const res = await api.get("/experiences");
    setExperiences(res.data);
  };

  useEffect(() => {
    fetchExperiences();
  }, []);

  function openAddModal() {
    setEditingExp(null);
    setForm(emptyExpForm);
    setShowModal(true);
  }

  function openEditModal(exp) {
    setEditingExp(exp);
    setForm({ org: exp.org || "", timeline: exp.timeline || "", desc: exp.desc || "" });
    setShowModal(true);
  }

  async function handleSubmit() {
    if (!form.org || !form.timeline || !form.desc) return;
    if (editingExp) {
      await api.put(`/experiences/${editingExp._id}`, form);
    } else {
      await api.post("/experiences", form);
    }
    setShowModal(false);
    fetchExperiences();
  }

  async function deleteExperience(id) {
    await api.delete(`/experiences/${id}`);
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

        {/* MODAL */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="bg-[#1a1a2e] border border-purple-500/40 rounded-2xl p-8 w-full max-w-md shadow-2xl shadow-purple-500/20">
              <h3 className="text-xl font-bold text-purple-400 mb-6">{editingExp ? "Edit Experience" : "Add Experience"}</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-400 mb-1 block">Organization *</label>
                  <input className="w-full bg-white/5 border border-purple-500/30 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-purple-400" placeholder="e.g. Google" value={form.org} onChange={e => setForm({ ...form, org: e.target.value })} />
                </div>
                <div>
                  <label className="text-sm text-gray-400 mb-1 block">Timeline *</label>
                  <input className="w-full bg-white/5 border border-purple-500/30 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-purple-400" placeholder="e.g. June 2024 - Present" value={form.timeline} onChange={e => setForm({ ...form, timeline: e.target.value })} />
                </div>
                <div>
                  <label className="text-sm text-gray-400 mb-1 block">Description *</label>
                  <textarea rows={3} className="w-full bg-white/5 border border-purple-500/30 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 resize-none" placeholder="What did you do?" value={form.desc} onChange={e => setForm({ ...form, desc: e.target.value })} />
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button onClick={handleSubmit} className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg font-medium transition-colors">{editingExp ? "Save Changes" : "Add Experience"}</button>
                <button onClick={() => setShowModal(false)} className="flex-1 bg-white/5 hover:bg-white/10 text-gray-300 py-2 rounded-lg font-medium transition-colors">Cancel</button>
              </div>
            </div>
          </div>
        )}

        {/* ADMIN BUTTONS */}
        {isAdmin && (
          <motion.div
            className="flex justify-center gap-4 mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <button
              onClick={openAddModal}
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
                    onClick={() => openEditModal(exp)}
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