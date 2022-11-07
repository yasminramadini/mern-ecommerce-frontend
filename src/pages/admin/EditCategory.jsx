import { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import WithReactContent from "sweetalert2-react-content";
import Loading from "../../components/Loading";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser } from "../../features/userSlice";

const EditCategory = () => {
  const user = useSelector((state) => state.user.user);
  const [category, setCategory] = useState({});
  const [errorName, setErrorName] = useState("");
  const [loading, setLoading] = useState(true);
  const MySwal = WithReactContent(Swal);
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`/categories//${params.id}`)
      .then((response) => {
        setCategory(response.data);
        setLoading(false);
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  return (
    <>
      {loading && <Loading />}
      <h3 className="p-3 bg-white shadow">Add Category</h3>
      <section className="bg-white p-3 shadow my-3 g-3">
        <Formik
          enableReinitialize
          initialValues={{ name: category.name }}
          validationSchema={Yup.object({
            name: Yup.string()
              .min(3, "Name must be 3 length")
              .required("Name is required"),
          })}
          onSubmit={(values, { setSubmitting }) => {
            axios
              .put(
                `/categories/${category.id}`,
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
                  title: "Data has been updated",
                });
                navigate("/admin/categories");
              })
              .catch((e) => {
                const errors = e.response.data;
                errors.map((e) => {
                  if (e.response.status === 401) {
                    dispatch(deleteUser());
                    document.location.href = "/login";
                  }

                  if (e.response.status === 401) {
                    dispatch(deleteUser());
                    return navigate("/login");
                  }

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
              Update
            </button>
          </Form>
        </Formik>
      </section>
    </>
  );
};

export default EditCategory;
