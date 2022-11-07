import { useMemo } from "react";
import { Outlet } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteUser } from "../../features/userSlice";

const User = () => {
  const cart = useSelector((state) => state.cart.items);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const totalItem = useMemo(() => {
    let count = 0;
    if (cart.length > 0) {
      cart.forEach((item) => (count += parseInt(item.qty)));
    }
    return count;
  }, [cart]);

  const handleLogout = () => {
    dispatch(deleteUser());
    document.location.href = "/login";
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-success navbar-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            React
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              {user.token !== null && (
                <li className="nav-item position-relative">
                  <span className="badge bg-danger position-absolute left-0 top-0">
                    {totalItem}
                  </span>
                  <Link className="nav-link" to="/cart">
                    <FaShoppingCart style={{ width: "35px" }} />
                  </Link>
                </li>
              )}
              {user.isAdmin && (
                <li className="nav-item">
                  <Link className="text-decoration-none text-white" to="/admin">
                    Dashboard
                  </Link>
                </li>
              )}
              <li className="nav-item">
                {user.token === null ? (
                  <Link to="/login" className="text-white text-decoration-none">
                    Login
                  </Link>
                ) : (
                  <button className="btn btn-danger" onClick={handleLogout}>
                    Logout
                  </button>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <main>
        <Outlet />
      </main>
    </>
  );
};

export default User;
