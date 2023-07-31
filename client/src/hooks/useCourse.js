import { api } from "./index.js";

const useCourse = () => {
  const getCourses = async () => {
    const response = await api.get(`/api/courses`);
    const data = await response.data;
    return data;
  };

  return { getCourses };
};

export default useCourse;
