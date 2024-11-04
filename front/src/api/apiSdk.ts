import axios, { AxiosInstance } from "axios";
import { envConfigs } from "../configs/env";
import { Credentials, Exercise, User } from "@shared_types";

class ApiSdk {
  private readonly http: AxiosInstance;

  /**
   * @param _root base url for the requests
   */
  constructor(_root = envConfigs["development"].tsApiRoot) {
    this.http = axios.create({
      baseURL: _root,
    });
  }

  loginUser = async (credentials: Credentials): Promise<string> => {
    try {
      const response = await this.http.post("session/login", credentials);
      return response.data;
    } catch (error) {
      throw new Error("Login failed");
    }
  };

  signupUser = async (user: Omit<User, "_id">): Promise<User | null> => {
    try {
      const response = await this.http.post("session/signup", user);
      return response.data;
    } catch (error) {
      throw new Error("Login failed");
    }
  };

  checkUser = async (token: string): Promise<User | null> => {
    try {
      const { data } = await this.http.get("session/checkUser", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data;
    } catch {
      return null;
    }
  };

  getAllExercises = async (token: string): Promise<Exercise[]> => {
    try {
      const response = await this.http.get("exercises/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      throw new Error("Fetching all the exercises failed");
    }
  };

  getOneRandomExercise = async (token: string): Promise<Exercise> => {
    try {
      const response = await this.http.get("exercises/random", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      throw new Error("Fetching one exercise failed");
    }
  };
}

export default ApiSdk;
