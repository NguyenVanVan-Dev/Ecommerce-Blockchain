// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract ProductSupplier {
    uint256 public numOfFunders;
    mapping(uint256 => address) public lutFunders;
    mapping(address => bool) public funders;
    uint public balanceReceived;
    receive( ) external payable {}
    function addFunds() external payable {
        address funder = msg.sender;

        if (!funders[funder]) {
            uint256 index = numOfFunders++;
            funders[funder] = true;
            lutFunders[index] = funder;
        }
    }

    function getFundersIndex(uint256 index) external view returns (address) {
        return lutFunders[index];
    }

    function getAllFunders() external view returns (address[] memory) {
        address[] memory _funders = new address[](numOfFunders);

        for (uint256 i = 0; i < numOfFunders; i++) {
            _funders[i] = lutFunders[i];
        }
        return _funders;
    }

    function withdraw(uint256 withdrawAmount)
        external
        limitWithdraw(withdrawAmount)
    {
        payable(msg.sender).transfer(withdrawAmount);
    }

    function getBalance() public view returns(uint) {
        return address(this).balance;
    }
    function withdrawMoneyTo(address  _to) public payable {
        payable(_to).transfer(getBalance());
    }
    function transferMoneyTo(address payable _to, uint _amount) public payable {
        _to.transfer(_amount);
    }
    modifier limitWithdraw(uint256 withdrawAmount) {
        require(
            withdrawAmount <= 1 * (10**18),
            "Cannot withdraw more than 1ETH"
        );

        _;
    }
}
