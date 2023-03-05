import { useState, useEffect } from "react";
import Layout from "./../../components/Layout/Layout";
import AdminMenu from "./../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import CategoryForm from "../../components/Form/CategoryForm";
import { Modal } from "antd";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");

  //handle form - Create Category
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post(`/api/v1/category/create-category`, {
        name,
      });
      if (data?.success) {
        toast.success(`${data.category.name} is created`);
        setName("");
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while creating category");
    }
  };

  //Get all Category  - Read Category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(`/api/v1/category/all-category`);
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong getting category");
    }
  };

  //handle update Category - Update Category
  const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.put(
        `/api/v1/category/update-category/${selected._id}`,
        { name: updatedName }
      );
      if (data?.success) {
        toast.success(data?.message);
        setSelected(null);
        setUpdatedName("");
        setVisible(false);
        getAllCategory();
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while updating category");
    }
  };

  // Delete Category
  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(
        `/api/v1/category/delete-category/${id}`
      );
      if (data?.success) {
        toast.success(`${data?.category?.name} is deleted`);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while deleting category");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  return (
    <Layout title={"Dashboard - Create Category"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="card w-75 p-3">
              <h3>Manage Category</h3>
              <div className="p-3">
                <CategoryForm
                  submitHandler={handleSubmit}
                  value={name}
                  setValue={setName}
                />
              </div>
              <div>
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Edit</th>
                      <th scope="col">Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories?.map((cate) => (
                      <>
                        <tr>
                          <td key={cate._id}>{cate.name}</td>
                          <td>
                            <button
                              className="btn btn-dark"
                              onClick={() => {
                                setVisible(true);
                                setUpdatedName(cate.name);
                                setSelected(cate);
                              }}
                            >
                              Edit
                            </button>
                          </td>
                          <td>
                            <button
                              className="btn btn-dark"
                              onClick={() => handleDelete(cate._id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      </>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <Modal
            onCancel={() => setVisible(false)}
            footer={null}
            open={visible}
          >
            <div className="p-3 mt-3">
              <CategoryForm
                value={updatedName}
                setValue={setUpdatedName}
                submitHandler={handleUpdate}
              />
            </div>
          </Modal>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
