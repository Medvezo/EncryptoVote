import { DirectionAwareHover } from "@/components/ui/direction-aware-hover";

export default function page() {
	return (
		<main className="">
            <header >
                <h2>Choose your side</h2>
            </header>
			<section className="flex">
				<DirectionAwareHover imageUrl="/CompanyVotingHands.jpg">
					<p>Company</p>
				</DirectionAwareHover>
				<DirectionAwareHover imageUrl="/SingleVoterHand.webp">
					<p>Voter</p>
				</DirectionAwareHover>
			</section>
		</main>
	);
}
