import { VechainProvider } from '@vechain/sdk-provider';
import { HttpClient, ThorClient } from '@vechain/sdk-network';

async function main() {
    // Initialize the provider (using testnet)
    const httpClient = new HttpClient('https://testnet.vechain.org/');
    const thorClient = new ThorClient(httpClient);
    const provider = new VechainProvider(thorClient);

    // Create a call object to check if the NTF is owned by the address
    const call = {
        method: 'eth_call',
        params: [
            {
                from: '0xc3bE339D3D20abc1B731B320959A96A08D479583',
                to: '0x14ada3f89864fe651bddd1a95e55dffb3c729aef', // NFT contract address
                data: '0x70a08231000000000000000000000000c3bE339D3D20abc1B731B320959A96A08D479583' // 0x70a08231000000000000000000000000ADDRESS_TO_CHECK_IN_HEX
            }, 
            'latest'
        ]
    }
    // Call the contract to check if the NTF is owned by the address
    const res = await provider.request(call) as string;
    const decimalNumber = parseInt(res, 16);

    if (decimalNumber > 0) {
        console.log('NTF found!');
    } else {
        console.log('NTF not found!');
    }
}

main();