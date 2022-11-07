import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../features/userSlice";
import illustration from "../../assets/illustration.svg";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

const Login = () => {
  const [errorLogin, setErrorLogin] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  });

  return (
    <div className="container mt-5">
      <div className="row g-4">
        <div className="col-md-6">
          <img
            src={illustration}
            width="30%"
            alt=""
            className="d-block mx-auto"
          />
        </div>
        <div className="col-md-6">
          <h3 className="text-center mb-3">Login</h3>
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={Yup.object({
              email: Yup.string()
                .email("Email is not valid")
                .required("email is required"),
              password: Yup.string()
                .min(8, "Password must be 8 length")
                .required("Password is required")
                .matches(
                  /[a-zA-Z]/g,
                  "Password must contains lowercase and uppercase"
                ),
            })}
            onSubmit={(values, { setSubmitting }) => {
              setErrorLogin("");
              axios
                .post("/auth/login", {
                  email: values.email,
                  password: values.password,
                })
                .then((response) => {
                  navigate("/");
                  dispatch(
                    setUser({
                      id: response.data.user.id,
                      name: response.data.user.name,
                      isAdmin: response.data.user.isAdmin,
                      token: response.data.token,
                    })
                  );
                })
                .catch((e) => {
                  const errors = e.response.data;
                  if (errors.field === "login") {
                    setErrorLogin(errors.msg);
                  }
                });
              setSubmitting(false);
            }}
          >
            <Form>
              {errorLogin && (
                <div className="alert alert-danger mb-3">{errorLogin}</div>
              )}
              <div className="mb-3">
                <label>Email</label>
                <Field type="email" className="form-control" name="email" />
                <ErrorMessage name="email">
                  {(msg) => <span className="text-danger mt-1">{msg}</span>}
                </ErrorMessage>
              </div>
              <div className="mb-3">
                <label>Password</label>
                <Field
                  type="password"
                  className="form-control"
                  name="password"
                />
                <ErrorMessage name="password">
                  {(msg) => <span className="text-danger mt-1">{msg}</span>}
                </ErrorMessage>
              </div>
              <button
                className="btn btn-success d-block w-100 mt-4"
                type="submit"
              >
                Login
              </button>
              <p className="mt-4">
                Don't have an account?
                <Link to="/register" className="mt-4 ms-1 text-success">
                  Register here
                </Link>
              </p>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Login;
