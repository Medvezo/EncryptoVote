// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;
pragma abicoder v2;

/**
 * @title Ballot
 * @dev Implements voting process along with vote delegation and multiple polls management
 */
contract Ballot {
    struct Voter {
        uint weight; 
        bool voted; // whether person already voted or not
        uint vote; // index of the voted proposal
    }

    struct Candidate {
        string name;
        uint voteCount;
    }

    struct Poll {
        mapping(address => Voter) voters;
        Candidate[] candidates;
        address chairperson;
        bool isActive;
    }

    mapping(uint => Poll) public polls;
    uint public nextPollId;

    // Events
    event PollCreated(uint pollId, string[] candidateNames);
    event VoteCast(uint pollId, uint candidateIndex);
    event PollStatusChanged(uint pollId, bool isActive);

    // Create a new poll with initial candidates
    function createPoll(string[] memory candidateNames) public {
        Poll storage p = polls[nextPollId++];
        p.chairperson = msg.sender;
        p.isActive = true;
        for (uint i = 0; i < candidateNames.length; i++) {
            p.candidates.push(
                Candidate({name: candidateNames[i], voteCount: 0})
            );
        }
        emit PollCreated(nextPollId - 1, candidateNames);
    }

    // Give a voter the right to vote on a specific poll
    function giveRightToVote(uint pollId, address voter) public {
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
    function vote(uint pollId, uint candidateIndex) public {
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
    function endPoll(uint pollId) public {
        require(
            msg.sender == polls[pollId].chairperson,
            "Only chairperson can end the poll."
        );
        require(polls[pollId].isActive, "Poll is already ended.");

        polls[pollId].isActive = false;
        emit PollStatusChanged(pollId, false);
    }

    // Get the winning candidate for a poll
    function getWinningCandidate(
        uint pollId
    ) public view returns (string memory winnerName) {
        Poll storage p = polls[pollId];
        require(!p.isActive, "Poll is still active.");

        uint winningVoteCount = 0;
        for (uint i = 0; i < p.candidates.length; i++) {
            if (p.candidates[i].voteCount > winningVoteCount) {
                winningVoteCount = p.candidates[i].voteCount;
                winnerName = p.candidates[i].name;
            }
        }
    }
}
