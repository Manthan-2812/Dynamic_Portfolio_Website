import { useContext } from "react";
import { AdminContext } from "../utils/AdminContext";

function AdminToggle() {

  const { isAdmin, setIsAdmin } = useContext(AdminContext);

  return (
    <button
      onClick={() => setIsAdmin(!isAdmin)}
      className="fixed bottom-6 right-6 bg-purple-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-purple-600 transition-colors z-50"
    >
      {isAdmin ? "Admin ON" : "Admin OFF"}
    </button>
  );
}

export default AdminToggle;