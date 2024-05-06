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
	describe("Advanced Testing of the Ballot Contract", function () {
		let ballot;
		let owner, voter1, voter2, voter3;
		let pollId;

		beforeEach(async function () {
			[owner, voter1, voter2, voter3] = await ethers.getSigners();
			const Ballot = await ethers.getContractFactory("Ballot");
			ballot = await Ballot.deploy();
			await ballot.createPoll(["Alice", "Bob"]);
			pollId = 0; //first poll created is at index 0
		});

		it("Should handle multiple polls independently", async function () {
			// Create another poll
			await ballot.createPoll(["Charlie", "Dana"]);
			await ballot.giveRightToVote(1, voter3.address);
			await ballot.connect(voter3).vote(1, 1); // Dana gets a vote in the second poll

			const candidateBob = await ballot.getCandidate(0, 1);
			const candidateDana = await ballot.getCandidate(1, 1);
			expect(candidateBob.voteCount).to.equal(0);
			expect(candidateDana.voteCount).to.equal(1);
		});

		it("Should not allow voting on non-existent candidates or polls", async function () {
			await ballot.createPoll(["Alice", "Bob"]);
			await ballot.giveRightToVote(0, voter1.address);
		
			await expect(ballot.connect(voter1).vote(10, 0)) // Non-existent poll index
				.to.be.revertedWith("Poll is not active."); 
		});

		it("Should block voting after the poll has ended", async function () {
			await ballot.giveRightToVote(0, voter1.address);
			await ballot.endPoll(0);
			await expect(ballot.connect(voter1).vote(0, 0)).to.be.revertedWith("Poll is not active.");
		});

		it("Should emit events correctly for all actions", async function () {
			await expect(ballot.createPoll(["Eve", "Frank"]))
				.to.emit(ballot, 'PollCreated');
			await ballot.giveRightToVote(1, voter2.address);
			await expect(ballot.connect(voter2).vote(1, 0))
				.to.emit(ballot, 'VoteCast');
			await expect(ballot.endPoll(1))
				.to.emit(ballot, 'PollStatusChanged');
		});

		it("Should prevent unauthorized access", async function () {
			await expect(ballot.connect(voter1).endPoll(0)).to.be.revertedWith("Only chairperson can end the poll.");
		});

		it("Should not restart a poll once ended", async function () {
			await ballot.endPoll(0);
			expect(ballot.startVote).to.be.undefined;
		});
	});

});
