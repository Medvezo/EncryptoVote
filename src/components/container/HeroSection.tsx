import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";

export default function HeroSection() {
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
		<section className="flex flex-col items-center justify-center h-[50vh]  ">
			<p className="text-neutral-600 dark:text-neutral-200 text-xs sm:text-base  ">
				The road to <b className="text-blue-800">justice</b> starts from here
			</p>
			<TypewriterEffectSmooth words={headerWords} />
		</section>
	);
}
