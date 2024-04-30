import axios from "axios";

type UserData = {
	email: string;
	password: string;
};

// Function to handle login requests
export const login =  async (email: string, password: string) => {
    try {
        const response = await axios.post('http://127.0.0.1:8000/login', {
            email: email,
            password: password
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Function to handle registration requests
export const register = async (userData: UserData) => {
	try {
		const response = await axios.post("/signup", userData);
		return response.data;
	} catch (error: any) {
		throw error.response.data;
	}
};
