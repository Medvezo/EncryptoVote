"use client";

import TestButtons from "../common/TestButtons";
import ManageCreatedPollSection from "./ManageCreatedPollSection";
import VotePollsSection from "./VotePollsSection";

export interface Poll {
	id: number;
	candidates: Candidate[];
}

export interface Candidate {
	name: string;
}

export default function VotingSection() {
	return (
		<div>
			<VotePollsSection />

			<ManageCreatedPollSection />
			<TestButtons />
		</div>
	);
}
