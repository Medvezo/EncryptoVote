import axios from "axios";

type UserData = {
	email: string;
	password: string;
};

// Function to handle login requests
export const login = async (userData: UserData) => {
    try {
        console.log("first data sent by front");
        const response = await axios.post("/api/login", userData);
		return response.data;
	} catch (error: any) {
		throw error.response.data;
	}
};

// Function to handle registration requests
export const register = async (userData: UserData) => {
	try {
		const response = await axios.post("/api/signup", userData);
		return response.data;
	} catch (error: any) {
		throw error.response.data;
	}
};
