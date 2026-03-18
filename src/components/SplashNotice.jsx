import { useState } from "react";
import { X } from "lucide-react";

function SplashNotice() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
      <div className="bg-[#1a1a2e] border border-purple-500/40 rounded-2xl p-8 w-full max-w-md shadow-2xl shadow-purple-500/20 relative">

        {/* Close button */}
        <button
          onClick={() => setVisible(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>

        {/* Icon */}
        <div className="flex justify-center mb-5">
          <div className="w-14 h-14 bg-purple-500/20 rounded-full flex items-center justify-center text-2xl">
            ⏳
          </div>
        </div>

        {/* Heading */}
        <h2 className="text-xl font-bold text-purple-400 text-center mb-4">
          Quick Heads Up!
        </h2>

        {/* Message */}
        <p className="text-gray-300 text-center leading-relaxed text-sm">
          This website uses <span className="text-purple-300 font-semibold">Render's free backend</span>, which spins down after inactivity.
          On your <span className="text-white font-semibold">first visit</span>, it may take{" "}
          <span className="text-purple-300 font-semibold">30 – 50 seconds</span> to load data like projects, PDFs, and images.
          <br /><br />
          Please wait a moment and then start exploring. Thanks for your patience! 🙏
        </p>

        {/* CTA button */}
        <button
          onClick={() => setVisible(false)}
          className="mt-6 w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg font-medium transition-colors"
        >
          Got it, Let me explore!
        </button>

      </div>
    </div>
  );
}

export default SplashNotice;
