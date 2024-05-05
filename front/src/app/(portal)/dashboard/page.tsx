import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

// import AddVoteModal from "@/components/container/AddVoteModal";
import dynamic from "next/dynamic";
import VotingSection from "@/components/sections/VotingSection";
const AddPollModal = dynamic(
	() => import("@/components/container/AddPollModal"),
	{
		ssr: false,
		loading: () => (
			<Button
				size="sm"
				variant={"accent"}
				className="h-8 gap-1 font-semibold text-lg"
			>
				<PlusCircle className="h-5 w-5 " />
				Add Poll
			</Button>
		),
	}
);

export default function Dashboard() {
	return (
		<div className="flex min-h-screen w-full flex-col bg-muted/40">
			<main className="flex flex-1 items-center justify-center flex-col gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
				<section className="h-full w-full">
					<Card x-chunk="dashboard-06-chunk-0" className="h-full ">
						<CardHeader className="flex flex-row flex-wrap	 justify-between items-center">
							<div>
								<CardTitle>Polls</CardTitle>
								<CardDescription>
									Make your votes from one page.
								</CardDescription>
							</div>
							<AddPollModal />
						</CardHeader>
						<CardContent>
							<VotingSection />
						</CardContent>
					</Card>
				</section>
			</main>
		</div>
	);
}
