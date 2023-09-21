import { api } from "./index.js";

const useCourse = () => {
  const getCourses = async () => {
    const response = await api.get(`/api/courses`);
    const data = await response.data;
    return data;
  };

  const getPublishedCourses = async () => {
    const response = await api.get(`/api/courses/published`);
    const data = await response.data;
    return data;
  };

  const addCourse = async ({ course, token }) => {
    const response = await api.post(`/api/courses`, course, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    const data = await response.data;

    return data;
  };

  const updateCourse = async ({ course, token }) => {
    const response = await api.put(`/api/courses/${course.id}`, course, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    const data = await response.data;

    return data;
  };

  const removeCourse = async ({ courseId, token }) => {
    const response = await api.delete(`/api/courses/${courseId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.data;

    return data;
  };

  const buyCourseInCart = async ({ items, token }) => {
    const response = await api.post(
      `/api/courses/buy`,
      { items },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.data;

    return data;
  };

  return {
    getCourses,
    getPublishedCourses,
    addCourse,
    updateCourse,
    removeCourse,
    buyCourseInCart,
  };
};

export default useCourse;
