import { api } from "./index.js";

const useCategory = () => {
  const getCategories = async () => {
    const response = await api.get(`/api/categories`);
    const data = await response.data;
    return data;
  };

  return { getCategories };
};

export default useCategory;
