import { ethers } from "ethers";
import { Poll } from "@/components/sections/VotingSection";

import abiJSON from "@/lib/contractABI.json";
const contractABI = abiJSON.abi; // Accessing nested ABI array

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

export async function createPoll(
	candidateNames: string[],
	signer: ethers.Signer
): Promise<number> {
	const contract = new ethers.Contract(contractAddress, contractABI, signer);
	const transactionResponse = await contract.createPoll(candidateNames);
	const receipt = await transactionResponse.wait();

	const pollCreatedEvent = receipt.events?.find(
		(event: any) => event.event === "PollCreated"
	);

	if (!pollCreatedEvent || !pollCreatedEvent.args) {
		throw new Error("Poll creation failed, no event found.");
	}
	const pollId = pollCreatedEvent.args.pollId.toNumber(); // Convert BigNumber to number if needed
	return pollId;
}

export async function giveRightToVote(
	pollId: number | undefined,
	voterAddress: string,
	signer: ethers.Signer
) {
	const contract = new ethers.Contract(contractAddress, contractABI, signer);
	const transaction = await contract.giveRightToVote(pollId, voterAddress);
	await transaction.wait();
}

export async function vote(
	pollId: number,
	candidateIndex: number,
	signer: ethers.Signer
) {
	const contract = new ethers.Contract(contractAddress, contractABI, signer);
	const transaction = await contract.vote(pollId, candidateIndex);
	await transaction.wait();
}

export async function endPoll(pollId: number, signer: ethers.Signer) {
	const contract = new ethers.Contract(contractAddress, contractABI, signer);
	const transaction = await contract.endPoll(pollId);
	await transaction.wait();
}

export async function getWinningCandidate(
	pollId: number,
	provider: ethers.providers.Provider
) {
	const contract = new ethers.Contract(contractAddress, contractABI, provider);
	return await contract.getWinningCandidate(pollId);
}

export async function getVoter(
	pollId: number,
	voterAddress: string,
	provider: ethers.providers.Provider
) {
	const contract = new ethers.Contract(contractAddress, contractABI, provider);
	return await contract.getVoter(pollId, voterAddress);
}

export async function getCandidate(
	pollId: number,
	candidateIndex: number,
	provider: ethers.providers.Provider
) {
	const contract = new ethers.Contract(contractAddress, contractABI, provider);
	return await contract.getCandidate(pollId, candidateIndex);
}

// for fetching IDS
export async function fetchAvailablePolls(
	signer: ethers.Signer
): Promise<Poll[]> {
	const contract = new ethers.Contract(contractAddress, contractABI, signer);
	const voterAddress = await signer.getAddress();
	const pollIds = await contract.getEligiblePolls(voterAddress);

	let polls: Poll[] = [];
	for (let id of pollIds) {
		const candidates = await contract.getCandidates(id); // Assuming getCandidates function exists
		polls.push({
			id,
			candidates: candidates.map((c: any) => ({ name: c.name })),
		});
	}
	return polls;
}

export async function fetchPollDetails(signer: ethers.Signer, pollId: number) {
	const contract = new ethers.Contract(contractAddress, contractABI, signer);
	const candidates = await contract.getCandidates(pollId);
	console.log(`Candidates for poll ${pollId}:`, candidates);
}

export async function fetchAllPolls(signer: ethers.Signer): Promise<Poll[]> {
	const contract = new ethers.Contract(contractAddress, contractABI, signer);
	try {
		const signerAddress = await signer.getAddress();
		const totalPollsCount = await contract.nextPollId(); // Fetch total number of polls
		const polls = [];

		for (let i = 0; i < totalPollsCount.toNumber(); i++) {
			const poll = await contract.polls(i);
			if (poll.chairperson.toLowerCase() === signerAddress.toLowerCase()) {
				const candidates = await contract.getCandidates(i);
				polls.push({
					id: i,
					isActive: poll.isActive,
					candidates: candidates.map((c: any) => ({ name: c.name })),
				});
			}
		}
		return polls;
	} catch (error) {
		console.error("Error fetching polls:", error);
		return []; // Return an empty array if there's an error
	}
}


export async function checkPollActive(signer: ethers.Signer, pollId: number): Promise<boolean> {
    const contract = new ethers.Contract(contractAddress, contractABI, signer);
    try {
        const poll = await contract.polls(pollId);
        return poll.isActive;
    } catch (error) {
        console.error("Error checking poll active status:", error);
        return false; // Assume not active if there's an error
    }
}