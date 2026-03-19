import { useNavigate } from "react-router-dom";

function BackNavigation() {

  const navigate = useNavigate();

  function goBackToWorks() {
    navigate("/");
    setTimeout(() => {
      document.getElementById("works")?.scrollIntoView({ behavior: "smooth" });
    }, 150);
  }

  return (
    <div className="flex gap-4 mb-10">

      <button
        onClick={goBackToWorks}
        className="px-4 py-2 bg-purple-500/20 border border-purple-500/40 rounded-lg hover:bg-purple-500/40 transition"
      >
        ← Back
      </button>

      <button
        onClick={() => navigate("/")}
        className="px-4 py-2 bg-purple-500/20 border border-purple-500/40 rounded-lg hover:bg-purple-500/40 transition"
      >
        Dashboard
      </button>

    </div>
  );
}

export default BackNavigation;