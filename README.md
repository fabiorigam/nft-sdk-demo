# nft-sdk-demo

## Introduction

This is a sample typescript project showing how to check whether a given address owns a given NFT.

## Steps

 - Get the address of the deployed contract.
 - Encode the function signature of balanceOf(address) which is `0x70a08231`.
 - Append the address you want to check, properly padded.
 - Use this encoded data in the data field of the eth_call request.

Assuming the contract is deployed at address `0xCONTRACT_ADDRESS` and we want to check the balance for address `0xADDRESS_TO_CHECK`, the data payload would be:

`0x70a08231000000000000000000000000ADDRESS_TO_CHECK_IN_HEX`

Where ADDRESS_TO_CHECK_IN_HEX is the hexadecimal representation of the address we want to check. We can then make the eth_call request to the vechain node with this data payload to check the token balance of the address.