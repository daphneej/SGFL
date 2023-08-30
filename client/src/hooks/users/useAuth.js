import { api } from "..";

const useAuth = () => {
  const registerUser = async (user) => {
    const response = await api.post(`/api/users/register`, user);

    return await response.data;
  };

  const loginUser = async (user) => {
    const response = await api.post(`/api/users/login`, user);

    return await response.data;
  };

  const logoutUser = async (user) => {
    const response = await api.post(`/api/users/logout`, user, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    return await response.data;
  };

  const updateUser = async (user) => {
    const response = await api.put(`/api/users/update/${user.id}`, user, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    return await response.data;
  };

  const toggleUserCourseInCart = async (user) => {
    const response = await api.put(`/api/users/toggle/${user.id}`, user, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    return await response.data;
  };

  const buyCourseInCart = async (user) => {
    const response = await api.put(`/api/users/buy/${user.id}`, user, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    return await response.data;
  };

  const removeUser = async (userId, user) => {
    const response = await api.delete(`/api/users/delete/${userId}`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    return await response.data;
  };

  return {
    updateUser,
    registerUser,
    loginUser,
    logoutUser,
    removeUser,
    toggleUserCourseInCart,
    buyCourseInCart
  };
};

export default useAuth;
