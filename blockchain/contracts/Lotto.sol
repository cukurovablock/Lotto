// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "../node_modules/@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol";
import "../node_modules/@chainlink/contracts/src/v0.8/vrf/VRFConsumerBaseV2.sol";
import "../node_modules/@chainlink/contracts/src/v0.8/shared/access/ConfirmedOwner.sol";
import "../node_modules/@chainlink/contracts/src/v0.8/shared/interfaces/LinkTokenInterface.sol";
import {Counters} from "../node_modules/@openzeppelin/contracts-v0.7/utils/Counters.sol";
import {EnumerableSet} from "../node_modules/@openzeppelin/contracts/utils/structs/EnumerableSet.sol";
import {Pausable} from "../node_modules/@openzeppelin/contracts/utils/Pausable.sol";

contract Lotto is VRFConsumerBaseV2, ConfirmedOwner {
    using Counters for Counters.Counter;
    using EnumerableSet for EnumerableSet.UintSet;

    Counters.Counter public giveawayCounter;
    EnumerableSet.UintSet private liveGiveaways;
    mapping(uint256 => GiveawayInstance) public giveaways;
    mapping(uint256 => uint256) public requestIdToGiveawayIndex;

    mapping(uint256 => RequestStatus)
        public s_requests; /* requestId --> requestStatus */

    VRFCoordinatorV2Interface COORDINATOR;
    bytes32 keyHash =
        0x354d2f95da55398f44b7cff77da56283d9c6c829a4bdf1bbcaf2ad6a4d081f61;
    uint32 callbackGasLimit = 1000000;
    uint16 requestConfirmations = 5;

    // Chainlink sub id
    uint64 s_subscriptionId;

    constructor(
        uint64 subscriptionId
    )
        VRFConsumerBaseV2(0x2eD832Ba664535e5886b75D64C46EB9a228C2610)
        ConfirmedOwner(msg.sender)
    {
        COORDINATOR = VRFCoordinatorV2Interface(
            0x2eD832Ba664535e5886b75D64C46EB9a228C2610
        );
        s_subscriptionId = subscriptionId;
    }

    // ------------------- STRUCTS -------------------
    enum GiveawayState {
        //STAGED,
        LIVE,
        FINISHED,
        // RESOLVING,
        CANCELLED
    }

    struct GiveawayInstance {
        GiveawayBase base;
        address owner;
        string giveawayName;
        address[] winners;
        address[] participants;
        RequestStatus requestStatus;
        uint256 timeLength;
        GiveawayState giveawayState;
        uint256 maxParticipants;
        uint256 amount;
        address[] claimedWinners;
        //Prize prize;
    }

    struct GiveawayBase {
        uint256 id;
        uint256 startDate;
        uint8 totalWinners;
    }

    struct RequestStatus {
        uint256 requestId;
        bool exists;
        bool fulfilled;
        uint256[] randomWords;
        uint32 nums;
        // uint256 upkeepId;
    }

    // struct Prize {
    //     string prizeName;
    //     bytes32[] claimedPrizes;
    // }

    // struct RequestConfig {
    //     uint32 callbackGasLimit;
    //     uint16 requestConfirmations;
    //     uint32 numWords;
    //     uint32 automationGasLimit;
    // }

    //------------------------------ EVENTS ----------------------------------
    event GiveawayCreated(
        address indexed owner,
        uint prize,
        uint id,
        uint256 indexed timeLength,
        uint256 startDate,
        string name,
        uint maxParticipants,
        uint8 totalWinners
    );
    event GiveawayJoined(uint256 indexed giveawayId, address indexed player);
    event GiveawayClosed(uint256 indexed giveawayId, address[] participants);
    //event GiveawayStaged(uint256 indexed giveawayId);
    // event GiveawayCancelled(uint256 indexed giveawayId);
    event GiveawayWon(uint256 indexed giveawayId, address[] indexed winners);
    event GiveawayPrizeClaimed(
        uint256 indexed giveawayId,
        address indexed winner,
        uint256 value
    );
    // event GiveawayOwnerUpdated(
    //     uint256 indexed giveawayId,
    //     address oldOwner,
    //     address newOwner
    // );

    //------------------------------ MODIFIER ----------------------------------

    modifier onlyGiveawayOwner(uint256 giveawayId) {
        require(giveaways[giveawayId].owner == msg.sender);
        _;
    }

    //----------------------------Random words functions
    function requestRandomWords(
        uint32 _nums
    ) internal returns (uint256 requestId) {
        // Will revert if subscription is not set and funded.
        requestId = COORDINATOR.requestRandomWords(
            keyHash,
            s_subscriptionId,
            requestConfirmations,
            callbackGasLimit,
            _nums
        );
        s_requests[requestId] = RequestStatus({
            requestId: requestId,
            randomWords: new uint256[](0),
            exists: true,
            fulfilled: false,
            nums: _nums
        });
        return requestId;
    }

    function fulfillRandomWords(
        uint256 _requestId,
        uint256[] memory _randomWords
    ) internal override {
        require(s_requests[_requestId].exists, "request not found");
        s_requests[_requestId].fulfilled = true;
        s_requests[_requestId].randomWords = _randomWords;
    }

    function getNums(
        uint256[] memory randomNumbers,
        uint256 participantCount
    ) internal pure returns (uint256[] memory) {
        for (uint i = 0; i < randomNumbers.length; i++) {
            randomNumbers[i] = randomNumbers[i] % participantCount;
        }
        return randomNumbers;
    }

    function getRequestStatus(
        uint256 _requestId
    ) external view returns (bool fulfilled, uint256[] memory randomWords) {
        require(s_requests[_requestId].exists, "request not found");
        RequestStatus memory request = s_requests[_requestId];
        return (request.fulfilled, request.randomWords);
    }

    //--------------------GIVEAWAY FUNC----------------------//

    receive() external payable {}

    fallback() external payable {}


    // To create a giveaway, the total winners must not be greater than 10.
    // The owner must send the prize amount.
    // The owner must send the time length.
    // The owner must send the name.
    // The owner must send the max participants.
    // The owner must send the total winners.
    function createGiveaway(
        address sender,
        uint256 timeLength,
        string memory name,
        uint8 totalWinners,
        uint256 maxParticipants
    ) public payable returns (uint256, bool) {
        require(
            totalWinners <= 10,
            "Max total winners must not be greater than 10"
        );
        (bool sent, bytes memory data) = address(this).call{value: msg.value}(
            "Prize amount"
        );
        require(sent, "Failed to send Avax");
        GiveawayInstance memory newGiveaway = GiveawayInstance({
            base: GiveawayBase({
                id: giveawayCounter.current(),
                startDate: block.timestamp,
                totalWinners: totalWinners
            }),
            amount: msg.value,
            claimedWinners: new address[](0),
            participants: new address[](0),
            maxParticipants: maxParticipants,
            timeLength: timeLength,
            owner: sender,
            giveawayName: name,
            winners: new address[](0),
            requestStatus: RequestStatus({
                requestId: 0,
                exists: true,
                fulfilled: false,
                randomWords: new uint256[](0),
                nums: totalWinners
            }),
            giveawayState: GiveawayState.LIVE
        });
        giveaways[giveawayCounter.current()] = newGiveaway;
        liveGiveaways.add(giveawayCounter.current());
        giveawayCounter.increment();
        emit GiveawayCreated(
            sender,
            msg.value,
            giveawayCounter.current() - 1,
            timeLength,
            block.timestamp,
            name,
            maxParticipants,
            totalWinners
        );
        return (giveawayCounter.current() - 1, true);
    }

    // To enter the giveaway, the giveaway must be live.
    // The time must not be ended.
    // The giveaway must not be full.
    function enterGiveaway(uint256 giveawayId) external {
        require(
            giveaways[giveawayId].giveawayState == GiveawayState.LIVE,
            "Giveaway is not live"
        );
        require(
            block.timestamp <=
                giveaways[giveawayId].base.startDate +
                    giveaways[giveawayId].timeLength,
            "Giveaway's time has ended"
        );
        require(
            giveaways[giveawayId].participants.length <
                giveaways[giveawayId].maxParticipants,
            "Giveaway is full"
        );
        giveaways[giveawayId].participants.push(msg.sender);
        emit GiveawayJoined(giveawayId, msg.sender);
    }


    // To pick a winner from the giveaway, the giveaway must be live.
    // The time must be ended.
    // The owner can only close the giveaway once.
    function closeGiveaway(
        uint256 giveawayId
    ) external onlyGiveawayOwner(giveawayId) {
        require(
            giveaways[giveawayId].giveawayState == GiveawayState.LIVE,
            "Giveaway is not live"
        );
        require(
            block.timestamp >
                giveaways[giveawayId].base.startDate +
                    giveaways[giveawayId].timeLength,
            "Giveaway's time has not ended"
        );
        giveaways[giveawayId].giveawayState = GiveawayState.FINISHED;
        giveaways[giveawayId].requestStatus.requestId = requestRandomWords(
            giveaways[giveawayId].requestStatus.nums
        );
        requestIdToGiveawayIndex[
            giveaways[giveawayId].requestStatus.requestId
        ] = giveawayId;
        emit GiveawayClosed(giveawayId, giveaways[giveawayId].participants);
    }
 
    // cancelGiveaway is used when the owner wants to cancel the giveaway.
    function cancelGiveaway(
        uint256 giveawayId
    ) external onlyGiveawayOwner(giveawayId) {
        require(
            giveaways[giveawayId].giveawayState == GiveawayState.LIVE,
            "Giveaway is not live"
        );
        giveaways[giveawayId].giveawayState = GiveawayState.CANCELLED;
        liveGiveaways.remove(giveawayId);
        // There is no need to pay back to the owner at now.
        emit GiveawayClosed(giveawayId, giveaways[giveawayId].participants);
    }

    // To resolve the giveaway, the giveaway must be finished, and the time must be ended.
    // The random words must be fulfilled.
    function resolveGiveaway(
        uint256 giveawayId
    ) external onlyGiveawayOwner(giveawayId) {
        require(
            giveaways[giveawayId].giveawayState == GiveawayState.FINISHED,
            "Giveaway is not finished"
        );
        require(
            block.timestamp >
                giveaways[giveawayId].base.startDate +
                    giveaways[giveawayId].timeLength,
            "Giveaway's time has not ended"
        );
        require(
            giveaways[giveawayId].requestStatus.fulfilled,
            "Random words not fulfilled, try again 2 minutes later"
        );
        //giveaways[giveawayId].giveawayState = GiveawayState.FINISHED;
        giveaways[giveawayId].requestStatus.randomWords = getNums(
            giveaways[giveawayId].requestStatus.randomWords,
            giveaways[giveawayId].participants.length
        );
        for (uint256 i = 0; i < giveaways[giveawayId].requestStatus.nums; i++) {
            giveaways[giveawayId].winners.push(
                giveaways[giveawayId].participants[
                    giveaways[giveawayId].requestStatus.randomWords[i]
                ]
            );
        }
        liveGiveaways.remove(giveawayId);
        emit GiveawayWon(giveawayId, giveaways[giveawayId].winners);
    }

    // To claim prize, the giveaway must be finished, and the time must be ended.
    // The winner can only claim the prize once.
    // The winner can only claim the prize if the random words are fulfilled.
    // The winner can only claim the prize if the winner is in the winners array.
    // The winner can only claim the prize if the winner is not in the claimedWinners array.
    function claimPrize(uint256 giveawayId) external {
        require(
            giveaways[giveawayId].giveawayState == GiveawayState.FINISHED,
            "Giveaway is not finished"
        );
        require(
            block.timestamp >
                giveaways[giveawayId].base.startDate +
                    giveaways[giveawayId].timeLength,
            "Giveaway's time has not ended"
        );
        require(
            giveaways[giveawayId].requestStatus.fulfilled,
            "Random words not fulfilled"
        );
        require(giveaways[giveawayId].winners.length > 0, "No winners yet");
        for (
            uint256 i = 0;
            i < giveaways[giveawayId].claimedWinners.length;
            i++
        ) {
            require(
                giveaways[giveawayId].claimedWinners[i] != msg.sender,
                "You have already claimed your prize"
            );
        }
        bool eligible = false;
        for (uint256 i = 0; i < giveaways[giveawayId].winners.length; i++) {
            if (giveaways[giveawayId].winners[i] == msg.sender) {
                eligible = true;
                break;
            }
        }
        require(eligible, "You are not eligible to claim this prize");
        //payable(msg.sender).transfer(giveaways[giveawayId].amount / giveaways[giveawayId].winners.length);
        uint256 prize = giveaways[giveawayId].amount /
            giveaways[giveawayId].winners.length;
        (bool sent, bytes memory data) = payable(msg.sender).call{value: prize}(
            "Claiming prize"
        );
        require(sent, "Failed to send Avax");
        giveaways[giveawayId].claimedWinners.push(msg.sender);
        emit GiveawayPrizeClaimed(
            giveawayId,
            msg.sender,
            giveaways[giveawayId].amount / giveaways[giveawayId].winners.length
        );
    }

    //------------------------------ VIEW FUNC ----------------------------------

    function getGiveaway(
        uint256 giveawayId
    ) external view returns (GiveawayInstance memory) {
        return giveaways[giveawayId];
    }

    function getLiveGiveaways() external view returns (uint256[] memory) {
        uint256[] memory liveGiveawaysArray = new uint256[](
            liveGiveaways.length()
        );
        for (uint256 i = 0; i < liveGiveaways.length(); i++) {
            liveGiveawaysArray[i] = liveGiveaways.at(i);
        }
        return liveGiveawaysArray;
    }

    function getFinishedGiveaways() external view returns (uint256[] memory) {
        uint256[] memory finishedGiveawaysArray = new uint256[](
            giveawayCounter.current() - liveGiveaways.length()
        );
        uint256 j = 0;
        for (uint256 i = 0; i < giveawayCounter.current(); i++) {
            if (giveaways[i].giveawayState == GiveawayState.FINISHED) {
                finishedGiveawaysArray[j] = i;
                j++;
            }
        }
        return finishedGiveawaysArray;
    }

    function getCancelledGiveaways() external view returns (uint256[] memory) {
        uint256[] memory cancelledGiveawaysArray = new uint256[](
            giveawayCounter.current() - liveGiveaways.length()
        );
        uint256 j = 0;
        for (uint256 i = 0; i < giveawayCounter.current(); i++) {
            if (giveaways[i].giveawayState == GiveawayState.CANCELLED) {
                cancelledGiveawaysArray[j] = i;
                j++;
            }
        }
        return cancelledGiveawaysArray;
    }

    function getGiveawayClaimedWinners(
        uint256 giveawayId
    ) external view returns (address[] memory) {
        return giveaways[giveawayId].claimedWinners;
    }

    function getOwnerGiveaways(
        address giveawayOwner
    ) external view returns (uint256[] memory) {
        uint256[] memory ownerGiveawaysArray = new uint256[](
            giveawayCounter.current()
        );
        uint256 j = 0;
        for (uint256 i = 0; i < giveawayCounter.current(); i++) {
            if (giveaways[i].owner == giveawayOwner) {
                ownerGiveawaysArray[j] = i;
                j++;
            }
        }
        return ownerGiveawaysArray;
    }

    function getGiveawayParticipants(
        uint256 giveawayId
    ) external view returns (address[] memory) {
        return giveaways[giveawayId].participants;
    }

    function getGiveawayWinners(
        uint256 giveawayId
    ) external view returns (address[] memory) {
        return giveaways[giveawayId].winners;
    }

    function getGiveawayRequestStatus(
        uint256 giveawayId
    ) external view returns (RequestStatus memory) {
        return giveaways[giveawayId].requestStatus;
    }

    function getGiveawayState(
        uint256 giveawayId
    ) external view returns (GiveawayState) {
        return giveaways[giveawayId].giveawayState;
    }

    //------------------------------ OWNER FUNC ----------------------------------

    function withdrawAll(uint256 amount) external onlyOwner {
        (bool sent, bytes memory data ) = msg.sender.call{value: amount}("");
        require(sent, "Failed to send Ether");
    }

    // function withdrawLink() external onlyOwner {
    //     LinkTokenInterface linkToken = LinkTokenInterface(
    //         COORDINATOR.getLinkToken()
    //     );
    //     require(
    //         linkToken.transfer(msg.sender, linkToken.balanceOf(address(this))),
    //         "Unable to transfer"
    //     );
    // }

    function setSubscriptionId(uint64 subscriptionId) external onlyOwner {
        s_subscriptionId = subscriptionId;
    }

    function setCallbackGasLimit(uint32 _callbackGasLimit) external onlyOwner {
        callbackGasLimit = _callbackGasLimit;
    }

    function setRequestConfirmations(
        uint16 _requestConfirmations
    ) external onlyOwner {
        requestConfirmations = _requestConfirmations;
    }
}
