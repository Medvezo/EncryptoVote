import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import {
	IconArrowWaveRightUp,
	IconBoxAlignRightFilled,
	IconBoxAlignTopLeft,
	IconClipboardCopy,
	IconFileBroken,
	IconSignature,
	IconTableColumn,
} from "@tabler/icons-react";
import { EvervaultCard } from "@/components/ui/encrypted-card";
import Image from "next/image";

const Skeleton = () => (
	<div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100"></div>
);

const items = [
	{
		title: "The Dawn of Innovation",
		description: "Explore the birth of groundbreaking ideas and inventions.",
		header: <Skeleton />,
		icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
	},
	{
		title: "The Digital Revolution",
		description: "Dive into the transformative power of technology.",
		header: <Skeleton />,
		icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
	},

	{
		title: "Other Wallets support",
		description:
			"Support for other wallets will come soon...",
		header: (
			<Image
				src={"/CryptoWallets.svg"}
				alt="MetaMask Icon"
				width={600}
				height={50}
				className="overflow-hidden m-auto w-fit hover:translate-y-2 rounded-xl hover:scale-95 transition-transform duration-300 ease-out"
			/>
		),
	},
	{
		title: "The Art of Design",
		description: "Discover the beauty of thoughtful and functional design.",
		header: <Skeleton />,
		icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
	},
	{
		title: "MetaMask Support",
		description: "Vote with wallet that supports 450,000+ coins",
		header: (
			<Image
				src={"/MetaMaskIcon.svg"}
				alt="MetaMask Icon"
				width={150}
				height={50}
				className="overflow-hidden w-full h-full hover:translate-y-2 hover:rotate-6 transition-transform duration-300 ease-out"
			/>
		),
	},
	{
		title: "The Joy of Creation",
		description: "Experience the thrill of bringing ideas to life.",
		header: <Skeleton />,
		icon: <IconBoxAlignTopLeft className="h-4 w-4 text-neutral-500" />,
	},
	{
		title: "The Spirit of Adventure",
		description: "Embark on exciting journeys and thrilling discoveries.",
		header: <EvervaultCard text={"Encrypted"} />,
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
					icon={item.icon}
					className={i === 3 || i === 6 ? "md:col-span-2" : ""}
				/>
			))}
		</BentoGrid>
	);
}
