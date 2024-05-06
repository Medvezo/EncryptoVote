import BentoGridSection from "@/components/sections/BentoGridSection";
import FaqSection from "@/components/sections/FaqSection";
import HeroSection from "@/components/sections/HeroSection";
import { MacbookScroll } from "@/components/ui/macbook-scroll";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Home",
};

export default function Home() {
	return (
		<main className="flex flex-col justify-center items-center min-h-screen pt-24 pb-10">
			<HeroSection />
			<MacbookScroll
				title={<span className="text-white">Vote from your Home!</span>}
				src={`/home/OnlineVoteLaptop.webp`}
				showGradient={false}
			/>
			<BentoGridSection />
			<FaqSection />
		</main>
	);
}
