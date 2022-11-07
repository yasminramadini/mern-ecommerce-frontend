import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ProductCard from "../../components/ProductCard";
import Loading from "../../components/Loading";

const ProductByCategory = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const params = useParams();

  const getProducts = (e) => {
    if (e) {
      e.preventDefault();
    }

    axios
      .get(`/products/category/${params.category}`)
      .then((response) => {
        setLoading(false);
        setProducts(response.data);
      })
      .catch((e) => {
        setLoading(false);
        console.log(e);
      });
  };

  useEffect(() => {
    getProducts();
  }, []);

  console.log(products);

  return (
    <div className="container mt-5">
      {loading && <Loading />}
      <div className="row g-3">
        {products.length === 0 && (
          <div className="alert alert-warning mt-3">No products available</div>
        )}
        <div className="col-md-6 col-lg-4">
          {products.length > 0 &&
            products.map((product, index) => (
              <ProductCard product={product} key={index} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default ProductByCategory;
