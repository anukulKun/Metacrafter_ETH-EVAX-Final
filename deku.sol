// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Counter {
    
    uint256 public count;

    // Function to get the current count
    function getCount() public view returns (uint256) {
        return count;
    }

    // Function to increment the count
    function increment() public {
        count += 1;
    }

    // Function to decrement the count
    function decrement() public {
        require(count > 0, "Count is already zero");
        count -= 1;
    }

    // Function to reset the count
    function reset() public {
        count = 0;
    }
}
