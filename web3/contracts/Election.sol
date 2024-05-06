// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;
pragma abicoder v2;

/**
 * @title Ballot
 * @dev Implements voting process along with vote delegation and multiple polls management
 */
contract Ballot {
    struct Voter {
        uint256 weight;
        bool voted; // whether person already voted or not
        uint256 vote; // index of the voted proposal
    }

    struct Candidate {
        string name;
        uint256 voteCount;
    }

    struct Poll {
        mapping(address => Voter) voters;
        Candidate[] candidates;
        address chairperson;
        bool isActive;
    }

    mapping(uint256 => Poll) public polls;
    uint256 public nextPollId;

    // Events
    event PollCreated(uint256 pollId, string[] candidateNames);
    event VoteCast(uint256 pollId, uint256 candidateIndex);
    event PollStatusChanged(uint256 pollId, bool isActive);

    // getters
    function getVoter(
        uint256 pollId,
        address voter
    ) public view returns (Voter memory) {
        return polls[pollId].voters[voter];
    }

    function getCandidate(
        uint256 pollId,
        uint256 candidateIndex
    ) public view returns (Candidate memory) {
        return polls[pollId].candidates[candidateIndex];
    }

    // Create a new poll with initial candidates
    function createPoll(string[] memory candidateNames) public {
        Poll storage p = polls[nextPollId];
        p.chairperson = msg.sender;
        p.isActive = true;
        for (uint256 i = 0; i < candidateNames.length; i++) {
            p.candidates.push(
                Candidate({name: candidateNames[i], voteCount: 0})
            );
        }
        emit PollCreated(nextPollId, candidateNames); // Emit before incrementing
        nextPollId++;
    }

    // Give a voter the right to vote on a specific poll
    function giveRightToVote(uint256 pollId, address voter) public {
        require(
            msg.sender == polls[pollId].chairperson,
            "Only chairperson can give voting rights."
        );
        require(!polls[pollId].voters[voter].voted, "The voter already voted.");
        require(
            polls[pollId].voters[voter].weight == 0,
            "Voter already has voting rights."
        );

        polls[pollId].voters[voter].weight = 1;
    }

    // Cast a vote on a specific poll
    function vote(uint256 pollId, uint256 candidateIndex) public {
        Poll storage p = polls[pollId];
        require(p.isActive, "Poll is not active.");
        Voter storage sender = p.voters[msg.sender];
        require(sender.weight != 0, "No right to vote.");
        require(!sender.voted, "Already voted.");

        sender.voted = true;
        sender.vote = candidateIndex;
        p.candidates[candidateIndex].voteCount += sender.weight;
        emit VoteCast(pollId, candidateIndex);
    }

    // End the voting period for a poll
    function endPoll(uint256 pollId) public {
        require(
            msg.sender == polls[pollId].chairperson,
            "Only chairperson can end the poll."
        );
        require(polls[pollId].isActive, "Poll is already ended.");

        polls[pollId].isActive = false;
        emit PollStatusChanged(pollId, false);
    }

    // Fetch polls where the user has voting rights
    function getEligiblePolls(
        address voter
    ) public view returns (uint256[] memory) {
        uint256[] memory eligiblePolls = new uint256[](nextPollId);
        uint256 count = 0;
        for (uint256 i = 0; i < nextPollId; i++) {
            if (polls[i].voters[voter].weight > 0) {
                eligiblePolls[count] = i;
                count++;
            }
        }
        return trimArray(eligiblePolls, count);
    }

    // Helper function to trim the array size
    function trimArray(
        uint256[] memory array,
        uint256 length
    ) private pure returns (uint256[] memory) {
        uint256[] memory trimmedArray = new uint256[](length);
        for (uint256 i = 0; i < length; i++) {
            trimmedArray[i] = array[i];
        }
        return trimmedArray;
    }

    function getCandidates(
        uint256 pollId
    ) public view returns (Candidate[] memory) {
        return polls[pollId].candidates;
    }

    // Get the winning candidate for a poll
    function getWinningCandidate(
        uint256 pollId
    ) public view returns (string memory winnerName) {
        Poll storage p = polls[pollId];
        require(!p.isActive, "Poll is still active.");

        uint256 winningVoteCount = 0;
        for (uint256 i = 0; i < p.candidates.length; i++) {
            if (p.candidates[i].voteCount > winningVoteCount) {
                winningVoteCount = p.candidates[i].voteCount;
                winnerName = p.candidates[i].name;
            }
        }
    }
}
