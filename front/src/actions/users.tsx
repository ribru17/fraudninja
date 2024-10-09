import * as api from "../api";

// Action Creators
export const getPosts = () => async (dispatch: any) => {
  try {
    const { data } = await api.fetchUsers();
    dispatch({ type: "FETCH_ALL", payload: data });
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    } else {
      console.log("An unknown error occurred");
    }
  }
};

export const createPost = (user: any) => async (dispatch: any) => {
  try {
    const { data } = await api.createUser(user);
    dispatch({ type: "CREATE", payload: data });
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    } else {
      console.log("An unknown error occurred");
    }
  }
};
