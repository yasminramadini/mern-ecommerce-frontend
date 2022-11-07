import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import Swal from "sweetalert2";
import WithReactContent from "sweetalert2-react-content";
import Loading from "../../components/Loading";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState("");
  const MySwal = WithReactContent(Swal);

  const getData = () => {
    axios
      .get("/categories")
      .then((response) => {
        setCategories(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const handleDelete = (id) => {
    if (confirm("Are you sure?")) {
      setLoading(true);
      axios
        .delete(`/categories/${id}`)
        .then((response) => {
          setLoading(false);
          MySwal.fire({
            toast: true,
            position: "bottom-right",
            timer: 3000,
            timerProgressBar: false,
            showConfirmButton: false,
            icon: "success",
            title: "Data has been deleted",
          });
          getData();
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .get(`/categories?keyword=${keyword}`)
      .then((response) => {
        setLoading(false);
        setCategories(response.data);
        console.log(categories);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  return (
    <>
      {loading && <Loading />}
      <h3 className="p-3 bg-white shadow">Categories</h3>
      <div className="p-3 bg-white my-3 shadow">
        <div className="btn-group">
          <Link to="/admin/categories/add" className="btn btn-success">
            Add category
          </Link>
        </div>
        <div className="row mt-3">
          <div className="col-md-6">
            <form onSubmit={handleSearch}>
              <div className="input-group">
                <input
                  type="search"
                  className="form-control"
                  defaultValue={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                />
                <button className="btn btn-success">
                  <FaSearch />
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="table-responsive">
          <table className="table table-striped mt-4">
            <thead>
              <tr>
                <th>No</th>
                <th>Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {categories.length > 0 &&
                categories.map((category, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{category.name}</td>
                    <td>
                      <div className="btn-group">
                        <Link
                          to={`/admin/categories/edit/${category.id}`}
                          className="btn btn-warning"
                        >
                          <FaEdit />
                        </Link>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleDelete(category.id)}
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {categories.length === 0 && (
          <div className="alert alert-warning">No categories</div>
        )}
      </div>
    </>
  );
};

export default Category;
