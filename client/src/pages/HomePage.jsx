import { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Prices } from "./../components/Prices";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cartContext";
import toast from "react-hot-toast";

const HomePage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [products, setProduct] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  //Get Total Count
  const getTotalCountProduct = async () => {
    try {
      const { data } = await axios.get(`/api/v1/product/product-count`);
      if (data?.success) {
        setTotal(data?.totalProduct);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProduct([...products, ...data?.products]);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  //Get all product
  const getAllProduct = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      if (data?.success) {
        setProduct(data?.products);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    if (!checked.length || !radio.length) getAllProduct();
  }, [checked.length, radio.length]);

  //Get all Category

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(`/api/v1/category/all-category`);
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotalCountProduct();
  }, []);

  //handle Filter
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((cate) => cate !== id);
    }

    setChecked(all);
  };

  // Get Filter Product
  const getFilterProduct = async () => {
    try {
      const { data } = await axios.post(`/api/v1/product/product-filter`, {
        checked,
        radio,
      });
      setProduct(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (checked.length || radio.length) getFilterProduct();
  }, [checked, radio]);

  return (
    <Layout title={"All Product - Sale Alert"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <div className="card p-2">
              <h4 className="">Filter by Categorise</h4>
              <div className="filter-category mb-3 d-flex flex-column">
                {categories?.map((cate) => (
                  <div key={cate._id}>
                    <Checkbox
                      onChange={(event) =>
                        handleFilter(event.target.checked, cate._id)
                      }
                    >
                      {cate.name}
                    </Checkbox>
                  </div>
                ))}
              </div>
              <h4 className="">Filter by Price</h4>
              <div className="filter-category mb-3 d-flex flex-column">
                <Radio.Group onChange={(event) => setRadio(event.target.value)}>
                  {Prices?.map((price) => (
                    <div key={price._id}>
                      <Radio value={price.array}>{price.name}</Radio>
                    </div>
                  ))}
                </Radio.Group>
              </div>

              <div className="filter-category mb-3 d-flex flex-column">
                <button
                  onClick={() => window.location.reload()}
                  className="btn btn-dark"
                >
                  Reset Filter
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-9">
            <div className="mw-100">
              <h3>All Products </h3>
              <div className="d-flex flex-wrap">
                {products?.map((prod) => (
                  <div
                    className="card m-2 "
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
                      <button
                        className="btn btn-dark "
                        onClick={() => navigate(`/product/${prod.slug}`)}
                      >
                        MORE DETAIL
                      </button>
                      <button
                        className="btn btn-dark m-1"
                        onClick={() => {
                          setCart([...cart, prod]);
                          localStorage.setItem(
                            "cart",
                            JSON.stringify([...cart, prod])
                          );
                          toast.success("Item added to cart");
                        }}
                      >
                        🛒
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="text-center">
              {checked.length === 0 &&
                radio.length === 0 &&
                products?.length < total && (
                  <button
                    onClick={(event) => {
                      event.preventDefault();
                      setPage(page + 1);
                    }}
                    className="btn btn-dark"
                  >
                    {loading ? "Loading..." : "Load More ⇸"}
                  </button>
                )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
