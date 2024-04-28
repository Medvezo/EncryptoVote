import TwinkleSpikes from "@/components/common/TwinkleSpikes";
import CryptoAuthButton from "@/components/container/CryptoAuthButton";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";

export default function page() {
	return (
		<section className="flex justify-center items-center min-h-screen overflow-hidden">
			<TwinkleSpikes />
			<Card className="w-[350px]">
				<CardHeader>
					<CardTitle>Connect Your Wallet</CardTitle>
				</CardHeader>
				<CardContent>
					<form>
						<div className="grid w-full items-center gap-4">
							<div className="flex flex-col space-y-1.5">
								<Label htmlFor="name">Name</Label>
								<Input id="name" placeholder="Name of your Wallet" />
							</div>
						</div>
					</form>
					<CryptoAuthButton />
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
					<Button variant="outline">Cancel</Button>
					<Button variant="accent">Add</Button>
				</CardFooter>
			</Card>
		</section>
	);
}
