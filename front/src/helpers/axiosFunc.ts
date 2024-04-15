import axios from "axios";
import axiosBase from "./axiosBase";

type UserData = {
  email: string;
  password: string;
}

// Example of login request
export const login = async (userData: UserData) => {
  userData = {
    email: "admin@mail.ru",
    password: "admin123@",
  }
    try {
    const response = await axios.post("/api/login", userData);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }

};

// Example of register request
export const register = async (userData: UserData) => {
  try {
    const response = await axios.post("/api/signup", userData);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};
