import { useState, useEffect, useMemo, useRef } from "react";
import axios from "axios";
import Jumbotron from "../../components/Jumbotron";
import CategoriesList from "../../components/CategoriesList";
import ProductCard from "../../components/ProductCard";
import Loading from "../../components/Loading";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const inputRef = useRef();

  const getProducts = (e) => {
    if (e) {
      e.preventDefault();
    }

    axios
      .get(`/products?keyword=${inputRef.current.value}`)
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

  return (
    <>
      {loading && <Loading />}
      <Jumbotron />

      <div className="container mt-5">
        <div className="row g-4 justify-content-between">
          <div className="col-md-3">
            <CategoriesList />
          </div>
          <div className="col-md-9">
            <form action="" className="mb-4" onSubmit={getProducts}>
              <div className="input-group">
                <input type="text" className="form-control" ref={inputRef} />
                <button className="btn btn-success">Search</button>
              </div>
            </form>
            {products.length === 0 && (
              <div className="alert alert-warning mt-3">
                No products available
              </div>
            )}
            <div className="row g-4">
              {products.length > 0 &&
                products.map((product, index) => (
                  <div className="col-md-6 col-lg-4" key={index}>
                    <ProductCard product={product} />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
