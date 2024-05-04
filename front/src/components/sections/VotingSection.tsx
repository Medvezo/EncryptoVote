"use client";

import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useWallet } from "@/components/context/WalletContext";
import { vote, fetchAvailablePolls } from "@/helpers/web3";
import { Button } from "../ui/button";

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
				setPolls(availablePolls);
			}
		};
		fetchPolls();
	}, [signer]);

	const handleVote = async (pollId: number, candidateIndex: string) => {
		if (candidateIndex !== "" && signer !== null) {
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
			<h1>Vote in a Poll</h1>
			{polls.length > 0 ? (
				polls.map((poll) => (
					<div key={poll.id} className="poll-card">
						<h2>Poll {poll.id}</h2>
						<select
							value={selectedCandidate.get(poll.id) || ""}
							onChange={(e) =>
								setSelectedCandidate(
									new Map(selectedCandidate.set(poll.id, e.target.value))
								)
							}
						>
							<option value="">Select a Candidate</option>
							{poll.candidates.map((candidate, index) => (
								<option key={index} value={index.toString()}>
									{candidate.name}
								</option>
							))}
						</select>
						<Button
							onClick={() =>
								handleVote(poll.id, selectedCandidate.get(poll.id) || "")
							}
						>
							Vote
						</Button>
					</div>
				))
			) : (
				<p>No active votes available.</p>
			)}
			{message && <p>{message}</p>}
		</div>
	);
}