import axios, { type AxiosInstance } from 'axios';
import { envConfigs } from '../configs/env';
import type {
  Credentials,
  Email as ExerciseEmail,
  Text as ExerciseText,
  Resource,
  User,
} from '@shared_types';

class ApiSdk {
  private readonly http: AxiosInstance;

  /**
   * @param _root base url for the requests
   */
  constructor(_root = envConfigs['development'].tsApiRoot) {
    this.http = axios.create({
      baseURL: _root,
    });
  }

  loginUser = async (credentials: Credentials): Promise<string> => {
    try {
      const response = await this.http.post('session/login', credentials);
      return response.data;
    } catch (error) {
      throw new Error('Login failed');
    }
  };

  signupUser = async (user: Omit<User, '_id'>): Promise<User | null> => {
    try {
      const response = await this.http.post('session/signup', user);
      return response.data;
    } catch (error) {
      throw new Error('Login failed');
    }
  };

  checkUser = async (token: string): Promise<User | null> => {
    try {
      const { data } = await this.http.get('session/checkUser', {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data;
    } catch {
      return null;
    }
  };

  getAllUsers = async (token: string): Promise<User[]> => {
    try {
      const { data } = await this.http.get('users/', {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data;
    } catch {
      return [];
    }
  };

  updateScoreUser = async (
    token: string,
    id: string,
    user: Partial<User>,
  ): Promise<User | null> => {
    try {
      const { data } = await this.http.put(`users/${id}`, user, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data;
    } catch (error) {
      console.error('Error updating user score:', error);
      return null;
    }
  };

  getRandomExercises = async (
    token: string,
    count?: number,
  ): Promise<(ExerciseEmail | ExerciseText)[]> => {
    try {
      const response = await this.http.get(
        `exercises${count ? '?count=' + count : ''}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      return response.data;
    } catch (error) {
      throw new Error('Fetching all the exercises failed');
    }
  };

  getAllResources = async (token: string): Promise<Resource[]> => {
    try {
      const response = await this.http.get('resources/all', {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      throw new Error('Fetching all the resources failed');
    }
  };
}

export default ApiSdk;
