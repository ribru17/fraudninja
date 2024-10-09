import axios from "axios";

const url = "http://localhost:3000/users";

export const fetchUsers = () => axios.get(url);
export const createUser = (newUser: any) => axios.post(url, newUser);