"use client";

import { Button } from "../ui/button";
import makeBlockie from "ethereum-blockies-base64";
import Image from "next/image";
import { Card } from "../ui/card";
import { useWallet } from "../context/WalletContext";
import {useEffect} from "react"
export default function CryptoAuthButton({ setAddress }:{ setAddress:any}) {
	const { connectWallet, account } = useWallet() ;

	useEffect(() => {
		console.log(account)
		setAddress(account)
	}, [account])
	return (
		<div className="flex flex-col justify-center items-center my-3 mt-10">
			<Button
				onClick={connectWallet}
				variant="default"
				className="font-bold text-lg"
			>
				Connect Wallet
			</Button>
			{account && (
				<Card className="mt-4 p-4 border rounded-lg shadow-lg flex items-center space-x-3">
					<Image
						width={32}
						height={32}
						src={makeBlockie(account)}
						alt="Blockie"
						className="w-8 h-8 rounded-full"
					/>
					<span className="font-semibold truncate max-w-72 lg:max-w-xs">
						Connected: {account}
					</span>
				</Card>
			)}
		</div>
	);
}
