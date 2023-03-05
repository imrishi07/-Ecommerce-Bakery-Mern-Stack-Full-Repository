import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "../../styles/AuthStyle.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post(`/api/v1/auth/register`, {
        name,
        email,
        password,
        phone,
        address,
        answer,
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={"Register"}>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h4 className="title">REGISTER FORM</h4>
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
              required
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
          <div className="mb-3">
            <input
              value={answer}
              onChange={(event) => {
                setAnswer(event.target.value);
              }}
              type="text"
              className="form-control"
              placeholder="Enter Your First Pet Name"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            REGISTER
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
