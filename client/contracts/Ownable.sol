// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

/**
* @title Ownable
* @dev The Ownable contract has an owner address, and provides basic authorization control
* functions, this simplifies the implementation of "user permissions".
*/
contract Ownable {
  address private _owner;
  mapping (uint256 => address) public managementAddress;
  mapping(address => bool) public  managementList;  
  uint public numberOfManager;
  event OwnershipTransferred(
    address indexed previousOwner,
    address indexed newOwner
  );

  /**
  * @dev The Ownable constructor sets the original `owner` of the contract to the sender
  * account.
  */
  constructor() {
    _owner = msg.sender;
    addManager(msg.sender);
    emit OwnershipTransferred(address(0), _owner);
  }

  /**
  * @return the address of the owner.
  */
  function owner() public view returns(address) {
    return _owner;
  }

  /**
  * @dev Throws if called by any account other than the owner.
  */
  modifier onlyOwner() {
    require(isOwner(),"Sender not authorized.");
    _;
  }
    modifier includeManagementList(address addressManager) {
        require(managementList[addressManager]," You not is a Manager" );
        _;
    }
  /**
  * @return true if `msg.sender` is the owner of the contract.
  */
  function isOwner() public view returns(bool) {
    return msg.sender == _owner;
  }

  /**
  * @dev Allows the current owner to relinquish control of the contract.
  * @notice Renouncing to ownership will leave the contract without an owner.
  * It will not be possible to call the functions with the `onlyOwner`
  * modifier anymore.
  */
  function renounceOwnership() public onlyOwner {
    emit OwnershipTransferred(_owner, address(0));
    _owner = address(0);
  }

  /**
  * @dev Allows the current owner to transfer control of the contract to a newOwner.
  * @param newOwner The address to transfer ownership to.
  */
  function transferOwnership(address newOwner) public onlyOwner {
    _transferOwnership(newOwner);
  }
  function addManager(address newManager) public onlyOwner {
    uint256 index = numberOfManager++;
    managementAddress[index] = newManager;
    managementList[newManager] = true;

  }
  function getAllManagement() public view returns (address[] memory) {
        address[]  memory allManager  = new address[](numberOfManager);
        for (uint i = 0; i < numberOfManager; i++) {
            address currentManager = managementAddress[i];
            allManager[i]= currentManager;
        }
        return allManager;
  }
  /**
  * @dev Transfers control of the contract to a newOwner.
  * @param newOwner The address to transfer ownership to.
  */
  function _transferOwnership(address newOwner) internal {
    require(newOwner != address(0));
    emit OwnershipTransferred(_owner, newOwner);
    _owner = newOwner;
  }
}
