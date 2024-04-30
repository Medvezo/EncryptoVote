"use client";

import { useState } from "react";
import { Label } from "@/components/ui/AceLabel";
import { Input } from "@/components/ui/AceInput";
import { BottomGradient } from "@/components/common/BottomGradient";
import { register } from "@/helpers/axiosFunc";
import LabelInputContainer from "./LabelInputContainer";
import TwinkleSpikes from "../common/TwinkleSpikes";
import Link from "next/link";
import Logo from "../common/Logo";

export default function SignupForm() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [repeatPassword, setRepeatPassword] = useState("");

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		// Optional: Check if passwords match
		if (password !== repeatPassword) {
			console.error("Passwords do not match");
			return; // Prevent submission if passwords do not match
		}

		try {
			const userData = {
				name,
				email,
				password,
				password_confirmation: repeatPassword,
			};
			const data = await register(userData);
			console.log("Registration successful", data);
			// Additional actions upon successful registration, e.g., redirect to dashboard
		} catch (error) {
			console.error("Registration failed", error);
			// Handle registration error, e.g., display error message
		}
	};

	return (
		<>
			<section className="max-w-md w-full mx-auto flex flex-col gap-5">
				<aside className="flex justify-center mr-12">
					<Logo href="#" size={100} />
				</aside>
				<div className=" rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-blue-950">
					<h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
						Sign Up
					</h2>
					<p className="text-neutral-600 text-sm max-w-sm mt-2 mb-8 dark:text-neutral-300">
						Please enter your details to create an account.
					</p>
					<form className=" space-y-6" onSubmit={handleSubmit}>
						<LabelInputContainer>
							<Label htmlFor="name">Name</Label>
							<Input
								id="name"
								placeholder="Your first name"
								type="text"
								value={name}
								onChange={(e) => setName(e.target.value)}
							/>
						</LabelInputContainer>
						<LabelInputContainer className="mb-4">
							<Label htmlFor="email">Email Address</Label>
							<Input
								id="email"
								placeholder="example@domain.com"
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</LabelInputContainer>
						<LabelInputContainer className="mb-4">
							<Label htmlFor="password">Password</Label>
							<Input
								id="password"
								placeholder="••••••••"
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</LabelInputContainer>
						<LabelInputContainer className="mb-8">
							<Label htmlFor="repeatPassword">Repeat Password</Label>
							<Input
								id="repeatPassword"
								placeholder="••••••••"
								type="password"
								value={repeatPassword}
								onChange={(e) => setRepeatPassword(e.target.value)}
							/>
						</LabelInputContainer>

						<button
							className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset]"
							type="submit"
						>
							Sign up &rarr;
							<BottomGradient />
						</button>

						<div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
					</form>
					<div className="mt-4 text-center text-sm">
						Already have an account?{" "}
						<Link
							href="/login"
							className="underline underline-offset-4 text-primary-orange"
						>
							Log in
						</Link>
					</div>
				</div>
			</section>
			<TwinkleSpikes />
		</>
	);
}
