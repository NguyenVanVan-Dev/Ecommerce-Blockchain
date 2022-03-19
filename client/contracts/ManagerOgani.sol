// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract ManagerOgani {
    uint public transactionCount;
    mapping (uint => PaymentObject) public listPayments;
    struct PaymentObject {
        string idProduct;
        uint256 totalPayment;
        address supplier;
        address currentAdmin;
    } 

    function transferToSupplier(string memory _idProduct, address _supplier) public payable {
        listPayments[transactionCount] = PaymentObject(_idProduct,msg.value,_supplier,msg.sender);
        transactionCount++;
        payable(_supplier).transfer(msg.value);
    }
    function  getTransaction(uint256 index) public view returns (PaymentObject memory){
        PaymentObject[]    memory listTransaction = new PaymentObject[](transactionCount);
        for (uint i = 0; i < transactionCount; i++) {
            PaymentObject storage currentObject = listPayments[i];
            listTransaction[i] = currentObject;
        }
        return listTransaction[index];
    }
    function getAllTransaction () public view returns (PaymentObject[] memory){
         PaymentObject[]  memory listTransaction = new PaymentObject[](transactionCount);
        for (uint i = 0; i < transactionCount; i++) {
            PaymentObject storage currentObject = listPayments[i];
            listTransaction[i] = currentObject;
        }
        return listTransaction;
    }
    

    
    receive() external payable {}

    function withdraw(uint256 withdrawAmount)
        external
        limitWithdraw(withdrawAmount)
    {
       payable(msg.sender).transfer(withdrawAmount);
    }

    modifier limitWithdraw(uint256 withdrawAmount) {
        require(
            withdrawAmount <= 1 * (10**18),
            "Cannot withdraw more than 1ETH"
        );

        _;
    }
}