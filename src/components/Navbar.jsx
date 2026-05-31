import "./Navbar.css";
import { useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/");
  };

  return (
    <nav className="navbar">

  <h2>Job Portal</h2>

  <button
    className="logout-btn"
    onClick={handleLogout}
  >
    Logout
  </button>

</nav>
  );
}

export default Navbar;