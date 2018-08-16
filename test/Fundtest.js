// test/FundTest.js
const {
  increaseTime
} = require("./utils");
const Fund = artifacts.require("Fund");

const FINNEY = 10 ** 15;
const DAY = 3600 * 24;

contract("Fund", accounts => {
  const [firstAccount, secondAccount, thirdAccount] = accounts;
  let fund;

  beforeEach(async () => {
    fund = await Fund.new(DAY, 100 * FINNEY);
  });

  it("sets an owner", async () => {
    assert.equal(await fund.owner.call(), firstAccount);
  });

  it("accepts funds/donations", async () => {
    await fund.donate({
      from: firstAccount,
      value: 10 * FINNEY
    });
    await fund.donate({
      from: secondAccount,
      value: 20 * FINNEY
    });
    assert.equal(await fund.fundsRaised.call(), 30 * FINNEY);

  });

  it("tracks donors balance", async () => {
    await fund.donate({
      from: firstAccount,
      value: 5 * FINNEY
    });
    await fund.donate({
      from: secondAccount,
      value: 15 * FINNEY
    });
    await fund.donate({
      from: secondAccount,
      value: 3 * FINNEY
    });
    assert.equal(await fund.balances.call(firstAccount), 5 * FINNEY);
    assert.equal(await fund.balances.call(secondAccount), 18 * FINNEY);
  });

  it("completes raising funds when time is up", async () => {
    assert.equal(await fund.isComplete.call(), false);
    await increaseTime(DAY);
    assert.equal(await fund.isComplete.call(), true);
  });

  it("does not accept anymore funds/donations when time is up", async () => {
    await fund.donate({
      from: firstAccount,
      value: 10 * FINNEY
    });
    await increaseTime(DAY);
    try {
      await fund.donate({
        from: firstAccount,
        value: 10 * FINNEY
      });
      assert.fail();
    } catch (err) {
      assert.ok(/revert/.test(err.message));
    }
  });


  it("allows an owner to withdraw funds when target is reached and when not Paused", async () => {
    await fund.donate({
      from: secondAccount,
      value: 30 * FINNEY
    });
    await fund.donate({
      from: thirdAccount,
      value: 70 * FINNEY
    });
    const initBalance = web3.eth.getBalance(firstAccount);
    assert.equal(web3.eth.getBalance(fund.address), 100 * FINNEY);
    await fund.withdraw();
    await fund.pause();
    const finalBalance = web3.eth.getBalance(firstAccount);
    assert.ok(finalBalance.greaterThan(initBalance));
  });

  it("does not allow non-owners to withdraw funds", async () => {
    await fund.donate({
      from: secondAccount,
      value: 100 * FINNEY
    });
    try {
      await fund.withdraw({
        from: secondAccount
      });
      assert.fail();
    } catch (err) {
      assert.ok(/revert/.test(err.message));
    }
  });

  it("allows to get refund before time is up and target is reached", async () => {
    await fund.donate({ from: secondAccount, value: 100 * FINNEY });
    const initBalance = web3.eth.getBalance(secondAccount);
    assert.equal((await fund.balances.call(secondAccount)), 100 * FINNEY);
    await fund.refund({ from: secondAccount });
    const finalBalance = web3.eth.getBalance(secondAccount);
    assert.ok(finalBalance.greaterThan(initBalance)); 
  });

  it("does not allow to get refund after time is up and target is reached", async () => {
    await fund.donate({
      from: secondAccount,
      value: 100 * FINNEY
    });
    assert.equal((await fund.balances.call(secondAccount)), 100 * FINNEY);
    await increaseTime(DAY);
    try {
      await fund.refund({
        from: secondAccount
      });
      assert.fail();
    } catch (err) {
      assert.ok(/revert/.test(err.message));
    }
  });

  it("does not allow to get refund before time is up and target is not reached", async () => {
    await fund.donate({
      from: secondAccount,
      value: 50 * FINNEY
    });
    assert.equal((await fund.balances.call(secondAccount)), 50 * FINNEY);
    try {
      await fund.refund({
        from: secondAccount
      });
      assert.fail();
    } catch (err) {
      assert.ok(/revert/.test(err.message));
    }
  });
});