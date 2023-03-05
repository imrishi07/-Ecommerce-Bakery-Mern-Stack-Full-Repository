import React from "react";
import Layout from "../components/Layout/Layout";

const Policy = () => {
  return (
    <Layout title={"Privacy Policy"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/Policy.png"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <p>At Step 1, select the Website option or App option or both.</p>
          <p>Answer some questions about your website or app.</p>
          <p>Answer some questions about your business.</p>
          <p>
            Enter the email address where you'd like the Privacy Policy
            delivered and click "Generate."
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Policy;
