import { DirectionAwareHover } from "@/components/ui/direction-aware-hover";

export default function page() {
	return (
		<main className="flex justify-center items-center flex-col h-screen gap-16">
			<header>
				<h2 className="text-center text-4xl text-blue-500 font-bold">
					Sign in for
				</h2>
			</header>
			<section className="flex gap-5 px-5 ">
				<DirectionAwareHover
					childrenClassName="flex justify-center items-end h-full w-full"
					imageUrl="/CompanyVotingHands.jpg">
					<p className="text-3xl font-bold bg-black/50 rounded-2xl p-1 text-amber-500">
						Company
					</p>
				</DirectionAwareHover>
				<DirectionAwareHover
					childrenClassName="flex justify-center items-end h-full w-full"
					imageUrl="/SingleVoterHand.png">
					<p className="text-3xl font-bold bg-black/50 rounded-2xl p-1 text-amber-500">
						Voter
					</p>
				</DirectionAwareHover>
			</section>
		</main>
	);
}
