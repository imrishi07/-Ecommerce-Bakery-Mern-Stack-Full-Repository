import { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "./../../components/Layout/UserMenu";
import { useAuth } from "../../context/authContext";
import axios from "axios";
import moment from "moment";

const Orders = () => {
  const [auth, setAuth] = useAuth();
  const [orders, setOrders] = useState([]);

  const getOrder = async () => {
    try {
      const { data } = await axios.get(`/api/v1/auth/orders`);
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrder();
  }, [auth?.token]);

  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="card w-100 p-3">
              <h3>All Orders</h3>
              {orders?.map((order, index) => {
                return (
                  <>
                    <table class="table">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Status</th>
                          <th scope="col">Buyer</th>
                          <th scope="col">Date</th>
                          <th scope="col">Payment</th>
                          <th scope="col">Quantity</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th scope="row">{index + 1}</th>
                          <td>{order?.status}</td>
                          <td>{order?.buyer.name}</td>
                          <td>{moment(order?.createdAt).fromNow()}</td>
                          <td>
                            {order?.payment.success ? "Success" : "Failed"}
                          </td>
                          <td>{order?.products?.length}</td>
                        </tr>
                      </tbody>
                    </table>
                    <div className="container">
                      {order?.products?.map((cart, index) => (
                        <div className="productcard">
                          <img
                            src={`/api/v1/product/product-photo/${cart._id}`}
                            className="card-img mx-5 my-3 rounded"
                            style={{ width: "300px" }}
                            alt=""
                          />

                          <div className="mt-5">
                            <p>
                              <b>Product Name :</b> {cart.name}
                            </p>
                            <p>
                              <b>Product Description :</b> {cart.description}
                            </p>
                            <p>
                              <b>Product Price :</b> {cart.price}
                            </p>
                            <p>
                              <b>Product Quantity :</b> {cart.quantity}
                            </p>
                            <button className="btn btn-dark m-1">Remove</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
