import { MacbookScroll } from "@/components/ui/macbook-scroll";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import { headerWords } from "@/lib/const";

export default function Home() {
	return (
		<main className="flex flex-col justify-center items-center min-h-screen">

			{/* TypeWriter Header */}
			<div className="flex flex-col items-center justify-center h-[50vh]  ">
				<p className="text-neutral-600 dark:text-neutral-200 text-xs sm:text-base  ">
					The road to freedom starts from here
				</p>
				<TypewriterEffectSmooth words={headerWords} />
			</div>

			<MacbookScroll
				title={<span className="text-white">Vote from your Home!</span>}
				src={`/linear.webp`}
				showGradient={false}
			/>
			<div className="min-h-[400vh]">a</div>
		</main>
	);
}
