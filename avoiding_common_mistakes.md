Measures taken to make sure that my contract is not susceptible to common attacks:

1. Used msg.sender instead of Tx.origin.

2. Used withdrawal pattern in the refund() function to avoid re-entrancy attack.In the refund() function, we would like to save the amount to transfer first and then zero the balance. It is an implementation of the withdrawal pattern. Transfering an amount straight from the balances mapping introduces a security risk of re-entrancy — calling back multiple refunds.

3. Performed unit testing with the 'truffle test' provided by truffle development framework to make sure that the logic of my contract behaves as expected.

4. Used a library safeMath.sol for safe math operations to avoid integer overflow and underflow.


poison data:

beware of accepting user input, sanitize and check input. use require statements to throw an exception if input is not valid.

exposure - exposed functions

be aware of what your contract exposes to the world. accessibility of functions.

malicious admins:
since, no self-destruct, no auto deprecate - no problem with admin.

TX.origin

uisng msg.sender instead of Tx.origin

limiting the length of user supplied data.

run tests for gas usage

