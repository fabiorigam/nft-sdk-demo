# nft-sdk-demo

## Introduction

This is a sample typescript project showing how to check whether a given address owns a given NFT.

## How to use

Just lunch the `yarn test` command.

## Steps

 - Get the address of the deployed contract.
 - Encode the function signature of balanceOf(address) which is `0x70a08231`.
 - Append the address we want to check, properly padded.
 - Use this encoded data in the data field of the eth_call request.

Assuming the contract is deployed at address `0xCONTRACT_ADDRESS` and we want to check the balance for address `0xADDRESS_TO_CHECK`, the data payload would be:

`0x70a08231000000000000000000000000ADDRESS_TO_CHECK_IN_HEX`

Where ADDRESS_TO_CHECK_IN_HEX is the hexadecimal representation of the address we want to check. We can then make the eth_call request to the vechain node with this data payload to check the token balance of the address.

It's possible to use the [VeWorld Dapp](https://veworld-dapp-vecha.in/) to deploy and mint sample NTFs.

## eth_call

In the JSON-RPC request for eth_call, the `from` and `to` parameters have specific meanings:
 - `from`: This parameter represents the address from which the transaction is being sent. It's usually required by Ethereum nodes to process the request. However, for eth_call, since it's a read-only operation and doesn't involve sending a transaction, we can set it to any Ethereum address, even if it's not an address that we own. It's essentially a placeholder parameter in this context.
 - `to`: This parameter represents the address of the smart contract on which the function is being called. In the case of checking NFT ownership, this would be the address of the ERC-721 or ERC-1155 contract we want to query.

 ## Alternative without using the RPC Proxy

An alternative is to use the following code without the need of a RPC Proxy:

 ```typescript
import { HttpClient, ThorClient } from '@vechain/sdk-network';
const abi = require('./abi.json');

async function main() {
    // Initialize the Thor client (using testnet)
    const httpClient = new HttpClient('https://testnet.vechain.org/');
    const thorClient = new ThorClient(httpClient);

    // Load contract using its address and ABI
    const contract = thorClient.contracts.load('0x14ada3f89864fe651bddd1a95e55dffb3c729aef', abi);

    // Check if the NTF is owned by the given address
    await contract.read.balanceOf('0xc3bE339D3D20abc1B731B320959A96A08D479584').then((res: any) => {
        if (res > 0) {
            console.log('NTF found!');
        } else {
            console.log('NTF not found!');
        }
    });
}

main();
 ```