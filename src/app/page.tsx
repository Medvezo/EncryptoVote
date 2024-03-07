import { MacbookScroll } from "@/components/ui/macbook-scroll";

export default function Home() {
	return (
		<main className="flex flex-col justify-center items-center min-h-screen">
			<MacbookScroll
				title={
					<span className="text-white">
						Vote from your Home!
					</span>
      }
				src={`/linear.webp`}
				showGradient={false}
			/>
		</main>
	);
}
