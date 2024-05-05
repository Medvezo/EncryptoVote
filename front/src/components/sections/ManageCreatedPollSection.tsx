"use client";
import { useState, useEffect } from "react";
import { useWallet } from "@/components/context/WalletContext";
import { fetchAllPolls, endPoll, getWinningCandidate } from "@/helpers/web3";
import { Button } from "../ui/button";
import GrantVoteRightsModal from "../forms/GrantVoteRightsModal";
import { Poll } from "./VotingSection";

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
		<div>
			{polls.length > 0 ? (
				polls.map((poll: Poll) => (
					<div key={poll.id} className="poll-card">
						<h2>Poll ID: {poll.id}</h2>
						<div>
							<GrantVoteRightsModal pollId={poll.id} />
							<Button onClick={() => handleEndPoll(poll.id)}>End Voting</Button>
							<Button onClick={() => handleGetWinner(poll.id)}>
								Get Winner
							</Button>
						</div>
					</div>
				))
			) : (
				<p>No polls available to manage.</p>
			)}
		</div>
	);
}
