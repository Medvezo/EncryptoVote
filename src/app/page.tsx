import BentoGridSection from "@/components/container/BentoGridSection";
import { MacbookScroll } from "@/components/ui/macbook-scroll";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";

export default function Home() {
	const headerWords = [
		{
			text: "Trust",
		},
		{
			text: "your",
		},
		{
			text: "Vote.",
			className: "text-blue-500 dark:text-blue-500",
		},
	];

	return (
		<main className="flex flex-col justify-center items-center min-h-screen">
			{/* TypeWriter Header */}
			<div className="flex flex-col items-center justify-center h-[50vh]  ">
				<p className="text-neutral-600 dark:text-neutral-200 text-xs sm:text-base  ">
					The road to <b className="text-blue-800">justice</b> starts from here
				</p>
				<TypewriterEffectSmooth words={headerWords} />
			</div>
			<MacbookScroll
				title={<span className="text-white">Vote from your Home!</span>}
				src={`/linear.webp`}
				showGradient={false}
			/>
			<BentoGridSection />
		</main>
	);
}
