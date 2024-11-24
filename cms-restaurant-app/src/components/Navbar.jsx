import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

export default function Navbar({ base_url }) {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.clear();
    navigate("/login");
  }

  return (
    <nav className="w-full bg-gradient-to-br from-green-400 to-green-800 text-white p-4 shadow-lg flex items-center justify-between">
      <h1 className="text-lg font-bold">East Mountain Avenue</h1>
      {/* Logout */}
      <a className="flex items-center hover:shadow-md hover:shadow-orange-400 hover:bg-gradient-to-r from-amber-700 to-amber-500 p-2 mb-2 rounded-md cursor-pointer" onClick={handleLogout}>
        <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
        Logout
      </a>
    </nav>
  );
}
