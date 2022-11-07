import { useMemo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { resetCart } from "../../features/cartSlice";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import moneyFormatter from "../../utils/moneyFormatter";
import CartItem from "../../components/CartItem";
import { deleteUser } from "../../features/userSlice";

const Cart = () => {
  const myCart = useSelector((state) => state.cart.items);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const subtotal = useMemo(() => {
    let total = 0;
    myCart.forEach((item) => {
      if (item.productDiscount > 0) {
        const cuttedPrice =
          ((item.productPrice * item.productDiscount) / 100) * item.qty;
        total += item.subtotal - cuttedPrice;
      } else {
        total += item.productPrice * item.qty;
      }
    });
    return total;
  }, [myCart]);

  useEffect(() => {
    if (user.token === null) {
      return navigate("/login");
    }
  }, []);

  return (
    <div className="container mt-5">
      <h3>Cart</h3>
      {myCart.length === 0 && (
        <div className="alert alert-warning my-3">
          No items in your cart. Let's
          <Link className="alert-link" to="/">
            shopping now
          </Link>
        </div>
      )}
      <table className="table table-borderless my-4">
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Discount</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {myCart.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <CartItem product={item} />
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mb-5 text-end">
        <strong>Subtotal: {moneyFormatter(subtotal)}</strong>
      </p>

      <Formik
        initialValues={{
          name: "",
          city: "",
          province: "",
          phone: "",
          address: "",
        }}
        validationSchema={Yup.object({
          name: Yup.string()
            .min(3, "Name must be 3 length")
            .required("Name is required"),
          city: Yup.string().required("Name is required"),
          province: Yup.string().required("Name is required"),
          address: Yup.string()
            .required("Name is required")
            .min(10, "Address must be 10 length"),
          phone: Yup.number()
            .required("Name is required")
            .min(10, "Phone must be 10 length"),
        })}
        onSubmit={(values, { setSubmitting }) => {
          axios
            .post(
              "/sales",
              {
                userId: user.id,
                shipping: {
                  name: values.name,
                  phone: values.phone,
                  city: values.city,
                  province: values.province,
                  address: values.address,
                },
                items: myCart,
              },
              {
                headers: {
                  authorization: user.token,
                },
              }
            )
            .then((response) => {
              dispatch(resetCart());
              navigate("/order");
            })
            .catch((e) => {
              if (e.response.status === 401) {
                dispatch(deleteUser());
                document.location.href = "/login";
              }
              console.log(e);
            });
          setSubmitting(false);
        }}
      >
        <Form>
          <div className="row mb-4">
            <div className="col-md-6">
              <div className="mb-3">
                <label>Name</label>
                <Field className="form-control" name="name" />
                <ErrorMessage name="name">
                  {(msg) => <span className="text-danger mt-1">{msg}</span>}
                </ErrorMessage>
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label>Address</label>
                <Field as="textarea" className="form-control" name="address" />
                <ErrorMessage name="address">
                  {(msg) => <span className="text-danger mt-1">{msg}</span>}
                </ErrorMessage>
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label>Phone</label>
                <Field type="number" className="form-control" name="phone" />
                <ErrorMessage name="phone">
                  {(msg) => <span className="text-danger mt-1">{msg}</span>}
                </ErrorMessage>
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label>City</label>
                <Field className="form-control" name="city" />
                <ErrorMessage name="city">
                  {(msg) => <span className="text-danger mt-1">{msg}</span>}
                </ErrorMessage>
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label>Province</label>
                <Field className="form-control" name="province" />
                <ErrorMessage name="province">
                  {(msg) => <span className="text-danger mt-1">{msg}</span>}
                </ErrorMessage>
              </div>
            </div>
          </div>
          <button className="btn btn-success">Checkout</button>
        </Form>
      </Formik>
    </div>
  );
};

export default Cart;
