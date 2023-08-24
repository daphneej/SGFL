import { api } from "./index.js";

const useCategory = () => {
  const getCategories = async (token) => {
    const response = await api.get(`/api/categories`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.data;
    return data;
  };

  return { getCategories };
};

export default useCategory;
