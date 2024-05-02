// CANDIDATE_NAMES="Mansur,Nicat,Oglan" npx hardhat run scripts/deploy.js
async function main() {
	const candidateNames = process.env.CANDIDATE_NAMES.split(",");
	const Ballot = await ethers.getContractFactory("Ballot");

	try {
		const ballot = await Ballot.deploy(candidateNames);
		console.log("Ballot deployed to:", ballot.target);
	} catch (error) {
		console.error("Failed to deploy the Ballot contract:", error);
	}
}

main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});
