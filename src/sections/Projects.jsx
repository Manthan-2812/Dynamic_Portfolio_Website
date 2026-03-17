import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import api from "../utils/api";

const emptyForm = { name: "", description: "", repo: "", website: "", collaborators: "" };

function Projects() {

  const isAdmin = !!localStorage.getItem("token");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [projects, setProjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const fetchProjects = async () => {
    const res = await api.get("/projects");
    setProjects(res.data);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  function openAddModal() {
    setEditingProject(null);
    setForm(emptyForm);
    setShowModal(true);
  }

  function openEditModal(project) {
    setEditingProject(project);
    setForm({ name: project.name || "", description: project.description || "", repo: project.repo || "", website: project.website || "", collaborators: project.collaborators || "" });
    setShowModal(true);
  }

  async function handleSubmit() {
    if (!form.name || !form.description || !form.repo) return;
    if (editingProject) {
      await api.put(`/projects/${editingProject._id}`, form);
    } else {
      await api.post("/projects", form);
    }
    setShowModal(false);
    fetchProjects();
  }

  async function deleteProject(id) {
    await api.delete(`/projects/${id}`);
    fetchProjects();
  }

  return (
    <section
      id="projects"
      className="min-h-screen flex items-center justify-center px-6"
    >
      <div className="max-w-6xl w-full text-white">

        {/* TITLE */}

        <motion.h2
          className="text-4xl md:text-5xl font-bold text-purple-400 mb-12 text-center"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Projects
        </motion.h2>

        {/* MODAL */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="bg-[#1a1a2e] border border-purple-500/40 rounded-2xl p-8 w-full max-w-md shadow-2xl shadow-purple-500/20">
              <h3 className="text-xl font-bold text-purple-400 mb-6">{editingProject ? "Edit Project" : "Add Project"}</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-400 mb-1 block">Project Name *</label>
                  <input className="w-full bg-white/5 border border-purple-500/30 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-purple-400" placeholder="e.g. Portfolio Website" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                </div>
                <div>
                  <label className="text-sm text-gray-400 mb-1 block">Description *</label>
                  <textarea rows={3} className="w-full bg-white/5 border border-purple-500/30 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 resize-none" placeholder="Brief description..." value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
                </div>
                <div>
                  <label className="text-sm text-gray-400 mb-1 block">GitHub Repo *</label>
                  <input className="w-full bg-white/5 border border-purple-500/30 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-purple-400" placeholder="https://github.com/..." value={form.repo} onChange={e => setForm({ ...form, repo: e.target.value })} />
                </div>
                <div>
                  <label className="text-sm text-gray-400 mb-1 block">Live Website (optional)</label>
                  <input className="w-full bg-white/5 border border-purple-500/30 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-purple-400" placeholder="https://..." value={form.website} onChange={e => setForm({ ...form, website: e.target.value })} />
                </div>
                <div>
                  <label className="text-sm text-gray-400 mb-1 block">Collaborators</label>
                  <input className="w-full bg-white/5 border border-purple-500/30 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-purple-400" placeholder="Names (optional)" value={form.collaborators} onChange={e => setForm({ ...form, collaborators: e.target.value })} />
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button onClick={handleSubmit} className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg font-medium transition-colors">{editingProject ? "Save Changes" : "Add Project"}</button>
                <button onClick={() => setShowModal(false)} className="flex-1 bg-white/5 hover:bg-white/10 text-gray-300 py-2 rounded-lg font-medium transition-colors">Cancel</button>
              </div>
            </div>
          </div>
        )}

        {/* ADMIN ADD BUTTON */}
        {isAdmin && (
          <motion.div
            className="flex justify-center mb-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <button
              onClick={openAddModal}
              className="bg-green-600/80 px-4 py-2 rounded-lg text-white font-medium hover:bg-green-600 transition-colors"
            >
              Add Project
            </button>
          </motion.div>
        )}

        {/* PROJECT CAROUSEL */}

        <div className="relative">
          {/* Carousel Container */}
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 50}%)` }}
            >
              {projects.map((project, index) => (
                <div key={project._id} className="w-full md:w-1/2 flex-shrink-0 px-2">
                  <motion.div
                    className="backdrop-blur-md bg-white/5 border border-purple-500/30 rounded-xl p-8 shadow-lg hover:shadow-purple-500/30 transition-all h-full"
                    initial={{ opacity: 0, y: 80 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >

                    <h3 className="text-xl font-semibold text-purple-300 mb-4">
                      {project.name}
                    </h3>

                    {project.collaborators && (
                      <p className="text-sm text-gray-400 mb-2">
                        Collaborators: {project.collaborators}
                      </p>
                    )}

                    <p className="text-gray-300 mb-6 leading-relaxed">
                      {project.description}
                    </p>

                    <div className="flex gap-4">

                      <a
                        href={project.repo}
                        target="_blank"
                        className="text-sm bg-purple-500/20 px-4 py-2 rounded-md hover:bg-purple-500/40 transition"
                      >
                        GitHub
                      </a>

                      {project.website && (
                        <a
                          href={project.website}
                          target="_blank"
                          className="text-sm bg-purple-500/20 px-4 py-2 rounded-md hover:bg-purple-500/40 transition"
                        >
                          Live Demo
                        </a>
                      )}

                    </div>

                    {isAdmin && (
                      <div className="flex gap-3 mt-6">
                        <button
                          onClick={() => openEditModal(project)}
                          className="bg-blue-500 px-3 py-1 rounded text-white hover:bg-blue-600 transition-colors"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => deleteProject(project._id)}
                          className="bg-red-500 px-3 py-1 rounded text-white hover:bg-red-600 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    )}

                  </motion.div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          {projects.length > 2 && (
            <>
              <button
                onClick={() => setCurrentIndex(currentIndex === 0 ? projects.length - 2 : currentIndex - 1)}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-purple-600/80 text-white p-3 rounded-full hover:bg-purple-600 transition-colors shadow-lg z-10"
              >
                <ChevronLeft size={24} />
              </button>

              <button
                onClick={() => setCurrentIndex(currentIndex >= projects.length - 2 ? 0 : currentIndex + 1)}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-purple-600/80 text-white p-3 rounded-full hover:bg-purple-600 transition-colors shadow-lg z-10"
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}

          {/* Dots Indicator */}
          {projects.length > 2 && (
            <div className="flex justify-center mt-6 gap-2">
              {Array.from({ length: Math.ceil(projects.length / 2) }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index * 2)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    Math.floor(currentIndex / 2) === index ? 'bg-purple-400' : 'bg-purple-400/30'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

      </div>
    </section>
  );
}

export default Projects;