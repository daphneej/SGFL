import { api } from "./index.js";

const useCategory = () => {
  const getCategories = async () => {
    const response = await api.get(`/api/categories`);
    const data = await response.data;
    return data;
  };

  const addCategory = async ({ category, token }) => {
    const response = await api.post(`/api/categories`, category, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.data;

    return data;
  };

  const updateCategory = async ({ category, token }) => {
    const response = await api.put(`/api/categories/${category.id}`, category, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.data;

    return data;
  };

  const removeCategory = async ({ categoryId, token }) => {
    const response = await api.delete(`/api/categories/${categoryId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.data;

    return data;
  };

  return { getCategories, addCategory, updateCategory, removeCategory };
};

export default useCategory;
