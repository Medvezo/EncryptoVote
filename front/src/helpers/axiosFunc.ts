import axios from "axios";

type TUserRegisterData = {
	name: string;
	email: string;
	password: string;
    password_confirmation:string
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
export const register = async (UserRegisterData: TUserRegisterData) => {
	try {
		const response = await axios.post("api/signup", 
            UserRegisterData
        );
		return response.data;
	} catch (error: any) {
		throw error.response.data;
	}
};
