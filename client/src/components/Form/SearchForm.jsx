import React from "react";
import { useSearch } from "../../context/searchContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SearchForm = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useSearch();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await axios.get(
        `/api/v1/product/search/${search.keyword}`
      );

      setSearch({ ...search, results: data });
      navigate("/search");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form className="d-flex" role="search" onSubmit={handleSubmit}>
        <input
          className="form-control me-2 "
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={search.keyword}
          onChange={(event) => {
            setSearch({ ...search, keyword: event.target.value });
          }}
        />
        <button className="btn btn-outline-dark" type="submit">
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchForm;
