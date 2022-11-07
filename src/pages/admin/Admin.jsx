import React, { useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteUser } from "../../features/userSlice";

const admin = () => {
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user.token === null) {
      return navigate("/login");
    } else if (!user.isAdmin) {
      return navigate("/");
    }
  }, []);

  const handleLogout = () => {
    dispatch(deleteUser());
    document.location.href = "/login";
  };

  return (
    <section>
      {/* header */}
      <header className="navbar navbar-dark bg-success fixed-top flex-md-nowrap p-2 shadow">
        <a href="#" className="navbar-brand col-md 3 col-lg-2 me-0 px-3 fs-6">
          React
        </a>
        <button
          className="navbar-toggler d-md-none collapsed ms-3"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#sidebarMenu"
        >
          <FaBars />
        </button>
        <div className="navbar-nav d-none d-md-block">
          <div className="nav-item text-nowrap">
            <button className="btn btn-danger px-3 me-3" onClick={handleLogout}>
              logout
            </button>
          </div>
        </div>
      </header>
      {/* end header */}

      <div
        className="container-fluid"
        style={{ background: "#ddd", minHeight: "100vh" }}
      >
        <div className="row">
          <nav
            id="sidebarMenu"
            className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse bg-dark text-white position-fixed"
            style={{ minHeight: "100vh", paddingTop: "50px", zIndex: "100" }}
          >
            <div className="pt-3 sidebar-sticky">
              <div className="d-flex gap-3 align-items-center py-2 border-bottom border-secondary">
                <div
                  className="bg-secondary rounded-circle"
                  style={{ width: "45px", height: "45px" }}
                ></div>
                <div>
                  <p className="mb-1">{user.name}</p>
                  <p className="text-muted">Administrator</p>
                </div>
              </div>
              <ul className="nav flex-column mt-4">
                <li className="nav-item">
                  <Link to="/admin" className="nav-link text-white">
                    Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/admin/products" className="nav-link text-white">
                    Products
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/admin/categories" className="nav-link text-white">
                    Categories
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/admin/orders" className="nav-link text-white">
                    Orders
                  </Link>
                </li>
              </ul>
            </div>
          </nav>

          <main
            className="col-md-9 ms-sm-auto col-lg-10 px-md-4"
            style={{ paddingTop: "80px" }}
          >
            <Outlet />
          </main>
        </div>
      </div>
    </section>
  );
};

export default admin;
