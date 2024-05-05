"use client";

import { useState, useEffect } from "react";
import { useWallet } from "@/components/context/WalletContext";
import { vote, fetchAvailablePolls } from "@/helpers/web3";
import { Button } from "../ui/button";
import GrantVoteRightsModal from "../forms/GrantVoteRightsModal";
import TestButtons from "../common/TestButtons";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import ManageCreatedPollSection from "./ManageCreatedPollSection";

export interface Poll {
	id: number;
	candidates: Candidate[];
}

export interface Candidate {
	name: string;
}

export default function VotingSection() {
	const { signer } = useWallet();
	const [polls, setPolls] = useState<Poll[]>([]);
	const [selectedCandidate, setSelectedCandidate] = useState<
		Map<number, string>
	>(new Map());
	const [message, setMessage] = useState<string>("");

	useEffect(() => {
		const fetchPolls = async () => {
			if (signer) {
				const availablePolls = await fetchAvailablePolls(signer);
				setPolls(
					availablePolls.map((poll) => ({
						...poll,
						id: poll.id.toString(), // Ensure id is a string if it’s a BigNumber
						candidates: poll.candidates.map((candidate) => ({
							...candidate,
							name: candidate.name,
						})),
					}))
				);
			}
		};
		fetchPolls();
	}, [signer]);

	const handleVote = async (pollId: number, candidateIndex: string) => {
		if (candidateIndex !== "" && signer) {
			try {
				await vote(pollId, parseInt(candidateIndex), signer);
				setMessage("Vote successfully cast!");
			} catch (error) {
				console.error("Voting error:", error);
				setMessage("Failed to cast vote. Please try again.");
			}
		} else {
			setMessage("Please connect your wallet and select a candidate to vote.");
		}
	};

	return (
		<div>
			<div className="flex flex-wrap gap-10">
				{polls.length > 0 ? (
					polls.map((poll) => (
						<Card key={poll.id} className=" max-w-md">
							<CardHeader>
								<h2>Poll {poll.id}</h2>
							</CardHeader>
							<CardContent>
								<Select
									onValueChange={(value) =>
										setSelectedCandidate(
											new Map(selectedCandidate.set(poll.id, value))
										)
									}
									value={selectedCandidate.get(poll.id) || ""}
								>
									<SelectTrigger className="w-[180px]">
										<SelectValue placeholder="Select a candidate" />
									</SelectTrigger>
									<SelectContent>
										{poll.candidates.map((candidate, index) => (
											<SelectItem key={index} value={index.toString()}>
												{candidate.name}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</CardContent>
							<CardFooter className="flex justify-end">
								<Button
									variant={"accent"}
									onClick={() =>
										handleVote(poll.id, selectedCandidate.get(poll.id) || "")
									}
									disabled={!selectedCandidate.get(poll.id)}
									className=""
								>
									Vote
								</Button>
							</CardFooter>
						</Card>
					))
				) : (
					<p className="text-center font-bold text-2xl">
						No active votes available.
					</p>
				)}
			</div>
			{message && <p>{message}</p>}
			<GrantVoteRightsModal />
			<TestButtons />

			<ManageCreatedPollSection />
		</div>
	);
}
