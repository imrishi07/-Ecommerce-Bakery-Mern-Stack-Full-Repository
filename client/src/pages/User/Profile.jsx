import { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "./../../components/Layout/UserMenu";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "../../styles/AuthStyle.css";
import { useAuth } from "../../context/authContext";

const Profile = () => {
  const [auth, setAuth] = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const { name, email, phone, address } = auth?.user;
    setName(name);
    setEmail(email);
    setPhone(phone);
    setAddress(address);
  }, [auth?.user]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.put(`/api/v1/auth/profie-update`, {
        name,
        email,
        password,
        phone,
        address,
      });
      if (data?.success) {
        setAuth({ ...auth, user: data?.updatedUser });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success(data?.message);
      } else {
        toast.error(data?.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="card w-100 p-3">
              <div className="form-container">
                <form onSubmit={handleSubmit}>
                  <h4 className="title">Your Profile</h4>
                  <div className="mb-3">
                    <input
                      value={name}
                      onChange={(event) => {
                        setName(event.target.value);
                      }}
                      type="User name"
                      className="form-control"
                      placeholder="Enter Your Name"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      value={email}
                      onChange={(event) => {
                        setEmail(event.target.value);
                      }}
                      type="email"
                      className="form-control"
                      placeholder="Enter Your Email"
                      required
                      disabled
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      value={password}
                      onChange={(event) => {
                        setPassword(event.target.value);
                      }}
                      type="password"
                      className="form-control"
                      placeholder="Enter Your Password"
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      value={phone}
                      onChange={(event) => {
                        setPhone(event.target.value);
                      }}
                      type="text"
                      className="form-control"
                      placeholder="Enter Your Phone"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      value={address}
                      onChange={(event) => {
                        setAddress(event.target.value);
                      }}
                      type="text"
                      className="form-control"
                      placeholder="Enter Your Address"
                      required
                    />
                  </div>

                  <button type="submit" className="btn btn-primary">
                    UPDATE PROFILE
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
