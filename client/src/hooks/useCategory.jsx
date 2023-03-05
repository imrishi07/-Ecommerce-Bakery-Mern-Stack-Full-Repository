import { useState, useEffect } from "react";
import axios from "axios";

export default function useCategory() {
  const [categories, setCategories] = useState([]);

  //get Categories
  const getCotegories = async () => {
    try {
      const { data } = await axios.get(`/api/v1/category/all-category`);
      setCategories(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCotegories();
  }, []);

  return categories;
}
