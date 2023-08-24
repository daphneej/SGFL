import { api } from "..";

const useUser = () => {
  const addUser = async ({ user, token }) => {
    const response = await api.post(`/api/users`, user, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return await response.data;
  };

  const getUsers = async (token) => {
    const response = await api.get(`/api/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return await response.data;
  };

  const getUser = async ({ userId, token }) => {
    const response = await api.get(`/api/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return await response.data;
  };

  const updateUser = async ({ user, token }) => {
    const response = await api.put(`/api/users/${user.id}`, user, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return await response.data;
  };

  const removeUser = async ({ userId, token }) => {
    const response = await api.delete(`/api/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.data;
  };

  return {
    addUser,
    getUsers,
    getUser,
    getUsers,
    updateUser,
    removeUser,
  };
};

export default useUser;
