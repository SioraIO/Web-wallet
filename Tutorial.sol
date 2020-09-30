pragma solidity ^0.4.19;

/* 2018-8-22 */
/* K.Goto    */

contract YearEndLottery {

    /** variables **/

    uint constant endtime = 1514646000;

    address admin;
    uint ticketPrice = 3 ether;
    uint numberMaxPerUnit;
    uint lastUnitNumber;

    struct potByUnit {
        uint unitNumber;
        uint pot;
    }
    mapping (uint => potByUnit) potList;

    struct ticket {
        uint ticketIndex;
        uint unitNumber; // uint( ticketIndex / numberMaxPerUnit )
        uint ticketNumber; // ticketIndex % numberMaxPerUnit
        address participant;
    }
    mapping (uint => ticket) ticketList;
    uint totalTickets;

    struct winningGrade {
        uint grade;
        uint winningRate; 
        uint winnersCount;
        mapping (uint => address) winnerOnUnit;
        mapping (uint => uint) winningAmountOnUnit;
        mapping (uint => bool) isTookPot;
    }
    mapping (uint => winningGrade) winningGradeList;
    uint winningGradeListLength;

    uint blockNumberOnLotteryEnd;

    bool betClosed = false;
    bool gameClosed = false;
    bool potTransferred = false;
    bool winnersDetermined = false;


    /** constructor **/

    function YearEndLottery() public {
        admin = msg.sender;
        numberMaxPerUnit = 1000;
        betClosed = false;
        gameClosed = false;
        potTransferred = false;
        winnersDetermined = false;
        lastUnitNumber = 0;
        totalTickets = 0;
        potList[0] = potByUnit(0,0);

        winningGradeListLength = 0;
        while ( winningGradeListLength < 16 ) {
            if ( winningGradeListLength == 0 ) {
                winningGradeList[winningGradeListLength] = winningGrade(1,350,0);
            } 
            if ( winningGradeListLength >= 1 && winningGradeListLength <= 5 ) {
                winningGradeList[winningGradeListLength] = winningGrade(2,20,0);
            }
            if ( winningGradeListLength >= 6 ) {
                winningGradeList[winningGradeListLength] = winningGrade(3,5,0);
            }
            winningGradeListLength++;
        }
    }

    /** modifiers **/

    modifier adminOnly() {
        require(msg.sender == admin);
        _;
    }
    modifier correctPayment() {
        require(msg.value == ticketPrice);
        _;
    }
    modifier betOngoing() {
        require(!betClosed);
        _;
    }
    modifier gameOngoing() {
        require(!gameClosed);
        _;
    }
    modifier afterBetClosed() {
        require(betClosed);
        _;
    }
    modifier afterGameClosed() {
        require(gameClosed);
        _;
    }
    modifier afterWinnersDetermined() {
        require(winnersDetermined);
        _;
    }
    modifier afterPotTransferred() {
        require(potTransferred);
        _;
    }


    /** events **/

    event UserPutBets(address user, uint unitNumber, uint ticketNumber, uint ticketIndex, uint price);
    event HoldingTicket(address user, uint unitNumber, uint ticketNumber, uint ticketIndex);
    event WinnerFixed(address winner, uint unitNum, uint grade, uint ticketNum, uint amount);
    event WinnerTookIt(address winner, uint unitNum, uint grade, uint amount);
    event WinnerFailedToTakeWin(address winner, uint unitNum, uint grade, uint amount);
    event WinnerTookItAlready(address winner, uint unitNum, uint grade, uint amount);
    event OutputWinningNumber(uint grade, uint ticketNumber);
    event StatusUpdated(string message);
    event CollectedAmount(string message, address sendto, uint unitNum, uint amount);


    /** functions **/

    function takeTicket() public payable correctPayment betOngoing gameOngoing {
        uint ticketIndex = totalTickets;
        uint unitNumber = uint( totalTickets / numberMaxPerUnit );
        uint ticketNumber = uint( totalTickets % numberMaxPerUnit );
        ticketList[totalTickets] = ticket(ticketIndex, unitNumber, ticketNumber, msg.sender);
        potList[unitNumber].pot += msg.value;
        lastUnitNumber = unitNumber;
        UserPutBets(ticketList[totalTickets].participant, ticketList[totalTickets].unitNumber, ticketList[totalTickets].ticketNumber, ticketList[totalTickets].ticketIndex, potList[unitNumber].pot);
        totalTickets += 1;
    }

    function endBet() public adminOnly betOngoing gameOngoing {
        if ( block.timestamp >= endtime ) {
            betClosed = true;
            StatusUpdated("bet closed");
        }
    }

    function endLottery() public adminOnly afterBetClosed gameOngoing {
        if (totalTickets == 0) {
            gameClosed = true;
            StatusUpdated("game closed with no tickets.");
            return;
        }
        blockNumberOnLotteryEnd = block.number;
        gameClosed = true;
        StatusUpdated("game closed");
    }

    function determineWinners() public adminOnly afterGameClosed {
        uint[16] memory winningNumbers = pickupWinnersByRandSeed(blockNumberOnLotteryEnd);

        for (uint winIdx=0; winIdx < winningGradeListLength; winIdx++) {
            uint grade = winningGradeList[winIdx].grade;
            for ( uint unitNum=0; unitNum <= lastUnitNumber; unitNum++) {
                uint ticketIndex = uint(( unitNum * numberMaxPerUnit ) + winningNumbers[winIdx] );
                if (ticketList[ticketIndex].participant != address(0)) {
                    address winner = ticketList[ticketIndex].participant;
                    uint ticketNum = ticketList[ticketIndex].ticketNumber;
                    uint winningAmount = uint( potList[unitNum].pot * winningGradeList[winIdx].winningRate / 1000 );
                    winningGradeList[winIdx].winnersCount += 1;
                    winningGradeList[winIdx].winnerOnUnit[unitNum] = winner;
                    winningGradeList[winIdx].winningAmountOnUnit[unitNum] = winningAmount;
                    WinnerFixed(winner, unitNum, grade, ticketNum, winningAmount);
                }
            }
        }
        winnersDetermined = true;
        StatusUpdated("winner determined");
    }

    function transferPotToWinner() public adminOnly afterWinnersDetermined {
        for ( uint winIdx=0; winIdx <= winningGradeListLength; winIdx++) {
            uint grade = winningGradeList[winIdx].grade;
            uint winnersCount = winningGradeList[winIdx].winnersCount;
            for ( uint unitNum=0; unitNum < winnersCount; unitNum++ ) {
                address winner = winningGradeList[winIdx].winnerOnUnit[unitNum];
                uint winningAmount = winningGradeList[winIdx].winningAmountOnUnit[unitNum];
                bool isTookPot = winningGradeList[winIdx].isTookPot[unitNum];
                if (!isTookPot) {
                    if (winner.send(winningAmount)) {
                        potList[unitNum].pot = potList[unitNum].pot - winningAmount;
                        winningGradeList[winIdx].isTookPot[unitNum] = true;
                        WinnerTookIt(winner, unitNum, grade, winningAmount);
                    } else {
                        WinnerFailedToTakeWin(winner, unitNum, grade, winningAmount);
                    }
                } else {
                    WinnerTookItAlready(winner, unitNum, grade, winningAmount);
                }
            }
        }
        potTransferred = true;
        StatusUpdated("pot transferred");
    }

    function getTicketListByAddress() public returns (uint) {
        uint ticketCount = 0;
        for ( uint i=0; i < totalTickets; i++) {
            if ( ticketList[i].participant == msg.sender ) {
                uint ticketIndex = ticketList[i].ticketIndex;
                uint ticketNum = ticketList[i].ticketNumber;
                uint unitNum = ticketList[i].unitNumber;
                HoldingTicket(msg.sender, unitNum, ticketNum, ticketIndex);
                ticketCount += 1;
            }
        }
        return ticketCount;
    }

    function collectRemainingAmount() public adminOnly /* afterPotTransferred */ {
        for ( uint unitNum=0; unitNum <= lastUnitNumber; unitNum++) {
            if ( potList[unitNum].pot > 0 ) {
                if ( admin.send(potList[unitNum].pot) ) {
                    potList[unitNum].pot = 0;
                    CollectedAmount("collected pot.", admin, unitNum, potList[unitNum].pot);
                }
            }
        }
    }

    function pickupWinnersByRandSeed(uint blockNumber) internal view returns (uint[16]) {
        uint[16] memory winningNumbers;
        uint idx = 0;
        uint blockIdx = blockNumber;
        while ( idx < winningGradeListLength ) {
            uint randNumber = ( uint(block.blockhash(blockIdx--)) % numberMaxPerUnit ) + 1;
            if ( !isExistKey(winningNumbers,randNumber) ) {
                winningNumbers[idx] = randNumber;
                idx++;
            }
        }
        return (winningNumbers);
    }

    function isExistKey(uint[16] dataList, uint val) internal pure returns (bool) {
        for ( uint i=0; i<dataList.length; i++) {
            if ( dataList[i] == val ) {
                return true;
            }
        }
        return false;
    }

    function uintToString(uint v) internal pure returns (string str) {
        uint maxlength = 100;
        bytes memory reversed = new bytes(maxlength);
        uint i = 0;
        while (v != 0) {
            uint remainder = v % 10;
            v = v / 10;
            reversed[i++] = byte(48 + remainder);
        }
        bytes memory s = new bytes(i + 1);
        for (uint j = 0; j <= i; j++) {
            s[j] = reversed[i - j];
        }
        str = string(s);
    }


    /** getters **/

    function getLotteryAssets() public adminOnly constant returns (
        uint totaltickets,
        uint lastUnitNum,
        uint thisBalance ) {
        return (totalTickets, lastUnitNumber, this.balance);
    }

    function getLotteryConditions() public constant returns (
        address constAdminAddress,
        uint constTicketPrice,
        uint constNumberMaxPerUnit ) {
        return (admin, ticketPrice, numberMaxPerUnit);
    }

    function getLotteryStatus() public constant returns (
        bool isBetClosed,
        bool isGameClosed,
        bool isWinnersDetermined,
        bool isPotTransferred ) {
        return ( betClosed, gameClosed, winnersDetermined, potTransferred);
    }

    function getBlockNumberOnLotteryEnd() public afterGameClosed constant returns(uint)  {
        return blockNumberOnLotteryEnd;
    }

    function checkWinnersBySpecifiedRandomSeed(uint blockNum) public afterGameClosed  {
        uint[16] memory winningNumbers = pickupWinnersByRandSeed(blockNum);
        for (uint winIdx=0; winIdx < winningGradeListLength; winIdx++) {
            uint grade = winningGradeList[winIdx].grade;
            OutputWinningNumber(grade, winningNumbers[winIdx]);
        }
    }
}