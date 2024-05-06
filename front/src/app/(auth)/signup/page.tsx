import SignupForm from "@/components/forms/SignUpForm";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Signup",
};

export default function SignUpPage() {
	return (
		<main className="flex justify-center items-center h-screen">
			<SignupForm />
		</main>
	);
}
