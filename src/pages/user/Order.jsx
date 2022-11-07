import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import Loading from "../../components/Loading";
import moneyFormatter from "../../utils/moneyFormatter.js";
import dateFormatter from "../../utils/dateFormatter.js";
import { useNavigate } from "react-router-dom";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      return navigate("/login");
    }

    axios
      .get(`/sales/${user.id}`)
      .then((response) => {
        setOrders(response.data);
        setLoading(false);
        console.log(response.data);
        console.log(orders);
      })
      .catch((e) => {
        setLoading(false);
        console.log(e);
      });
  }, []);

  return (
    <>
      {loading && <Loading />}
      <div className="container my-5">
        <h3 className="mb-4">My Orders</h3>
        {orders.map((order, index) => (
          <div key={index} className="mt-5">
            <p>
              <strong>Order at {dateFormatter(order.createdAt)}</strong>
            </p>
            <table className="table mt-3 table-borderless mt-4">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Qty</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td className="d-flex gap-3">
                      <img
                        crossOrigin="anonynous"
                        src={
                          "http://localhost:8080/images/" + item.product.image
                        }
                        alt=""
                        width={80}
                      />
                      <p>{item.product.name}</p>
                    </td>
                    <td>{moneyFormatter(item.price)}</td>
                    <td>{item.qty}</td>
                    <td>{moneyFormatter(item.subtotal)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="d-flex justify-content-between">
              <p>
                Status:
                <span
                  className={`ms-2 badge ${
                    order.accepted ? "bg-success" : "bg-danger"
                  }`}
                >
                  {order.accepted ? "In the process" : "Waiting for approval"}
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Order;
