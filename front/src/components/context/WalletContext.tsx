"use client";
import { createContext, useContext, useState, useMemo } from "react";
import { ethers } from "ethers";
import { randomString } from "@/helpers/random";
import { toast } from "react-toastify";

interface WalletContextType {
	account: string | null;
	signer: ethers.Signer | null;
	connectWallet: () => Promise<void>;
	disconnectWallet: () => void;
}

// Initial state
const defaultContext: WalletContextType = {
	account: null,
	signer: null,
	connectWallet: async () => {},
	disconnectWallet: () => {},
};

const WalletContext = createContext<WalletContextType>(defaultContext);

export function useWallet() {
	return useContext(WalletContext);
}

export const WalletProvider = ({ children }: { children: React.ReactNode }) => {
	const [account, setAccount] = useState<string | null>(null);
	const [signer, setSigner] = useState<ethers.Signer | null>(null);

	const connectWallet = async () => {
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
							setSigner(signer); 

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

	const disconnectWallet = () => {
		setAccount(null);
		setSigner(null);
	};

	const value = useMemo(
		() => ({
			account,
			signer,
			connectWallet,
			disconnectWallet,
		}),
		[account, signer]
	);

	return (
		<WalletContext.Provider value={value}>{children}</WalletContext.Provider>
	);
};
