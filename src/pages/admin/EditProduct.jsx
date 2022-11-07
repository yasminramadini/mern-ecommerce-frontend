import { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";
import Swal from "sweetalert2";
import WithReactContent from "sweetalert2-react-content";
import ImagePreview from "../../components/ImagePreview";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser } from "../../features/userSlice";

const EditProduct = () => {
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const params = useParams();
  const [categories, setCategories] = useState([]);
  const [product, setProduct] = useState({
    name: "",
    price: 0,
    discount: 0,
    description: "",
    image: null,
    categoryId: 0,
    stock: 0,
  });
  const VALID_FORMAT = ["image/jpg", "image/jpeg", "image/png"];
  const MySwal = WithReactContent(Swal);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get("/categories/")
      .then((response) => setCategories(response.data))
      .catch((e) => console.log(e));

    axios
      .get(`/products/${params.id}`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <>
      <h3 className="p-3 bg-white shadow">Edit Product</h3>
      <section className="bg-white p-3 shadow my-3 g-3">
        <Formik
          enableReinitialize
          initialValues={{
            name: product.name,
            categoryId: product.categoryId,
            price: product.price,
            stock: product.stock,
            description: product.description,
            discount: product.discount,
            image: null,
          }}
          validationSchema={Yup.object({
            name: Yup.string()
              .min(3, "Name must be 3 length")
              .required("Name is required"),
            categoryId: Yup.number().required("Category is required"),
            price: Yup.number()
              .min(1, "Price must be greater than 0")
              .required("Price is required"),
            stock: Yup.number()
              .min(1, "Stock must be greater than 0")
              .required("Stock is required"),
            description: Yup.string()
              .min(10, "Description must be 10 length")
              .required("Description is required"),
            image: Yup.mixed()
              .nullable()
              .test(
                "file_size",
                "Image size must be less than 1MB",
                (value) => !value || (value && value.size <= 1024 * 1024)
              )
              .test(
                "file_format",
                "Image format must be in jpg, jpeg, or png",
                (value) =>
                  !value || (value && VALID_FORMAT.includes(value.type))
              ),
          })}
          onSubmit={(values) => {
            axios
              .put(
                `/products/${params.id}`,
                {
                  name: values.name,
                  categoryId: values.categoryId,
                  price: values.price,
                  stock: values.stock,
                  discount: values.discount,
                  description: values.description,
                  image: values.image !== null ? values.image : null,
                  oldImage: product.image,
                },
                {
                  headers: {
                    "Content-Type": "multipart/form-data",
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
                console.log(response);
                navigate("/admin/products");
              })
              .catch((e) => {
                if (e.response.status === 401) {
                  dispatch(deleteUser());
                  document.location.href = "/login";
                }

                console.log(e);
              });
          }}
        >
          {({ values, setFieldValue }) => (
            <Form>
              <div className="row g-4">
                <div className="col-lg-6">
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
                  </div>
                  <div className="mb-3">
                    <label>
                      Category <span className="text-danger ms-1">*</span>
                    </label>
                    <Field
                      as="select"
                      className="form-control"
                      name="categoryId"
                    >
                      {categories.map((category, index) => (
                        <option key={index} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage name="categoryId">
                      {(msg) => <span className="text-danger mt-1">{msg}</span>}
                    </ErrorMessage>
                  </div>
                  <div className="mb-3">
                    <label>
                      Price <span className="text-danger ms-1">*</span>
                    </label>
                    <Field
                      type="number"
                      className="form-control"
                      name="price"
                    />
                    <ErrorMessage name="price">
                      {(msg) => <span className="text-danger mt-1">{msg}</span>}
                    </ErrorMessage>
                  </div>
                  <div className="mb-3">
                    <label>
                      Stock <span className="text-danger ms-1">*</span>
                    </label>
                    <Field
                      type="number"
                      className="form-control"
                      name="stock"
                    />
                    <ErrorMessage name="stock">
                      {(msg) => <span className="text-danger mt-1">{msg}</span>}
                    </ErrorMessage>
                  </div>
                  <div className="mb-3">
                    <label>Discount (%)</label>
                    <Field
                      type="number"
                      className="form-control"
                      name="discount"
                    />
                    <ErrorMessage name="discount">
                      {(msg) => <span className="text-danger mt-1">{msg}</span>}
                    </ErrorMessage>
                  </div>
                  <div className="mb-4">
                    <label>
                      Description <span className="text-danger ms-1">*</span>
                    </label>
                    <Field
                      className="form-control"
                      as="textarea"
                      name="description"
                    />
                    <ErrorMessage name="description">
                      {(msg) => <span className="text-danger mt-1">{msg}</span>}
                    </ErrorMessage>
                  </div>
                </div>
                <div className="col-lg-6">
                  <p>
                    <strong className="mb-3">IMAGES</strong>
                  </p>
                  <div className="mb-3">
                    <label>
                      Image <span className="text-danger ms-1">*</span>
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      onChange={(e) =>
                        setFieldValue("image", e.target.files[0])
                      }
                    />
                    <ErrorMessage name="image">
                      {(msg) => <span className="text-danger mt-1">{msg}</span>}
                    </ErrorMessage>
                    {values.image && <ImagePreview file={values.image} />}
                    <label className="d-block mt-3">Old image</label>
                    <img
                      crossOrigin="anonymous"
                      src={product.image_path}
                      alt=""
                      className="d-block"
                      width={200}
                    />
                  </div>
                </div>
              </div>
              <button className="btn btn-success mt-3" type="submit">
                Update
              </button>
            </Form>
          )}
        </Formik>
      </section>
    </>
  );
};

export default EditProduct;
