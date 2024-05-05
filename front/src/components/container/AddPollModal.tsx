"use client";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/AceInput";
import { useWallet } from "@/components/context/WalletContext";
import { createPoll } from "@/helpers/web3";
import { toast } from "react-toastify";

export default function AddVoteModal() {
	const [candidateNames, setCandidateNames] = useState("");
	const { signer } = useWallet();
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = async (event: any) => {
		event.preventDefault();
		const candidatesArray = candidateNames
			.split(",")
			.map((name) => name.trim());
		if (!candidatesArray.length) {
			toast.error("Please enter at least one candidate name.");
			return;
		}
		if (!signer) {
			toast.error("Wallet is not connected.");
			return;
		}

		setIsLoading(true);
		try {
			const pollId = await createPoll(candidatesArray, signer);
			toast.success(`Poll created successfully with ID: ${pollId}`);
			setCandidateNames("");
		} catch (error) {
			console.error("Error creating poll:", error);
			toast.error("Failed to create poll. Please try again.");
		}
		setIsLoading(false);
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button size="sm" className="h-8 gap-1">
					<PlusCircle className="h-3.5 w-3.5" />
					<span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
						Add Vote
					</span>
				</Button>
			</DialogTrigger>
			<DialogContent>
				<form onSubmit={handleSubmit} className="flex flex-col gap-10">
					<DialogHeader>
						<DialogTitle className="text-center text-2xl">
							Create New Vote
						</DialogTitle>
					</DialogHeader>
					<Input
						type="text"
						value={candidateNames}
						onChange={(e) => setCandidateNames(e.target.value)}
						placeholder="Enter candidate names separated by commas"
						required
					/>
					<DialogFooter>
						<Button type="submit" variant={"accent"} disabled={isLoading}>
							{isLoading ? "Creating..." : "Create Poll"}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
