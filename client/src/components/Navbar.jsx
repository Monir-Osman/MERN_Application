import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
function Navbar() {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
  };
  return (
    <header>
      <nav>
        <Link to="/">
          <h1>Workout Buddy</h1>
        </Link>

        <div>
          {user ? (
            <div>
              <span>{user.email}</span>
              <button className="logoutBtn" onClick={handleClick}>
                Log out
              </button>
            </div>
          ) : null}

          {!user ? (
            <div>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </div>
          ) : null}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
