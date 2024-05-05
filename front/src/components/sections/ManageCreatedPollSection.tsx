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

	const fetchPolls = async () => {
		if (signer) {
			const retrievedPolls = await fetchAllPolls(signer);
			setPolls(retrievedPolls);
		}
	};
	useEffect(() => {
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
			// Refresh the polls list to reflect the ended poll
			fetchPolls();
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
		<section className="flex flex-col gap-10 bg-blue-950 lg:mx-10  p-5 rounded-xl">
			<h2 className="text-2xl lg:text-3xl text-center font-bold">Manage:</h2>
			<div className="flex justify-center items-center gap-10 flex-wrap">
				{polls.length > 0 ? (
					polls.map((poll) => (
						<Card
							key={poll.id}
							className="poll-card max-w-md min-w-80 lg:min-w-96 min-h-60"
						>
							<CardHeader className="">
								<CardTitle className="text-xl font-bold text-amber-500 text-center">
									Poll ID: {poll.id}
								</CardTitle>
							</CardHeader>
							<CardContent className="font-bold max-h-">
								{poll.candidates.map((candidate, index) => (
									<div key={index}>{candidate.name}</div>
								))}
							</CardContent>
							<CardFooter className="flex flex-col gap-5">
								{poll.isActive && <GrantVoteRightsModal pollId={poll.id} />}
								{poll.isActive ? (
									<Button
										variant={"destructive"}
										onClick={() => handleEndPoll(poll.id)}
									>
										End Voting
									</Button>
								) : (
									<Button
										variant={"success"}
										onClick={() => handleGetWinner(poll.id)}
									>
										Get Winner
									</Button>
								)}
							</CardFooter>
						</Card>
					))
				) : (
					<p>No polls available to manage.</p>
				)}
			</div>
		</section>
	);
}
