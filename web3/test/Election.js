const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("ElectionFactory and Election Contracts", function () {
    let ElectionFactory, electionFactory, Election, owner, addr1, addr2;

    beforeEach(async function () {
        // Get contract factories and signers
        ElectionFactory = await ethers.getContractFactory("ElectionFactory");
        Election = await ethers.getContractFactory("Election");
        [owner, addr1, addr2] = await ethers.getSigners();

        // Deploy the ElectionFactory contract
        electionFactory = await ElectionFactory.deploy();
    });

    describe("ElectionFactory deployment", function () {
        it("Should deploy the ElectionFactory", async function () {
            expect(electionFactory.address).to.be.properAddress;
        });
    });

    describe("Election creation", function () {
        it("Should create a new Election and store its address", async function () {
            const email = "test@example.com";
            const name = "Test Election";
            const description = "A test election";

            await electionFactory.createElection(email, name, description);
            const deployedElection = await electionFactory.getDeployedElection(email);

            expect(deployedElection.deployedAddress).to.be.properAddress;
            expect(deployedElection.name).to.equal(name);
            expect(deployedElection.description).to.equal(description);
        });

        it("Should revert if an election is created with the same email", async function () {
            const email = "duplicate@example.com";
            await electionFactory.createElection(email, "Initial Election", "Initial Description");

            await expect(
                electionFactory.createElection(email, "Duplicate Election", "Duplicate Description")
            ).to.be.revertedWith("Election already exists.");
        });
    });

    describe("Election interactions", function () {
        let election;

        beforeEach(async function () {
            const email = "unique@example.com";
            await electionFactory.createElection(email, "New Election", "Description");
            const deployedElectionDetail = await electionFactory.getDeployedElection(email);
            election = Election.attach(deployedElectionDetail.deployedAddress);
        });

        it("Should allow owner to add candidates", async function () {
            const candidateName = "Candidate 1";
            const candidateDescription = "Description 1";
            const imgHash = "imagehash123";

            await election.addCandidate(candidateName, candidateDescription, imgHash);
            const candidate = await election.getCandidate(0);

            expect(candidate.name).to.equal(candidateName);
            expect(candidate.voteCount).to.equal(0);
        });

        it("Should allow voters to vote and prevent double voting", async function () {
            await election.addCandidate("Candidate 1", "Description 1", "img1");
            await election.connect(addr1).vote(0);

            await expect(election.connect(addr1).vote(0)).to.be.revertedWith("Error: You cannot double vote");

            const candidate = await election.getCandidate(0);
            expect(candidate.voteCount).to.equal(1);
        });
    });

    describe("Access Control", function () {
        let election;

        beforeEach(async function () {
            const email = "accesscontrol@example.com";
            await electionFactory.createElection(email, "Restricted Election", "Restricted Description");
            const deployedElectionDetail = await electionFactory.getDeployedElection(email);
            election = Election.attach(deployedElectionDetail.deployedAddress);
        });

        it("Should prevent non-owners from adding candidates", async function () {
            await expect(
                election.connect(addr1).addCandidate("Unauthorized", "No Access", "nohash")
            ).to.be.revertedWith("Error: Access Denied.");
        });
    });
});
