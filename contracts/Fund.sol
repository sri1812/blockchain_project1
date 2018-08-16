// contracts/Fund.sol
pragma solidity 0.4.24;

import "zeppelin/contracts/ownership/Ownable.sol";
import "zeppelin/contracts/math/SafeMath.sol";
import "zeppelin/contracts/lifecycle/Pausable.sol";

contract Fund is Ownable, Pausable {
  using SafeMath for uint;

  uint public fundsRaised;
  uint public target;
  uint public CompletesAt;
  mapping(address => uint) public balances;

  modifier onlyOwner() {
    require(owner == msg.sender);
    _;
  }
  
  modifier whenNotPaused() {
    require(!paused);
    _;
  }

  modifier onlyNotComplete() {
    require(!isComplete());
    _;
  }

  modifier onlyComplete() {
    require(isComplete());
    _;
  }

  modifier onlyNotFund() {
    require(!isFund());
    _;
  }

  modifier onlyFund() {
    require(isFund());
    _;
  }

  // fallback function that allows contract to accept funds

  function () public  payable {}

  // constructor which 

  constructor(uint _duration, uint _target) public {
    CompletesAt = now + _duration;
    target = _target;
  }

  function isComplete() public view returns (bool) {
    return CompletesAt <= now;
    
  }

  function isFund() public view returns (bool) {
    return fundsRaised >= target;
    
  }

  function donate() public onlyNotComplete payable {
    balances[msg.sender] += msg.value;
    fundsRaised += msg.value;
    
  }

  function withdraw() public onlyOwner onlyFund whenNotPaused {
    owner.transfer(address(this).balance);
  }

  function refund() public onlyNotComplete onlyFund {
    uint amount = balances[msg.sender];
    require(amount > 0);
    balances[msg.sender] = 0;
    msg.sender.transfer(amount);
  }

 function payOut() public onlyOwner onlyComplete payable {
    balances[msg.sender] += msg.value;
    fundsRaised += msg.value;

  }

  
  }


  

