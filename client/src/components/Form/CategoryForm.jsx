import React from "react";

const CategoryForm = ({ submitHandler, value, setValue }) => {
  return (
    <>
      <form onSubmit={submitHandler}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter New Category"
            value={value}
            onChange={(event) => setValue(event.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-dark">
          Submit
        </button>
      </form>
    </>
  );
};

export default CategoryForm;
