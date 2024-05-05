"use client";
import { useState, useEffect } from "react";
import { useWallet } from "@/components/context/WalletContext";
import { fetchAllPolls, endPoll, getWinningCandidate } from "@/helpers/web3";
import { Button } from "../ui/button";
import GrantVoteRightsModal from "../forms/GrantVoteRightsModal";
import { Poll } from "./VotingSection";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
export default function ManageCreatedPollSection() {
	const { signer } = useWallet();
	const [polls, setPolls] = useState<Poll[]>([]);

	useEffect(() => {
		const fetchPolls = async () => {
			if (signer) {
				const retrievedPolls = await fetchAllPolls(signer);
				setPolls(retrievedPolls);
			}
		};

		fetchPolls();

		const handlePollCreated = () => fetchPolls(); // handler that refetches polls

		window.addEventListener("poll-created", handlePollCreated);
		return () => {
			window.removeEventListener("poll-created", handlePollCreated);
		};
	}, [signer]);

	const handleEndPoll = async (pollId: number) => {
		if (signer) {
			await endPoll(pollId, signer);
			alert(`Poll ${pollId} has been ended.`);
		}
	};

	const handleGetWinner = async (pollId: number) => {
		if (signer && signer.provider) {
			try {
				const winner = await getWinningCandidate(pollId, signer.provider);
				alert(`Winner of poll ${pollId} is ${winner}`);
			} catch (error) {
				console.error("Error retrieving winner:", error);
				alert("Failed to retrieve winner. Please try again.");
			}
		} else {
			alert("Signer is not connected or provider is unavailable.");
		}
	};

	return (
		<section className="flex gap-10 flex-wrap">
			{polls.length > 0 ? (
				polls.map((poll: Poll) => (
					<Card
						key={poll.id}
						className="poll-card max-w-md min-w-80 lg:min-w-96"
					>
						<CardHeader>
							<CardTitle className="text-xl font-bold text-amber-500 text-center">
								Poll ID: {poll.id}
							</CardTitle>
							<CardDescription>Canditates:</CardDescription>
						</CardHeader>
						<CardContent className="font-bold ">
							{poll.candidates.map((candidate, index) => (
								<div key={index}>{candidate.name}</div>
							))}
						</CardContent>
						<CardFooter className="flex flex-col gap-5">
							<GrantVoteRightsModal pollId={poll.id} />
							<div className="col-span flex gap-10">
								<Button
									variant={"destructive"}
									onClick={() => handleEndPoll(poll.id)}
								>
									End Voting
								</Button>
								<Button onClick={() => handleGetWinner(poll.id)}>
									Get Winner
								</Button>
							</div>
						</CardFooter>
					</Card>
				))
			) : (
				<p>No polls available to manage.</p>
			)}
		</section>
	);
}
