import React from "react";
import Layout from "./../components/Layout/Layout";
import { useSearch } from "../context/searchContext";

const Search = () => {
  const [search, setSearch] = useSearch();
  return (
    <Layout title={"Search Result"}>
      <div className="container">
        <div className="text-center">
          <h1>Search Result</h1>
          <h6>
            {search?.results.length < 1
              ? "No Product Found"
              : `Found ${search?.results.length}`}
          </h6>

          <div className="d-flex flex-wrap mx-auto">
            {search?.results.map((prod) => (
              <div
                className="card mx-auto my-3 "
                style={{ width: "18rem" }}
                key={prod._id}
              >
                <img
                  src={`/api/v1/product/product-photo/${prod._id}`}
                  className="card-img-top"
                  alt="..."
                />
                <div className="card-body">
                  <h5 className="card-title">{prod.name}</h5>
                  <p className="card-text">
                    {prod.description.substring(0, 30)}
                  </p>
                  <p className="card-text">${prod.price}</p>
                  <button className="btn btn-dark ">MORE DETAIL</button>
                  <button className="btn btn-dark m-1">🛒</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Search;
