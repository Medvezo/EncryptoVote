"use client";

import { useState } from "react";
import { ethers } from "ethers";
import { createPoll } from "@/helpers/web3";
import { Input } from "../ui/AceInput";
import { Button } from "../ui/button";
import { useWallet } from "../context/WalletContext";

function CreatePollForm() {
	const [candidateNames, setCandidateNames] = useState("");
	const [message, setMessage] = useState("");

	const { signer } = useWallet();

	const handleInputChange = (event: any) => {
		setCandidateNames(event.target.value);
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const namesArray = candidateNames.split(",").map((name) => name.trim());
		if (namesArray.length === 0) {
			setMessage("Please enter at least one candidate name.");
			return;
		}

		if (!signer) {
			setMessage("Please connect to your wallet first.");
			return;
		}

		try {
			await createPoll(namesArray, signer);
			setMessage("Poll created successfully!");
			setCandidateNames(""); // Clear input field
		} catch (error) {
			console.error("Error creating poll:", error);
			setMessage("Error creating poll. Please try again.");
		}
	};

	return (
		<div className="flex flex-col gap-10 max-w-md m-auto h-screen">
			<h1>Create a Voting Poll</h1>
			<form onSubmit={handleSubmit} className="flex flex-col gap-10">
				<label>
					Candidate Names (comma-separated):
					<Input
						type="text"
						value={candidateNames}
						onChange={handleInputChange}
						placeholder="Enter candidate names separated by commas"
					/>
				</label>
				<Button type="submit">Create Poll</Button>
			</form>
			{message && <p>{message}</p>}
		</div>
	);
}

export default CreatePollForm;
