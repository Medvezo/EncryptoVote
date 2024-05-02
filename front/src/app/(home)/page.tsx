import BentoGridSection from "@/components/container/BentoGridSection";
import HeroSection from "@/components/container/HeroSection";
import { MacbookScroll } from "@/components/ui/macbook-scroll";

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
		</main>
	);
}
