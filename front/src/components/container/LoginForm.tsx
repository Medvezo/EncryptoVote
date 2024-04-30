"use client";

import { useState } from "react";
import { login } from "@/helpers/axiosFunc";
import { Label } from "@/components/ui/AceLabel";
import { Input } from "@/components/ui/AceInput";
import { BottomGradient } from "../common/BottomGradient";
import LabelInputContainer from "./LabelInputContainer";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import TwinkleSpikes from "../common/TwinkleSpikes";
import Link from "next/link";

export default function LoginForm() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const router = useRouter(); // for redirecting

		toast
			.promise(login(email, password), {
				pending: "Logging in...",
				success: "Logged in successfully! 🎉",
				error: "Login failed! Please check your credentials and retry again",
			})
			.then((data) => {
				console.log("Login successful", data); //! delete later
				router.push("/dashboard"); // redirect to dashboard on success
			})
			.catch((error) => {
				toast.error("Some unexpected error happened, please try again");
				console.error("Login failed", error); //! delete later
			});
	};

	return (
		<>
			<div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-blue-950">
				<h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
					Login to EncryptoVote
				</h2>
				<p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
					Please enter your credentials to log in.
				</p>
				<form onSubmit={handleSubmit}>
					<LabelInputContainer>
						<Label htmlFor="email">Email Address</Label>
						<Input
							id="email"
							placeholder="Email"
							type="email"
							value={email}
							onChange={(e: any) => setEmail(e.target.value)}
						/>
					</LabelInputContainer>
					<LabelInputContainer>
						<Label htmlFor="password">Password</Label>
						<Input
							id="password"
							placeholder="Password"
							type="password"
							value={password}
							onChange={(e: any) => setPassword(e.target.value)}
						/>
					</LabelInputContainer>
					<button
						className="bg-gradient-to-br relative my-5 group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
						type="submit"
					>
						Log In &rarr;
						<BottomGradient />
					</button>
				</form>
				<div className="mt-4 text-center text-sm">
					Don&apos;t have an account?{" "}
					<Link href="/signup" className="underline underline-offset-4 text-primary-orange">
						Sign up
					</Link>
				</div>
			</div>
			<TwinkleSpikes />
		</>
	);
}
