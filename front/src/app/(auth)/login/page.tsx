import LoginForm from "@/components/forms/LoginForm";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Login",
};

export default function SignUpPage() {
	return (
		<main className="flex justify-center items-center h-screen">
			<LoginForm />
		</main>
	);
}
