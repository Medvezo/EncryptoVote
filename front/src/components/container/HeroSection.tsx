import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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
		<section className="flex flex-col gap-20 items-center justify-center mt-24  ">
			<div className="flex justify-center items-center flex-col">
				<p className="text-neutral-600 dark:text-neutral-200 text-xs sm:text-base  ">
					The road to <b className="text-blue-500">justice</b> starts from{" "}
					<b className="text-teal-500">privacy</b>
				</p>
				<TypewriterEffectSmooth words={headerWords} />
			</div>
			<div className="flex gap-10  ">
				<Button variant={"accent"} asChild>
					<Link href={"/login"} className="font-semibold text-xl">
						{" "}
						Vote{" "}
					</Link>
				</Button>
				<Button variant={"secondary"} asChild className="text-xl">
					<Link href={"#bentoGridSection"}>Learn More</Link>
				</Button>
			</div>
		</section>
	);
}
