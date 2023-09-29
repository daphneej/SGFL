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

  const getPaidCourses = async ({ token }) => {
    const response = await api.get(`/api/courses/paid`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.data;
    return data;
  };

  const getCartCourses = async ({ token }) => {
    const response = await api.get(`/api/courses/cart`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.data;
    return data;
  };

  const addCourseToUserCart = async ({ courseId, token }) => {
    const response = await api.post(
      `/api/courses/cart-add`,
      { courseId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.data;

    return data;
  };

  const removeCourseToUserCart = async ({ coursesIds, token }) => {
    const response = await api.post(
      `/api/courses/cart-remove`,
      { coursesIds },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

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
      `/api/courses/checkout`,
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

  const processStripePaymentSession = async ({ sessionId }) => {
    const response = await api.get(`/api/courses/session/process/${sessionId}`);
    const data = await response.data;
    return data;
  };

  const cancelStripePaymentSession = async ({ sessionId }) => {
    const response = await api.get(`/api/courses/session/cancel/${sessionId}`);
    const data = await response.data;
    return data;
  };

  return {
    getCourses,
    getPublishedCourses,
    getPaidCourses,
    getCartCourses,
    addCourseToUserCart,
    removeCourseToUserCart,
    addCourse,
    updateCourse,
    removeCourse,
    buyCourseInCart,
    processStripePaymentSession,
    cancelStripePaymentSession,
  };
};

export default useCourse;
