import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaCheck } from "react-icons/fa";
import Loading from "../../components/Loading";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const getData = () => {
    axios
      .get("/sales")
      .then((response) => {
        setOrders(response.data);
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

  const handleAccept = (id) => {
    axios
      .put(`/sales/${id}`)
      .then((response) => {
        getData();
      })
      .catch((e) => console.log(e));
  };

  return (
    <>
      {loading && <Loading />}
      <h3 className="p-3 bg-white shadow">Orders</h3>
      <div className="p-3 bg-white my-3 shadow">
        <div className="table-responsive">
          <table className="table table-striped mt-4">
            <thead>
              <tr>
                <th>No</th>
                <th>Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 &&
                orders.map((order, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{order.createdAt}</td>
                    <td>
                      {order.accepted ? "Approval" : "Waiting for approval"}
                    </td>
                    <td>
                      <div className="btn-group">
                        {order.accepted ? (
                          <FaCheck className="text-success" />
                        ) : (
                          <button
                            className="btn btn-success"
                            onClick={() => handleAccept(order.id)}
                          >
                            <FaCheck />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {orders.length === 0 && (
          <div className="alert alert-warning">No orders</div>
        )}
      </div>
    </>
  );
};

export default Orders;
