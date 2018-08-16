Design Patterns:-

* FAIL EARLY AND FAIL LOAD:

a. Have i implemented?   ---->    Yes
b. Why have i implemented and where?   ---->   


* RESTRICTING ACCESS:

a. Have i implemented?   ---->    Yes
b. Why have i implemented and where?   ---->    i have retricted the access to onlyOwner in the withdraw() function because only owner needs to withdraw the donations/funds. i have also retricted access to onlyOwner in the payOut() function so that onlyOwner can donate after time is up and target not reached by the end of the charity fund raising if he has balances and even big heart :)

* AUTO DEPRECATION:

a. Have i implemented?   ---->    No
b. Why have i not implemented?   ---->    i have not implemented the auto deprecate because i don't want my contract to expire after a certain amount of time because charity remains the same and only the cause changes.


* MORTAL:

a. Have i implemented?   ---->    No
b. Why have i not implemented?   ----> Any smart contract meant to receive payments/funds/doantions should never be self-destructed. It means "from now on all the transactions sent to this smart contract will pass through without actually being processed by the smart contract".On contrary, we use self-destruct so that funds don't get locked and be sent to the owner since, self-destruct takes an argument 'address' which is the address of the owner. i implemented withdraw() function to do exactly that and restricted access to the owner. Also, the contract's data will be removed and i want to have that data for me to query at a later time. 

* PULL OVER PUSH PAYMENTS: 

a. Have i implemented?   ---->    Yes
b. Why have i implemented and where?   ---->   In the refund() function, we would like to save the amount to transfer first and then zero the balance. It is an implementation of the withdrawal pattern. Transfering an amount straight from the balances mapping introduces a security risk of re-entrancy — calling back multiple refunds.

* CIRCUIT BREAKER OR EMERGENCY STOP:

a. Have i implemented?   ---->    Yes
b. Why have i implemented and where?   ---->   i have implemented pausable.sol which is an implementation of design pattern - emergency stop. whenNotPaused by the owner, withdraw the funds.


* STATE MACHINE:

a. Have i implemented?   ---->    No
b. Why have i not implemented?   ---->    i have not implemented this design pattern because there are not many stages in my smart contract, there is no modeled interaction. some stages are just automatically reached to a certain point in time.

* SPEED BUMPS:

a. Have i implemented?   ---->    No
b. Why have i not implemented?   ---->    i have implemented withdrawal pattern and emergency stop design pattern which would compensate for speed bumps for the security concerns and malicious attacks or bugs.

