const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Ballot Contract", function () {
	let Ballot;
	let ballot;
	let owner;
	let addr1;
	let addr2;
	let candidates = ["Alice", "Bob"];

	beforeEach(async function () {
		[owner, addr1, addr2] = await ethers.getSigners();
		Ballot = await ethers.getContractFactory("Ballot");
		ballot = await Ballot.deploy(candidates);
	});

	describe("Deployment", function () {
		it("Should set the right owner", async function () {
			expect(await ballot.chairperson()).to.equal(owner.address);
		});

		it("Should assign the correct initial candidates", async function () {
			expect((await ballot.candidates(0)).name).to.equal("Alice");
			expect((await ballot.candidates(1)).name).to.equal("Bob");
		});
	});

	describe("Voting", function () {
		beforeEach(async function () {
			await ballot.startVote(); // Ensure voting is started
		});

		it("Allows a voter to cast a vote", async function () {
			await ballot.giveRightToVote(addr1.address);
			await ballot.connect(addr1).vote(1);
			const candidateBob = await ballot.candidates(1);
			expect(candidateBob.voteCount).to.equal(1);
		});

		it("Prevents double voting", async function () {
			await ballot.giveRightToVote(addr1.address);
			await ballot.connect(addr1).vote(0);
			await expect(ballot.connect(addr1).vote(0)).to.be.revertedWith(
				"Already voted."
			);
		});
	});

	describe("Management", function () {
		it("Allows only chairperson to start and end voting", async function () {
			await expect(ballot.connect(addr1).startVote()).to.be.revertedWith(
				"Only chairperson can start and end the voting"
			);
			await ballot.startVote();
			await expect(ballot.startVote()).to.be.revertedWith(
				"it must be in Started"
			);
		});
	});
});
