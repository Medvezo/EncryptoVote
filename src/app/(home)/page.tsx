import BentoGridSection from "@/components/container/BentoGridSection";
import HeroSection from "@/components/container/HeroSection";
import { MacbookScroll } from "@/components/ui/macbook-scroll";

export default function Home() {
	return (
		<main className="flex flex-col justify-center items-center min-h-screen">
			<HeroSection />
			<MacbookScroll
				title={<span className="text-white">Vote from your Home!</span>}
				src={`/OnlineVoteLaptop.jpg`}
				showGradient={false}
			/>
			<BentoGridSection />
		</main>
	);
}
