import { actions } from "../actions/appActions";

export const appReducer = (state, action) => {
  const { type, payload } = action;

  const {
    SET_USER,
    SET_COURSES,
    SET_COURSES_TO_CART,
    ADD_COURSES_TO_CART,
    REMOVE_COURSES_TO_CART,
    SET_SELECTED_COURSES_CATEGORY,
  } = actions;

  switch (type) {
    case SET_USER:
      return { ...state, user: payload };
    case SET_COURSES:
      return { ...state, courses: payload };
    case SET_COURSES_TO_CART:
      return { ...state, coursesInCart: payload };
    case SET_SELECTED_COURSES_CATEGORY:
      return { ...state, selectedCoursesCategory: payload };
    case ADD_COURSES_TO_CART:
      return { ...state, coursesInCart: [...state.coursesInCart, payload] };
    case REMOVE_COURSES_TO_CART:
      return {
        ...state,
        coursesInCart: state.coursesInCart.filter(
          (course) => course.id !== payload
        ),
      };
    default:
      return state;
  }
};
