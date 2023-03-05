import { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import { useCart } from "../context/cartContext";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import toast from "react-hot-toast";

const Cart = () => {
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);

  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total += item.price;
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (error) {
      console.log(error);
    }
  };

  //get Payment Gatway Token
  const getToken = async () => {
    try {
      const { data } = await axios.get(`/api/v1/product/braintree/token`);
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getToken();
  }, [auth?.token]);

  //Payment
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post(`/api/v1/product/braintree/payment`, {
        nonce,
        cart,
      });
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment Completed Successfully");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center mt-3">{`Hello ${
              auth?.token && auth?.user?.name
            }`}</h1>
            <h4 className="text-center mt-1">
              {cart?.length > 0
                ? `You have ${cart.length} items in your cart ${
                    auth?.token ? "" : "Please Login to checkout"
                  }`
                : "Your Cart is Empty"}
            </h4>
            <hr />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-9">
            <h1 className="mx-5 my-3">Product Details</h1>
            {cart?.map((cart) => (
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
                  <button
                    className="btn btn-dark m-1"
                    onClick={() => {
                      removeCartItem(cart._id);
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="col-md-3">
            <h4 className="text-center mt-3">Cart Summary</h4>
            <div className="mt-4 text-center">
              <p>Total | Checkout | Payment</p>
              <hr />
              <h4>Total: {totalPrice()}</h4>
              {auth?.user?.address ? (
                <>
                  <div className="mt-3">
                    <h4>
                      <b>Current Address</b>
                    </h4>
                    <h5>{auth?.user?.address}</h5>
                    <button
                      className="btn btn-outline-dark"
                      onClick={() => navigate("/dashboard/user/profile")}
                    >
                      Update Address
                    </button>
                  </div>
                </>
              ) : (
                <div className="mt-3">
                  {auth?.token ? (
                    <button
                      className="btn btn-outline-dark"
                      onClick={() => navigate("/dashboard/user/profile")}
                    >
                      Update Address
                    </button>
                  ) : (
                    <button
                      className="btn btn-outline-dark"
                      onClick={() =>
                        navigate("/login", {
                          state: "/cart",
                        })
                      }
                    >
                      Please Login to Check out
                    </button>
                  )}
                </div>
              )}
              <div className="mt-5">
                {!clientToken || !cart?.length ? (
                  ""
                ) : (
                  <>
                    <DropIn
                      options={{
                        authorization: clientToken,
                        paypal: {
                          flow: "vault",
                        },
                      }}
                      onInstance={(instance) => setInstance(instance)}
                    />
                    <button
                      className="btn btn-dark"
                      onClick={handlePayment}
                      disabled={loading || !instance || !auth?.user?.address}
                    >
                      {loading ? "Loading..." : "Make Payment"}
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
