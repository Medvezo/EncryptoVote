import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { EvervaultCard } from "@/components/ui/encrypted-card";
import Image from "next/image";
import { Meteors } from "../ui/meteors";
import { HoverBorderGradient } from "../ui/hover-border-gradient";
import Link from "next/link";

const items = [
	{
		title: "The Digital Revolution",
		description: "Embrace decentralization: Don't fear change; lead it.",
		header: (
			<div className="relative overflow-hidden w-full h-full">
				<Meteors number={50} />
			</div>
		),
	},
	{
		title: "Deep Dive Immediately",
		description: "Explore the birth of groundbreaking ideas and inventions.",
		header: (
			<div className="w-full h-full items-center flex justify-center text-center">
				<Link href={"/signup"}>
					<HoverBorderGradient
						containerClassName="rounded-full"
						as="button"
						className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
					>
						<span>Start Voting</span>
					</HoverBorderGradient>
				</Link>
			</div>
		),
	},
	{
		title: "Other Wallets support",
		description: "Support for other wallets will come soon...",
		header: (
			<Image
				src={"/home/CryptoWallets.svg"}
				alt="Crypto Currency wallet image with 4 coins"
				width={600}
				height={50}
				className="overflow-hidden m-auto w-fit hover:translate-y-2 rounded-xl hover:scale-95 transition-transform duration-300 ease-out"
			/>
		),
	},
	{
		title: "Privacy is Everything",
		description: "By using our service you are guaranteed to be encrypted",
		header: <EvervaultCard text={"Encrypted"} />,
	},
	{
		title: "MetaMask Support",
		description: "Vote with wallet that supports 450,000+ coins",
		header: (
			<Image
				src={"/home/MetaMaskIcon.svg"}
				alt="MetaMask Icon"
				width={150}
				height={50}
				className="overflow-hidden w-full h-full hover:translate-y-2 hover:rotate-6 transition-transform duration-300 ease-out"
			/>
		),
	},
];

export default function BentoGridSection() {
	return (
		<BentoGrid className="max-w-4xl mx-auto">
			{items.map((item, i) => (
				<BentoGridItem
					key={i}
					title={item.title}
					description={item.description}
					header={item.header}
					className={i === 3 || i === 6 ? "md:col-span-2" : ""}
				/>
			))}
		</BentoGrid>
	);
}
