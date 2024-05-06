"use client";

import CryptoAuthButton from "@/components/container/CryptoAuthButton";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ConnectWalletModal() {
	const [name, setName] = useState<string>("");
	const [address, setAddress] = useState("");
	const router = useRouter();

	const handleSubmit = async () => {
		try {
			const response = await axios.post("api/connect-wallet", {
				name: name,
				address: address,
			});
			return response.data;
		} catch (error: any) {
			if (error.response && error.response.status !== 401) {
				throw error.response.data;
			}
		}
	};

	return (
		<Card className="w-[350px] lg:w-[500px]">
			<CardHeader>
				<CardTitle>Connect Your Wallet</CardTitle>
			</CardHeader>
			<CardContent>
				<form>
					<div className="grid w-full items-center gap-4">
						<div className="flex flex-col space-y-1.5">
							<Label htmlFor="name">Name</Label>
							<Input
								id="name"
								value={name}
								onChange={(e) => setName(e.target.value)}
								placeholder="Name of your Wallet"
							/>
						</div>
					</div>
				</form>
				<CryptoAuthButton setAddress={setAddress} />
				<aside className="flex justify-center items-center flex-col mt-10">
					<p className="font-bold text-2xl ">Supported Wallets:</p>
					<div>
						<Image
							src={"/home/MetaMaskIcon.svg"}
							alt="MetaMask Icon"
							width={50}
							height={50}
							className="overflow-hidden   transition-transform duration-300 ease-out"
						/>
					</div>
				</aside>
			</CardContent>
			<CardFooter className="flex justify-between">
				<Button variant="outline" onClick={() => router.back()}>
					Back
				</Button>
				<Button onClick={() => handleSubmit()} variant="accent">
					Add
				</Button>
			</CardFooter>
		</Card>
	);
}
