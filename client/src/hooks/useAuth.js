import { api } from "./index.js";

const useAuth = () => {
  const registerUser = async (user) => {
    const response = await api.post(`/api/users/register`, user);
    const data = await response.data;
    return data;
  };

  const loginUser = async (user) => {
    const response = await api.post(`/api/users/login`, user);
    const data = await response.data;
    return data;
  };

  const logoutUser = async (user) => {
    const response = await api.post(`/api/users/logout`, user, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const data = await response.data;
    return data;
  };

  const updateUser = async (user) => {
    const response = await api.put(`/api/users/update`, user, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    const data = await response.data;
    return data;
  };

  return {
    updateUser,
    registerUser,
    loginUser,
    logoutUser,
  };
};

export default useAuth;
