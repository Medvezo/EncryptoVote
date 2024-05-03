const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Ballot Contract", function () {
	let Ballot;
	let ballot;
	let owner;
	let voter1;
	let voter2;

	beforeEach(async function () {
		[owner, voter1, voter2] = await ethers.getSigners();
		Ballot = await ethers.getContractFactory("Ballot");
		ballot = await Ballot.deploy();
	});

	describe("Poll Management", function () {
		it("Should allow owner to create a poll", async function () {
			await ballot.createPoll(["Alice", "Bob"]);

			const poll = await ballot.polls(0);
			expect(poll.isActive).to.equal(true);
		});

		it("Should allow owner to give voting rights", async function () {
			await ballot.createPoll(["Alice", "Bob"]);
			await ballot.giveRightToVote(0, voter1.address);

			const voterDetails = await ballot.getVoter(0, voter1.address);
			expect(voterDetails.weight).to.equal(1);
		});

		it("Should allow voters to cast votes", async function () {
			await ballot.createPoll(["Alice", "Bob"]);
			await ballot.giveRightToVote(0, voter1.address);

			await ballot.connect(voter1).vote(0, 0); // voter1 votes for Alice
			
			const candidate = await ballot.getCandidate(0, 0);
			expect(candidate.voteCount).to.equal(1);
		});

		it("Should prevent voting by non-authorized voters", async function () {
			await ballot.createPoll(["Alice", "Bob"]);
			
			await expect(ballot.connect(voter2).vote(0, 0))
				.to.be.revertedWith("No right to vote."); 
		});

		it("Should correctly determine the winning candidate", async function () {
			await ballot.createPoll(["Alice", "Bob"]);
			await ballot.giveRightToVote(0, voter1.address);
			await ballot.giveRightToVote(0, voter2.address);

			await ballot.connect(voter1).vote(0, 1); // Voter 1 votes for Bob
			await ballot.connect(voter2).vote(0, 1); // Voter 2 also votes for Bob
			
			await ballot.endPoll(0); 
			const winner = await ballot.getWinningCandidate(0);
			expect(winner).to.equal("Bob");
		});
	});
});
