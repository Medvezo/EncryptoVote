const { ethers } = require("hardhat");

async function main() {
	const [deployer] = await ethers.getSigners();
	if (!deployer) {
		console.error("No deployer is available");
		return;
	}

	console.log("Deploying contracts with the account:", deployer.address);
	const accountBalance = await deployer.provider.getBalance(deployer.address);
	console.log("Account balance:", accountBalance.toString());

	const Ballot = await ethers.getContractFactory("Ballot");
	const ballot = await Ballot.deploy();
	await ballot.waitForDeployment();  

	console.log("Ballot contract deployed to:", ballot.target);
}

main()
	.then(() => process.exit(0))
	.catch(error => {
		console.error(error);
		process.exit(1);
	});
