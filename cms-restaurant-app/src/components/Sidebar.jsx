import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUtensils, faTags, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-gradient-to-tr from-green-800 to-green-400 text-white p-4 shadow-lg min-h-full">
      {/* Logo */}
      <div className="mb-6 text-center">
        <img src="../src/components/assets/images/logo.png" alt="East Mountain Avenue Logo" className="w-24 h-auto mx-auto" />
      </div>
      <hr className="my-3" />
      {/* Menu */}
      <ul>
        {/* Cuisines */}
        <li className="hover:shadow-md hover:shadow-orange-400 hover:bg-gradient-to-r from-amber-700 to-amber-500 p-2 mb-2">
          <Link to="/" className="flex items-center">
            <FontAwesomeIcon icon={faUtensils} className="mr-2" />
            Cuisines
          </Link>
        </li>

        {/* Categories */}
        <li className="hover:shadow-md hover:shadow-orange-400 hover:bg-gradient-to-r from-amber-700 to-amber-500 p-2 mb-2">
          <Link to="/categories" className="flex items-center">
            <FontAwesomeIcon icon={faTags} className="mr-2" />
            Categories
          </Link>
        </li>

        {/* Account Section */}
        <h2 className="text-lg font-bold mt-4 mb-2">ACCOUNT</h2>

        {/* Add User */}
        <li className="hover:shadow-md hover:shadow-orange-400 hover:bg-gradient-to-r from-amber-700 to-amber-500 p-2 mb-2">
          <Link to="/register" className="flex items-center">
            <FontAwesomeIcon icon={faUserPlus} className="mr-2" />
            Add User
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
