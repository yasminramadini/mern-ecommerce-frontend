import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";
import { addToCart } from "../../features/cartSlice";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import WithReactContent from "sweetalert2-react-content";
import Loading from "../../components/Loading";
import moneyFormatter from "../../utils/moneyFormatter";
import countDiscount from "../../utils/countDiscount";

const ProductDetail = () => {
  const params = useParams();
  const user = localStorage.getItem("user");
  const dispatch = useDispatch();
  const [product, setProduct] = useState({
    name: "",
    price: 0,
    stock: 0,
    description: "",
    discount: "",
    image_path: "",
    category: {
      name: "",
    },
  });
  const [loading, setLoading] = useState(true);
  const qtyRef = useRef();
  const MySwal = WithReactContent(Swal);

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        productId: product.id,
        productName: product.name,
        qty: qtyRef.current.value,
        productPrice: product.price,
        productDiscount: product.discount,
        subtotal: product.price * qtyRef.current.value,
        productImage: product.image_path,
      })
    );
    MySwal.fire({
      toast: true,
      position: "bottom-right",
      timer: 3000,
      timerProgressBar: false,
      showConfirmButton: false,
      icon: "success",
      title: "Product is added to cart",
    });
  };

  useEffect(() => {
    axios
      .get(`/products/slug/${params.slug}`)
      .then((response) => {
        setLoading(false);
        setProduct(response.data);
      })
      .catch((e) => {
        setLoading(false);
        console.log(e);
      });
  }, []);

  return (
    <div className="container-fluid">
      {loading && <Loading />}
      <div className="row g-4 mt-5">
        <div className="col-md-6">
          <img
            src={product.image_path}
            crossOrigin="anonymous"
            width={400}
            className="d-block mx-auto"
          />
        </div>
        <div className="col-md-6">
          <h3>{product.name}</h3>
          <span
            className={
              product.discount !== 0
                ? "text-muted text-small text-decoration-line-through"
                : "text-success"
            }
          >
            {moneyFormatter(product.price)}
          </span>
          {product.discount !== 0 ? (
            <span className="text-success fs-4 ms-3">
              {countDiscount(product.price, product.discount)}
            </span>
          ) : null}
          <hr />
          <p>{product.description}</p>
          <hr />
          <div className="row">
            <div className="col-6">Stock</div>
            <div className="col-6">{product.stock}</div>
            <div className="col-6">Category</div>
            <div className="col-6">{product.category.name}</div>
            <div className="col-6">
              {!user ? (
                <Link to="/login">Please login to add this product</Link>
              ) : (
                <div className="input-group mt-5">
                  <input type="number" className="form-control" ref={qtyRef} />
                  <button className="btn btn-success" onClick={handleAddToCart}>
                    Add to cart
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
