import { Credentials, User } from "@shared_types";
import { loginUser, signupUser } from "../api";
import { setToken } from "../redux/slices/sessionSlice";

export const login = (credentials: Credentials) => async (dispatch: any) => {
  try {
    const token = await loginUser(credentials);
    dispatch(setToken(token));
    return token;
  } catch (error) {
    console.error("Login action failed", error);
    throw error;
  }
};

export const signup = async (user: Omit<User, "_id">) => {
  try {
    await signupUser(user);
  } catch (error) {
    console.error("Signup action failed", error);
    throw error;
  }
};
