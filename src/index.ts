import { VechainProvider } from '@vechain/sdk-provider';
import { HttpClient, ThorClient } from '@vechain/sdk-network';
import { Hex0x } from '@vechain/sdk-core';

async function main() {
    const httpClient = new HttpClient('https://testnet.vechain.org/');
    const thorClient = new ThorClient(httpClient);
    const provider = new VechainProvider(thorClient);

    const call = {
        method: 'eth_call',
        params: [
            {
                from: '0xc3bE339D3D20abc1B731B320959A96A08D479583',
                to: '0x14ada3f89864fe651bddd1a95e55dffb3c729aef',
                data: '0x70a08231000000000000000000000000c3bE339D3D20abc1B731B320959A96A08D479583'
            }, 
            'latest'
        ]
    }
    const res = await provider.request(call);
    console.log(res);
}
main();