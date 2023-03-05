import { useState, useEffect } from "react";
import Layout from "./../../components/Layout/Layout";
import AdminMenu from "./../../components/Layout/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../context/authContext";
import moment from "moment";
import { Select } from "antd";
const { Option } = Select;

const AdminOrders = () => {
  const [status, setStatus] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "deliverd",
    "cancel",
  ]);
  const [changeStatus, setChangeStatus] = useState("");

  const [auth, setAuth] = useAuth();
  const [orders, setOrders] = useState([]);

  const getOrder = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/auth/all-orders`
      );
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrder();
  }, [auth?.token]);

  const handleChangeStatus = async (orderId, value) => {
    try {
      const { data } = await axios.put(
        `/api/v1/auth/order-status/${orderId}`,
        { status: value }
      );
      getOrder();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="card w-100 p-3">
              <h3>All Order</h3>
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
                          <td>
                            {
                              <Select
                                bordered={false}
                                onChange={(value) =>
                                  handleChangeStatus(order._id, value)
                                }
                                defaultValue={order?.status}
                              >
                                {status.map((sta, index) => (
                                  <Option key={index} value={sta}>
                                    {sta}
                                  </Option>
                                ))}
                              </Select>
                            }
                          </td>
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
                            src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${cart._id}`}
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
                              <b>Product Price :</b> $ {cart.price}
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

export default AdminOrders;
