// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

// import "hardhat/console.sol";

contract ElectionFactory {
    struct ElectionDetail {
        address deployedAddress;
        string name;
        string description;
    }

    mapping(string => ElectionDetail) public electionsByEmail;

    function createElection(
        string memory email,
        string memory name,
        string memory description
    ) public {
        require(
            bytes(electionsByEmail[email].name).length == 0,
            "Election already exists."
        );

        Election newElection = new Election(msg.sender, name, description);

        electionsByEmail[email] = ElectionDetail({
            deployedAddress: address(newElection),
            name: name,
            description: description
        });
    }

    function getDeployedElection(
        string memory email
    ) public view returns (ElectionDetail memory) {
        require(
            bytes(electionsByEmail[email].name).length != 0,
            "No election found."
        );
        return electionsByEmail[email];
    }
}

contract Election {
    address public electionAuthority;
    string public electionName;
    string public electionDescription;

    struct Candidate {
        string name;
        string description;
        string imgHash;
        uint256 voteCount;
    }

    struct Voter {
        uint256 candidateIdVoted;
        bool voted;
    }

    mapping(uint256 => Candidate) public candidates;
    mapping(address => Voter) public voters;

    uint256 public numCandidates;
    uint256 public numVoters;

    constructor(
        address authority,
        string memory name,
        string memory description
    ) {
        electionAuthority = authority;
        electionName = name;
        electionDescription = description;
    }

    modifier onlyOwner() {
        require(msg.sender == electionAuthority, "Error: Access Denied.");
        _;
    }

    function addCandidate(
        string memory candidateName,
        string memory candidateDescription,
        string memory imgHash
    ) public onlyOwner {
        candidates[numCandidates++] = Candidate({
            name: candidateName,
            description: candidateDescription,
            imgHash: imgHash,
            voteCount: 0
        });
    }

    function vote(uint256 candidateID) public {
        require(!voters[msg.sender].voted, "Error: You cannot double vote.");

        voters[msg.sender] = Voter({
            candidateIdVoted: candidateID,
            voted: true
        });

        numVoters++;
        candidates[candidateID].voteCount++;
    }

    function winnerCandidate() public view onlyOwner returns (uint256) {
        uint256 largestVotes = 0;
        uint256 candidateID = 0;

        for (uint256 i = 0; i < numCandidates; i++) {
            if (candidates[i].voteCount > largestVotes) {
                largestVotes = candidates[i].voteCount;
                candidateID = i;
            }
        }
        return candidateID;
    }

    function getElectionDetails()
        public
        view
        returns (string memory, string memory)
    {
        return (electionName, electionDescription);
    }
}
