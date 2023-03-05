import { useState, useEffect } from "react";
import Layout from "./../../components/Layout/Layout";
import AdminMenu from "./../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Select } from "antd";
const { Option } = Select;

const CreateProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [photo, setPhoto] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");

  //Get All Category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(`/api/v1/category/all-category`, {
        name,
        description,
      });
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong getting category");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  //Create Product Handle
  const handleCreateProduct = async (event) => {
    event.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("category", category);
      productData.append("quantity", quantity);
      productData.append("photo", photo);
      const { data } = await axios.post(
        `/api/v1/product/create-product`,
        productData
      );
      if (data?.success) {
        toast.success(data?.message);
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while creating product");
    }
  };

  return (
    <Layout title={"Dashboard - Create Product"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="card w-75 p-3">
              <h3>Create Product</h3>
              <div className="m-1">
                <Select
                  bordered={false}
                  placeholder="Select a category"
                  size="large"
                  showSearch
                  className="col-md-12 mb-3 border rounded"
                  onChange={(value) => {
                    setCategory(value);
                  }}
                >
                  {categories?.map((cate) => (
                    <Option key={cate._id} value={cate._id}>
                      {cate.name}
                    </Option>
                  ))}
                </Select>
                <div className="mb-3 ">
                  <label className="btn btn-dark col-md-12">
                    {photo ? photo.name : "Upload Photo"}
                    <input
                      type="file"
                      name="photo"
                      accept="image/*"
                      onChange={(event) => setPhoto(event.target.files[0])}
                      hidden
                    />
                  </label>
                </div>
                <div className="mb-3">
                  {photo && (
                    <div className="text-center">
                      <img
                        src={URL.createObjectURL(photo)}
                        alt="product-photo"
                        height={"200px"}
                        className="img img-responsive"
                      />
                    </div>
                  )}
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    value={name}
                    placeholder="Write a product name"
                    className="form-control"
                    onChange={(event) => setName(event.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <textarea
                    type="text-area"
                    value={description}
                    placeholder="Write a product description"
                    className="form-control"
                    onChange={(event) => setDescription(event.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="number"
                    value={price}
                    placeholder="Write a product price"
                    className="form-control"
                    onChange={(event) => setPrice(event.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="number"
                    value={quantity}
                    placeholder="Write a product quantity"
                    className="form-control"
                    onChange={(event) => setQuantity(event.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <Select
                    bordered={false}
                    placeholder="Select shipping"
                    size="large"
                    showSearch
                    className="col-md-12 mb-3 border rounded"
                    onChange={(event) => setShipping(event.target.value)}
                  >
                    <Option value="0">No</Option>
                    <Option value="1">Yes</Option>
                  </Select>
                </div>
                <div className="mb-3">
                  <button
                    className="btn btn-dark"
                    onClick={handleCreateProduct}
                  >
                    CREATE PRODUCT
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
