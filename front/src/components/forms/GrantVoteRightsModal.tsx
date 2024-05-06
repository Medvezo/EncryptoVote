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
import { giveRightToVote } from "@/helpers/web3";
import { toast } from "react-toastify";

interface GrantVoteRightsModalProps {
  pollId?: number;
}

export default function GrantVoteRightsModal({ pollId }: GrantVoteRightsModalProps) {
	const [address, setAddress] = useState("");
	const { signer } = useWallet();
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = async (event: any) => {
		event.preventDefault();
		if (!signer) {
			toast.error("Wallet is not connected.");
			return;
		}
		setIsLoading(true);
		try {
			await giveRightToVote(pollId, address, signer);
			toast.success(`Voting rights granted successfully to ${address}`);
			setAddress("");
		} catch (error) {
			console.error("Error granting voting rights:", error);
			toast.error("Failed to grant voting rights. Please try again.");
		}
		setIsLoading(false);
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button size="sm" variant={"outline"} className="h-8 gap-1">
					<PlusCircle className="h-3.5 w-3.5" />
					<span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
						Grant Vote Rights
					</span>
				</Button>
			</DialogTrigger>
			<DialogContent>
				<form onSubmit={handleSubmit} className="flex flex-col gap-4">
					<DialogHeader>
						<DialogTitle className="text-center text-2xl">
							Grant Voting Rights
						</DialogTitle>
					</DialogHeader>
					<Input
						type="text"
						value={address}
						onChange={(e) => setAddress(e.target.value)}
						placeholder="Enter voter's address"
						required
					/>
					<DialogFooter>
						<Button type="submit" disabled={isLoading}>
							{isLoading ? "Granting..." : "Grant Rights"}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
