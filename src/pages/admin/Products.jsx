import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";
import Loading from "../../components/Loading";
import moneyFormatter from "../../utils/moneyFormatter";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const getProducts = () => {
    axios
      .get("/products")
      .then((response) => {
        setLoading(false);
        setProducts(response.data);
      })
      .catch((e) => {
        setLoading(false);
        console.log(e);
      });
  };

  useEffect(() => {
    getProducts();
  }, []);

  const handleDelete = (id) => {
    if (confirm("Are you sure?")) {
      setLoading(true);
      axios
        .delete(`/products/${id}`)
        .then((response) => {
          setLoading(false);
          getProducts();
        })
        .catch((e) => {
          setLoading(false);
          console.log(e);
        });
    }
  };

  return (
    <>
      {loading && <Loading />}
      <h3 className="p-3 bg-white shadow">Products</h3>
      <div className="p-3 bg-white my-3 shadow">
        <Link to="/admin/products/add" className="btn btn-success">
          Add product
        </Link>
        <div className="table-responsive">
          <table className="table table-striped mt-4">
            <thead>
              <tr>
                <th>No</th>
                <th>Name</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.length > 0 &&
                products.map((product, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td className="d-flex gap-3">
                      <img
                        crossOrigin="anonymous"
                        src={`http://localhost:8080/images/${product.image}`}
                        alt=""
                        width={70}
                      />
                      {product.name}
                    </td>
                    <td>{moneyFormatter(product.price)}</td>
                    <td>{product.stock}</td>
                    <td>
                      <div className="btn-group">
                        <Link
                          to={`/admin/products/edit/${product.id}`}
                          className="btn btn-warning"
                        >
                          <FaEdit />
                        </Link>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleDelete(product.id)}
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

        {products.length === 0 && (
          <div className="alert alert-warning">No products</div>
        )}
      </div>
    </>
  );
};

export default Products;
