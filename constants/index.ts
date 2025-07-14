import { createThirdwebClient, getContract, defineChain } from 'thirdweb';
import { SmartWalletOptions } from 'thirdweb/wallets';
import { somniaTestnet } from 'thirdweb/chains';
import { inAppWallet } from 'thirdweb/wallets';

// Replace this with your client ID string
// refer to https://portal.thirdweb.com/typescript/v5/client on how to get a client ID
const clientId = process.env.NEXT_PUBLIC_APP_ID;

if (!clientId) {
  throw new Error('No client ID provided');
}

export const client = createThirdwebClient({
  clientId: clientId,
});

export const chain = somniaTestnet;
// baseSepolia;
// somniaChain;

// Replace with your deployed SimpleNFT contract address on Somnia
export const nftContractAddress = '0x04fBCdD48489C18aF96a19403C35090bfc2051A3';
// '0x5CF33F49f23Ba933E006770cfd5893E5D330620b'; // Same Smart Contract on Base Sepolia
// '0x04fBCdD48489C18aF96a19403C35090bfc2051A3'; // Smart Contract on Somnia

export const nftContract = getContract({
  address: nftContractAddress,
  chain,
  client,
});

export const accountAbstraction: SmartWalletOptions = {
  chain,
  sponsorGas: false,
};

// const ENTRYPOINT_ADDRESS = '0x0000000071727De22E5E9d8BAf0edAc6f37da032';
const FACTORY_ADDRESS = '0x4be0ddfebca9a5a4a617dee4dece99e7c862dceb';

export const wallets = [
  inAppWallet({
    smartAccount: {
      chain: somniaTestnet,
      sponsorGas: true,
      // entryPoint: ENTRYPOINT_ADDRESS,
      factoryAddress: FACTORY_ADDRESS,
    },
  }),
];
