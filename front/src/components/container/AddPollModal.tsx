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
import { PlusCircle, Trash2 } from "lucide-react";
import {  useState } from "react";
import { Input } from "@/components/ui/AceInput";
import { useWallet } from "@/components/context/WalletContext";
import { createPoll } from "@/helpers/web3";
import { toast } from "react-toastify";

export default function AddVoteModal() {
	const [candidateNames, setCandidateNames] = useState(["", ""]);
	const { signer } = useWallet();
	const [isLoading, setIsLoading] = useState(false);

	const handleAddCandidate = () => {
		setCandidateNames([...candidateNames, ""]);
	};

	const handleCandidateChange = (index: number, value: string) => {
		const newCandidates = [...candidateNames];
		newCandidates[index] = value;
		setCandidateNames(newCandidates);
	};

	const handleRemoveCandidate = (index: number) => {
		const newCandidates = [...candidateNames];
		newCandidates.splice(index, 1);
		setCandidateNames(newCandidates);
	};

	const handleSubmit = async (event: any) => {
		event.preventDefault();
		const candidatesArray = candidateNames.filter((name) => name.trim() !== "");
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
			setCandidateNames(["", ""]);
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
				<form onSubmit={handleSubmit} className="flex flex-col gap-4">
					<DialogHeader>
						<DialogTitle className="text-center text-2xl">
							Create New Vote
						</DialogTitle>
					</DialogHeader>
					{candidateNames.map((name, index) => (
						<div
							key={index}
							className="flex justify-start gap-5 items-center w-full"
						>
							<Input
								type="text"
								value={name}
								className="min-w-80 lg:min-w-96"
								onChange={(e) => handleCandidateChange(index, e.target.value)}
								placeholder={`Candidate ${index + 1}`}
								required
							/>
							{index >= 2 && (
								<Button
									onClick={() => handleRemoveCandidate(index)}
									type="button"
									variant={"destructive"}
									className=""
								>
									<Trash2 className="w-4 h-4" />
								</Button>
							)}
						</div>
					))}
					<Button onClick={handleAddCandidate} type="button" variant={"ghost"}>
						Add Candidate
					</Button>
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
