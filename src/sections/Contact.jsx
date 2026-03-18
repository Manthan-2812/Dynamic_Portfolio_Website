import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Globe } from "lucide-react";

function Contact() {
  return (
    <section
      id="contact"
      className="min-h-screen flex items-center justify-center px-6"
    >
      <motion.div
        className="max-w-4xl w-full"
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >

        <h2 className="text-4xl md:text-5xl font-bold text-purple-400 mb-12 text-center">
          Get In Touch
        </h2>

        {/* Glassmorphic Contact Card */}
        <motion.div
          className="backdrop-blur-md bg-white/10 border border-purple-500/30 rounded-2xl p-8 shadow-2xl hover:shadow-purple-500/20 transition-all duration-300"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >

          <div className="grid md:grid-cols-2 gap-8">
            
            {/* Left Column - Contact Info */}
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-purple-300 mb-4">
                Let's Connect
              </h3>
              
              <p className="text-gray-300 leading-relaxed">
                I'm always open to discussing new opportunities, interesting projects, or just having a chat about technology and finance. Feel free to reach out!
              </p>

              {/* Contact Items */}
              <div className="space-y-4">
                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center group-hover:bg-purple-500/30 transition-colors">
                    <Mail className="w-5 h-5 text-purple-300" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Email</p>
                    <p className="text-white font-medium">manthanparekh9d@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Social Links */}
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-purple-300 mb-4">
                Find Me Online
              </h3>
              
              <p className="text-gray-300 leading-relaxed">
                Connect with me on professional networks or check out my latest projects and contributions.
              </p>

              {/* Social Links */}
              <div className="space-y-4">
                <a
                  href="https://github.com/Manthan-2812"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all group"
                >
                  <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center group-hover:bg-gray-700 transition-colors">
                    <Github className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-medium">GitHub</p>
                    <p className="text-sm text-gray-400">github.com/Manthan-2812</p>
                  </div>
                </a>

                <a
                  href="https://www.linkedin.com/in/manthanparekh2805/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all group"
                >
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center group-hover:bg-blue-500 transition-colors">
                    <Linkedin className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-medium">LinkedIn</p>
                    <p className="text-sm text-gray-400">linkedin.com/in/manthanparekh2805</p>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="mt-8 pt-8 border-t border-purple-500/30 text-center">
            <p className="text-gray-300 mb-4">
              Looking forward to hearing from you! 🚀
            </p>
            <a
              href="https://mail.google.com/mail/?view=cm&to=manthanparekh9d@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-purple-600/80 hover:bg-purple-600 px-6 py-3 rounded-lg font-medium transition-colors"
            >
              <Mail className="w-4 h-4" />
              Send Me an Email
            </a>
          </div>

        </motion.div>

      </motion.div>
    </section>
  );
}

export default Contact;