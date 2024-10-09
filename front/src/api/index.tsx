import axios from "axios";
import { User } from "@fraud-ninja/shared-types";

const url = "http://localhost:4000/users";

export const fetchUsers = () => axios.get(url);
export const createUser = (newUser: User) => axios.post(url, newUser);
