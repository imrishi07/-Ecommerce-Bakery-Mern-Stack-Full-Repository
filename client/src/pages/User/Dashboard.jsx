import React from "react";
import Layout from "./../../components/Layout/Layout";
import UserMenu from "./../../components/Layout/UserMenu";
import { useAuth } from "../../context/authContext";

const Dashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="card w-75 p-3">
              <h3>User Information </h3>
              <p>
                <b>Name :</b> {auth?.user?.name}
              </p>
              <p>
                <b>Email</b> : {auth?.user?.email}
              </p>
              <p>
                <b>Contact</b> : {auth?.user?.phone}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
