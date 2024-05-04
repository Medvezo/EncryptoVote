import { ethers } from "ethers";
import { Poll, Candidate } from "@/components/sections/VotingSection";

const contractABI = require("@/lib/contractABI.json");
const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

export async function createPoll(
	candidateNames: string[],
	signer: ethers.Signer
) {
	const contract = new ethers.Contract(contractAddress, contractABI, signer);
	const transaction = await contract.createPoll(candidateNames);
	await transaction.wait();
}

export async function giveRightToVote(
	pollId: number,
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
