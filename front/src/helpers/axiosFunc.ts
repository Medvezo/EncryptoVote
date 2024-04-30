import axios from "axios";

type UserRegisterData = {
	name: string;
	email: string;
	password: string;
};

// Function to handle login requests
export const login =  async (email: string, password: string) => {
    try {
        const response = await axios.post('api/login', {
            email: email,
            password: password
        });
        return response.data;
    } catch (error:any) {
        throw error.response.data;
    }
};

// Function to handle registration requests
export const register = async (userData: UserRegisterData) => {
	try {
		const response = await axios.post("api/signup", userData);
		return response.data;
	} catch (error: any) {
		throw error.response.data;
	}
};
