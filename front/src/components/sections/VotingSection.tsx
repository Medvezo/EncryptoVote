"use client";

import TestButtons from "../common/TestButtons";
import ManageCreatedPollSection from "./ManageCreatedPollSection";
import VotePollsSection from "./VotePollsSection";

export interface Poll {
	id: number;
	candidates: Candidate[];
	isActive?: boolean;
}

export interface Candidate {
	name: string;
}

export default function VotingSection() {
	return (
		<div className="flex flex-col gap-10">
			<VotePollsSection />
			<ManageCreatedPollSection />
			<TestButtons />
		</div>
	);
}
