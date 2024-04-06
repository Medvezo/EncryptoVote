import { DirectionAwareHover } from "@/components/ui/direction-aware-hover";
import Link from "next/link";

export default function page() {
	return (
		<main className="flex justify-center items-center flex-col h-screen gap-16">
			<header>
				<h2 className="text-center text-4xl text-blue-500 font-bold">
					Sign in for
				</h2>
			</header>
			<section className="flex flex-col sm:flex-row gap-5 px-5 ">
				<Link href="/signup">
					<DirectionAwareHover
						childrenClassName="flex justify-center items-end h-full w-full"
						imageUrl="/CompanyVotingHands.webp">
						<p className="text-3xl font-bold bg-black/50 rounded-2xl p-1 text-amber-500">
							Company
						</p>
					</DirectionAwareHover>
				</Link>
				<Link href="/signup">
					<DirectionAwareHover
						childrenClassName="flex justify-center items-end h-full w-full"
						imageUrl="/SingleVoterHand.webp">
						<p className="text-3xl font-bold bg-black/50 rounded-2xl p-1 text-amber-500">
							Voter
						</p>
					</DirectionAwareHover>
				</Link>
			</section>
		</main>
	);
}
