"use client";

import { Button } from "../ui/button";
import { ethers } from "ethers"; // Ensure ethers is properly imported
import { useState } from "react";
import { randomString } from "@/helpers/random";

export default function CryptoAuthButton() {
	const [message, setMessage] = useState("");
	const [account, setAccount] = useState("");

	const handleCryptoButton = async () => {
		const { ethereum } = window as any;
		if (ethereum && ethereum.isMetaMask) {
			setMessage("MetaMask Installed");
			await ethereum.request({ method: "eth_requestAccounts" });
			const accounts = await ethereum.request({ method: "eth_accounts" });

			const provider = new ethers.providers.Web3Provider(ethereum); // Use Web3Provider for ethers v6
			const signer = provider.getSigner();
			const randomMsg = randomString(16); // Avoid reusing `message` variable
			const signature = await signer.signMessage(randomMsg);

			const signAddress = await ethers.utils.verifyMessage(
				randomMsg,
				signature
			);
			if (signAddress.toLowerCase() === accounts[0].toLowerCase()) {
				setMessage("User Login");
				setAccount(accounts[0]);
			} else {
				setMessage("Login failed");
			}
		} else {
			setMessage("MetaMask is not installed");
		}
	};

	return (
		<div className="flex flex-col justify-center items-center my-3 mt-10">
			<Button onClick={handleCryptoButton} variant="default" className="font-bold text-lg">Connect Wallet</Button>
			<p>{message}</p>
			{message === "User Login" && <div>Account: {account}</div>}
		</div>
	);
}
