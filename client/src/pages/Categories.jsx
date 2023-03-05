import { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import useCategory from "../hooks/useCategory";
import { Link } from "react-router-dom";

const Categories = () => {
  const categories = useCategory();
  return (
    <Layout>
      <div className="row">
        <div className="card w-75 mx-auto mt-5 ">
          <div className="col-md-12 m-3"></div>
          <h1>All Categories</h1>
          <div className="productcard">
            {categories?.map((cate) => (
              <Link
                className="card m-3 bg-black "
                style={{ height: "200px", width: "200px" }}
                to={`/category/${cate.slug}`}
              >
                <h3 className="mx-auto my-auto text-white">{cate.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
