"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/AceLabel";
import { Input } from "@/components/ui/AceInput";
import LabelInputContainer from "@/components/container/LabelInputContainer";
import { useState } from "react";

export default function ContactForm() {
	const [email, setEmail] = useState("");
	const [name, setName] = useState("");
	const [message, setMessage] = useState("");

	return (
		<form
			action="#"
			method="POST"
			className="px-6 pb-24 pt-20 sm:pb-32 lg:px-8 lg:py-48"
		>
			<div className="mx-auto max-w-xl lg:mr-0 lg:max-w-lg">
				<div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
					<div className="sm:col-span-2">
						<LabelInputContainer>
							<Label htmlFor="name">Name</Label>
							<Input
								id="name"
								placeholder="Your first name"
								type="text"
								value={name}
								onChange={(e) => setName(e.target.value)}
								required
							/>
						</LabelInputContainer>
					</div>
					<div className="sm:col-span-2">
						<LabelInputContainer>
							<Label htmlFor="email">Email Address</Label>
							<Input
								id="email"
								placeholder="example@domain.com"
								type="email"
								value={email}
								onChange={(e: any) => setEmail(e.target.value)}
								required
							/>
						</LabelInputContainer>
					</div>
					<div className="sm:col-span-2">
						<LabelInputContainer>
							<Label htmlFor="message">Message</Label>
							<div className="mt-2.5">
								<textarea
									name="message"
									id="message"
									rows={4}
									className="block w-full rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-4 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
									defaultValue={""}
                                    value={message}
									onChange={(e: any) => setMessage(e.target.value)}
								/>
							</div>
						</LabelInputContainer>
					</div>
				</div>
				<div className="mt-8 flex justify-end">
					<Button
						type="submit"
						className="font-bold text-lg"
						variant={"accent"}
					>
						Send message
					</Button>
				</div>
			</div>
		</form>
	);
}
