import { Link } from "react-router-dom";

const Navbar = (props) => {
  const { setUser, user, fetchMyRoutines, fetchActivities } = props;
  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };
  return (
    <>
      <Link to="/">Home |</Link>
      {user && (
        <Link
          to="/my-routines"
          onClick={() => {
            fetchMyRoutines();
          }}
        >
          My Routines |
        </Link>
      )}
      <Link to="/routines">Routines |</Link>
      <Link
        to="/activities"
        onClick={() => {
          fetchActivities();
        }}
      >
        Activities |
      </Link>
      {!user && (
        <>
          <Link to="/login">Login |</Link>
          <Link to="/register">Register |</Link>
        </>
      )}
      {user && (
        <Link to="/" onClick={handleLogout}>
          Logout |
        </Link>
      )}
    </>
  );
};

export default Navbar;
