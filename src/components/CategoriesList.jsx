import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const CategoriesList = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    axios
      .get("/categories")
      .then((response) => setCategories(response.data))
      .catch((e) => console.log(e));
  }, []);

  return (
    <div className="table-responsive">
      <ul className="list-unstyled d-flex text-nowrap gap-4 d-md-block">
        {categories.length > 0 &&
          categories.map((category, index) => (
            <li className="nav-item mb-3" key={index}>
              <Link
                to={`/products/category/${category.slug}`}
                className={`text-decoration-none text-dark ${
                  category.name === category ? "text-success" : ""
                }`}
              >
                {category.name}
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default React.memo(CategoriesList);
