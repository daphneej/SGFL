import { api } from "./index";

const usePayment = () => {
  const getPayments = async (token) => {
    const response = await api.get(`/api/courses/payments`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.data;

    return data;
  };

  return { getPayments };
};

export default usePayment;
