import { useState, useEffect } from "react";
import Layout from "./../../components/Layout/Layout";
import AdminMenu from "./../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Select } from "antd";
const { Option } = Select;

const UpdateProduct = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [categories, setCategories] = useState([]);
  const [photo, setPhoto] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [id, setId] = useState("");

  //Get Single Product

  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-single-product/${params.slug}`
      );
      if (data?.success) {
        setName(data?.product?.name);
        setDescription(data?.product?.description);
        setPrice(data?.product?.price);
        setQuantity(data?.product?.quantity);
        setId(data?.product?._id);
        setCategory(data?.product?.category._id);
        setShipping(data?.product?.shipping);
      }
    } catch (error) {
      console.log(error);
    }
  };

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
    getSingleProduct();
  }, []);

  //Update Product Handle
  const handleUpdateProduct = async (event) => {
    event.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("category", category);
      productData.append("quantity", quantity);
      photo && productData.append("photo", photo);
      const { data } = await axios.put(
        `/api/v1/product/update-product/${id}`,
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

  // Delete Product

  const handleDeleteProduct = async () => {
    try {
      let answer = window.prompt("Please type yes to confirm");
      if (!answer) return;
      const { data } = await axios.delete(
        `/api/v1/product/delete-product/${id}`
      );
      if (data?.success) {
        toast.success(data?.message);
        navigate("/dashboard/admin/products");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong deleting product");
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
              <h3>Update Product</h3>
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
                  value={category}
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
                  {photo ? (
                    <div className="text-center">
                      <img
                        src={URL.createObjectURL(photo)}
                        alt="product-photo"
                        height={"200px"}
                        className="img img-responsive"
                      />
                    </div>
                  ) : (
                    <div className="text-center">
                      <img
                        src={`/api/v1/product/product-photo/${id}`}
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
                    value={shipping ? "1" : "0"}
                    onChange={(event) => setShipping(event.target.value)}
                  >
                    <Option value="0">No</Option>
                    <Option value="1">Yes</Option>
                  </Select>
                </div>
                <div className="mb-3">
                  <button
                    className="btn btn-dark"
                    onClick={handleUpdateProduct}
                  >
                    UPDATE PRODUCT
                  </button>
                </div>
                <div className="mb-3">
                  <button
                    className="btn btn-dark"
                    onClick={handleDeleteProduct}
                  >
                    DELETE PRODUCT
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

export default UpdateProduct;
