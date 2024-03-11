import { DirectionAwareHover } from "@/components/ui/direction-aware-hover";

export default function page() {
	return (
		<main className="">
            <header >
                <h2 className="text-center text-4xl py-10 text-blue-500 font-bold">Choose your side</h2>
            </header>
			<section className="flex gap-5 px-5">
				<DirectionAwareHover imageUrl="/CompanyVotingHands.jpg">
					<p>Company</p>
				</DirectionAwareHover>
				<DirectionAwareHover imageUrl="/SingleVoterHand.png">
					<p>Voter</p>
				</DirectionAwareHover>
			</section>
		</main>
	);
}
