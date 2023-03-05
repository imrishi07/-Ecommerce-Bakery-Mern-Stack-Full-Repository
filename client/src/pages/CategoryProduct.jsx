import { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import { useCart } from "../context/cartContext";
import toast from "react-hot-toast";

const CategoryProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (params?.slug) getProductByCategory();
  }, [params.slug]);

  const getProductByCategory = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `/api/v1/product/product-category/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="row">
        <div className="container w-75 mx-auto mt-5 ">
          {loading ? (
            <h3 className="text-center mt-5">Loading...</h3>
          ) : (
            <>
              <h1 className="text-center">Products By {category.name}</h1>
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
                        className="btn btn-dark"
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
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default CategoryProduct;
