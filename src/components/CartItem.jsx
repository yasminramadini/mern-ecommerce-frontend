import { useDispatch } from "react-redux";
import { addQty, minusQty, deleteItem } from "../features/cartSlice";
import moneyFormatter from "../utils/moneyFormatter";

const CartItem = ({ product }) => {
  const dispatch = useDispatch();
  const subtotalAfterDiscount = (subtotal, discount) => {
    const cuttedPrice = (subtotal * discount) / 100;
    return moneyFormatter(subtotal - cuttedPrice);
  };

  const handleAddQty = () => {
    dispatch(addQty({ id: product.productId }));
  };

  return (
    <>
      <td className="d-flex gap-3">
        <img
          src={product.productImage}
          crossOrigin="anonymous"
          alt={product.productName}
          width={80}
        />
        <span>{product.productName}</span>
      </td>
      <td>
        <div className="input-group">
          <button
            className="btn btn-success"
            disabled={product.qty === 1 ? true : false}
            onClick={() => dispatch(minusQty({ id: product.productId }))}
          >
            -
          </button>
          <input
            type="number"
            className="form-control"
            width="20px"
            value={product.qty}
            readOnly
          />
          <button className="btn btn-success" onClick={handleAddQty}>
            +
          </button>
        </div>
      </td>
      <td>{moneyFormatter(product.productPrice)}</td>
      <td>{product.productDiscount}%</td>
      <td>
        {product.productDiscount === 0
          ? moneyFormatter(product.subtotal)
          : subtotalAfterDiscount(product.subtotal, product.productDiscount)}
      </td>
      <td>
        <button
          className="btn btn-danger"
          onClick={() => dispatch(deleteItem({ id: product.productId }))}
        >
          x
        </button>
      </td>
    </>
  );
};

export default CartItem;
