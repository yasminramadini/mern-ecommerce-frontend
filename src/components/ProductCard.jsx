import moneyFormatter from "../utils/moneyFormatter";
import countDiscount from "../utils/countDiscount";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <div className="card">
      <div className="card-header position-relative">
        <span className="bg-dark position-absolute text-white p-2 top-0 left-0 opacity-75">
          {product.category.name}
        </span>
        <img
          src={product.image_path}
          crossOrigin="anonymous"
          className="card-img-top"
          style={{ objectFit: "cover" }}
          width={200}
          height={200}
          alt={product.name}
        />
      </div>
      <div className="card-body">
        <h5 className="card-title">{product.name}</h5>
        <div className="d-flex justify-content-between">
          {product.discount !== 0 ? (
            <span className="text-success">
              {countDiscount(product.price, product.discount)}
            </span>
          ) : null}
          <p
            className={
              product.discount !== 0
                ? "text-muted text-small text-decoration-line-through"
                : "text-success"
            }
          >
            {moneyFormatter(product.price)}
          </p>
        </div>
        <Link to={`/product/${product.slug}`} className="btn btn-success">
          See detail
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
