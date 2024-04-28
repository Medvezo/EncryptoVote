"use client";

import { Button } from "../ui/button";
import { ethers } from "ethers";
import { useState } from "react";
import { randomString } from "@/helpers/random";
import { toast } from "react-toastify";

export default function CryptoAuthButton() {
	const [account, setAccount] = useState<string | null>(null);

	const handleCryptoButton = async () => {
		const { ethereum } = window as any;
		if (ethereum && ethereum.isMetaMask) {
			await ethereum.request({ method: "eth_requestAccounts" });

			const accounts = await ethereum.request({ method: "eth_accounts" });
			const provider = new ethers.providers.Web3Provider(ethereum);
			const signer = provider.getSigner();
			const randomMsg = randomString(16);

			toast.promise(
				new Promise(async (resolve, reject) => {
					try {
						const signature = await signer.signMessage(randomMsg);
						const signAddress = await ethers.utils.verifyMessage(
							randomMsg,
							signature
						);

						if (signAddress.toLowerCase() === accounts[0].toLowerCase()) {
							setAccount(accounts[0]);
							resolve("User successfully logged in.");
						} else {
							reject("Failed to login.");
						}
					} catch (error) {
						reject("Signing failed.");
					}
				}),
				{
					pending: "Signing wallet...",
					success: "Signing successful! 🎉",
					error: "Signing failed 🤯",
				}
			);
		} else {
			toast.info("Install one of our supported wallets");
		}
	};

	return (
		<div className="flex flex-col justify-center items-center my-3 mt-10">
			<Button
				onClick={handleCryptoButton}
				variant="default"
				className="font-bold text-lg"
			>
				Connect Wallet
			</Button>
		</div>
	);
}
