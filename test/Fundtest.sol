// contracts/FundTest.sol
pragma solidity 0.4.24;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Fund.sol";

contract FundTest {
  Fund fund;
  uint public initialBalance = 10 ether;

  function () public payable {}

  function beforeEach() public {
    fund = new Fund(1 days, 100 finney);
  }

  function testSettingAnOwnerDuringCreation() public {
    Assert.equal(fund.owner(), this, "An owner is different than a deployer");
  }

  function testSettingAnOwnerOfDeployedContract() public {
    fund = Fund(DeployedAddresses.Fund());
    Assert.equal(fund.owner(), msg.sender, "An owner is different than a deployer");
  }

  function testAcceptingDonations() public {
    Assert.equal(fund.fundsRaised(), 0, "Initial fundsRaised  is different than 0");
    fund.donate.value(10 finney)();
    fund.donate.value(20 finney)();
    Assert.equal(fund.fundsRaised(), 30 finney, "fundsRaised  is different than sum of donations");
  }

  function testTrackDonorsBalance() public {
    fund.donate.value(5 finney)();
    fund.donate.value(15 finney)();
    Assert.equal(fund.balances(this), 20 finney, "Donator balance is different than sum of donations");
  }

  function testDonateAfterTimeIsUp() public {
    fund = new Fund(0, 100 finney);
    bool result = address(fund).call.value(10 finney)(bytes4(keccak256("donate()")));
    Assert.equal(result, false, "Allows for donations when time is up");
  }

  function testWithdrawalByAnOwner() public {
    uint initBalance = this.balance;
    fund.donate.value(50 finney)();
    bool result = address(fund).call(bytes4(keccak256("withdraw()")));
    Assert.equal(result, false, "Allows to withdraw before reaching the target");
    fund.donate.value(50 finney)();
    Assert.equal(this.balance, initBalance - 100 finney, "Balance before withdrawal doesn't correspond to the sum of donations");
    result = address(fund).call(bytes4(keccak256("withdraw()")));
    Assert.equal(result, true, "Doesn't allow to withdraw after reaching the target");
    Assert.equal(this.balance, initBalance, "Balance after withdrawal doesn't correspond to the sum of donations");
  }

  function testWithdrawalByNotAnOwner() public {
    fund = Fund(DeployedAddresses.Fund());
    fund.donate.value(100 finney)();
    bool result = address(fund).call(bytes4(keccak256("withdraw()")));
    Assert.equal(result, false, "Allows for withdrawal by not an owner");
  }

}