import { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cartContext";
import toast from "react-hot-toast";

const ProductDetail = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [cart, setCart] = useCart();
  const [relatedProducts, setRelatedProducts] = useState([]);
  const params = useParams();

  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-single-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProducts(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  // Similar Product
  const getSimilarProducts = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="row">
        <div className="container w-75 mx-auto mt-5 productcard">
          <div className="col-md-6">
            <img
              src={`/api/v1/product/product-photo/${product._id}`}
              className="card-img float-end mx-5 my-3 rounded"
              style={{ width: "300px" }}
              alt=""
            />
          </div>
          <div className="col-md-6 mt-4">
            <h1>Product Details</h1>
            <p>
              <b>Product Name :</b> {product.name}
            </p>
            <p>
              <b>Product Description :</b> {product.description}
            </p>
            <p>
              <b>Product Price :</b> {product.price}
            </p>
            <p>
              <b>Product Quantity :</b> {product.quantity}
            </p>
            <button className="btn btn-dark m-1">ADD TO CART</button>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="container w-75 mx-auto mt-5 ">
          <h1 className="text-center">Similar Products</h1>
          {relatedProducts.length < 1 && <p>No Similar Products Found</p>}
          <div className="d-flex flex-wrap">
            {relatedProducts?.map((prod) => (
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
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;
