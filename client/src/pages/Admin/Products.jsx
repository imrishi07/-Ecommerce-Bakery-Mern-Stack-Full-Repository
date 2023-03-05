import { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const Products = () => {
  const [products, setProduct] = useState([]);

  //get all product
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(`/api/v1/product/get-all-product`);
      if (data?.success) {
        setProduct(data?.products);
        //toast.success(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong getting all products");
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="card w-75 p-3 ">
              <h3>All Products</h3>
              <div className="d-flex flex-wrap">
                {products?.map((prod) => (
                  <Link
                    to={`/dashboard/admin/product/${prod.slug}`}
                    className="product-link"
                    key={prod._id}
                  >
                    <div className="card m-2" style={{ width: "12rem" }}>
                      <img
                        src={`/api/v1/product/product-photo/${prod._id}`}
                        className="card-img-top"
                        alt="..."
                      />
                      <div className="card-body">
                        <h5 className="card-title">{prod.name}</h5>
                        <p className="card-text">{prod.description}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
