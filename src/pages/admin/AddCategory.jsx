import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import WithReactContent from "sweetalert2-react-content";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser } from "../../features/userSlice";

const AddCategory = () => {
  const user = useSelector((state) => state.user.user);
  const [errorName, setErrorName] = useState("");
  const MySwal = WithReactContent(Swal);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <>
      <h3 className="p-3 bg-white shadow">Add Category</h3>
      <section className="bg-white p-3 shadow my-3 g-3">
        <Formik
          initialValues={{ name: "" }}
          validationSchema={Yup.object({
            name: Yup.string()
              .min(3, "Name must be 3 length")
              .required("Name is required"),
          })}
          onSubmit={(values, { setSubmitting }) => {
            axios
              .post(
                "/categories",
                {
                  name: values.name,
                },
                {
                  headers: {
                    authorization: user.token,
                  },
                }
              )
              .then((response) => {
                MySwal.fire({
                  toast: true,
                  position: "bottom-right",
                  timer: 3000,
                  timerProgressBar: false,
                  showConfirmButton: false,
                  icon: "success",
                  title: "Data has been saved",
                });
                navigate("/admin/categories");
              })
              .catch((e) => {
                if (e.response.status === 401) {
                  dispatch(deleteUser());
                  document.location.href = "/login";
                }

                const errors = e.response.data;
                errors.map((e) => {
                  if (e.field === "name") {
                    setErrorName(e.msg);
                  }
                });
              });
            setSubmitting(false);
          }}
        >
          <Form>
            <div className="row g-4">
              <div className="col-md-6">
                <p>
                  <strong className="mb-3">META DATA</strong>
                </p>
                <div className="mb-3">
                  <label>
                    Name <span className="text-danger ms-1">*</span>
                  </label>
                  <Field type="text" className="form-control" name="name" />
                  <ErrorMessage name="name">
                    {(msg) => <span className="text-danger mt-1">{msg}</span>}
                  </ErrorMessage>
                  {errorName && <p className="text-danger mt-1">{errorName}</p>}
                </div>
              </div>
            </div>
            <button className="btn btn-success" type="submit">
              Save
            </button>
          </Form>
        </Formik>
      </section>
    </>
  );
};

export default AddCategory;
