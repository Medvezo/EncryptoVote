"use client";

import { login } from "@/helpers/axiosFunc"; // Assuming this is where the login function is exported from
import { Label } from "@/components/ui/AceLabel";
import { Input } from "@/components/ui/AceInput";
import { BottomGradient } from "../common/BottomGradient";

export default function LoginForm() {
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const userData = {
			email: "admin@mail.ru",
			password: "admin123@",
		};
		try {
			const data = await login(userData);
			console.log("Login successful", data);
		} catch (error) {
			console.error("Login failed", error);
		}
	};

	return (
		<div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
			<h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
				Login to EncryptoVote
			</h2>
			<p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
				Please enter your credentials to log in.
			</p>
			<form onSubmit={handleSubmit}>
				<LabelInputContainer>
					<Label htmlFor="email">Email Address</Label>
					<Input id="email" placeholder="Email" type="email" />
				</LabelInputContainer>
				<LabelInputContainer>
					<Label htmlFor="password">Password</Label>
					<Input id="password" placeholder="Password" type="password" />
				</LabelInputContainer>
				<button
					className="bg-gradient-to-br relative my-5 group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
					type="submit"
				>
					Log In &rarr;
					<BottomGradient />
				</button>
			</form>
		</div>
	);
}

const LabelInputContainer = ({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) => {
	return (
		<div className={"flex flex-col space-y-2 w-full " + className}>
			{children}
		</div>
	);
};