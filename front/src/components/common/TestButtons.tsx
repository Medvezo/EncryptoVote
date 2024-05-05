import { fetchPollDetails, fetchAllPolls } from "@/helpers/web3";
import { useWallet } from "@/components/context/WalletContext";

import { Button } from "../ui/button";

export default function TestButtons() {
	const { signer } = useWallet();

	const handleSingleFetch = async (pollId: number) => {
		if (signer) {
			fetchPollDetails(signer, pollId);
		}
	};

	const handleAllFetch = async () => {
		if (signer) {
			fetchAllPolls(signer);
		}
	};
	return (
		<>
			<Button onClick={() => handleSingleFetch(0)} variant={"default"}>
				Fetch Specific Poll Details
			</Button>
			<Button onClick={() => handleAllFetch()} variant={"destructive"}>
				Fetch all Polls
			</Button>
		</>
	);
}
