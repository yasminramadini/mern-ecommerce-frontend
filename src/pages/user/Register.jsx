import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import illustration from "../../assets/illustration.svg";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

const Register = () => {
  const [errorEmail, setErrorEmail] = useState("");
  const navigate = useNavigate();

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
            className="d-block mr-auto"
          />
        </div>
        <div className="col-md-6">
          <h3 className="text-center mb-3">Register</h3>
          <Formik
            initialValues={{ email: "", name: "", password: "" }}
            validationSchema={Yup.object({
              email: Yup.string()
                .email("Email is not valid")
                .required("email is required"),
              name: Yup.string()
                .min(3, "Name must be 3 length")
                .required("Name is required"),
              password: Yup.string()
                .min(8, "Password must be 8 length")
                .required("Password is required")
                .matches(
                  /[a-zA-Z]/g,
                  "Password must contains lowercase and uppercase"
                ),
            })}
            onSubmit={(values, { setSubmitting }) => {
              setErrorEmail("");
              axios
                .post("/auth/register", {
                  email: values.email,
                  name: values.name,
                  password: values.password,
                })
                .then((response) => {
                  navigate("/login");
                })
                .catch((e) => {
                  const errors = e.response.data;
                  errors.map((e) => {
                    if (e.field === "email") {
                      setErrorEmail(e.msg);
                    }
                  });
                });
              setSubmitting(false);
            }}
          >
            <Form>
              <div className="mb-3">
                <label>Email</label>
                <Field type="email" className="form-control" name="email" />
                <ErrorMessage name="email">
                  {(msg) => <span className="text-danger mt-1">{msg}</span>}
                </ErrorMessage>
                {errorEmail && <p className="text-danger mt-1">{errorEmail}</p>}
              </div>
              <div className="mb-3">
                <label>Name</label>
                <Field className="form-control" name="name" />
                <ErrorMessage name="name">
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
                Register
              </button>
              <p className="mt-4">
                Already have an account?{" "}
                <Link to="/login" className="mt-4">
                  Login here
                </Link>
              </p>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Register;
