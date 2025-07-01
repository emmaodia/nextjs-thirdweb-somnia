import { createThirdwebClient, getContract, defineChain } from 'thirdweb';
import { SmartWalletOptions } from 'thirdweb/wallets';
import { baseSepolia } from 'thirdweb/chains';
import { inAppWallet } from 'thirdweb/wallets';

// Define Somnia chain using defineChain
export const somniaChain = defineChain({
  id: 50312, // ✅ Somnia Testnet Chain ID
  name: 'Somnia Testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Somnia Token',
    symbol: 'STT',
  },
  rpcUrls: {
    default: {
      http: ['https://dream-rpc.somnia.network'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Somnia Explorer',
      url: 'https://shannon-explorer.somnia.network/',
    },
  },
});

// Replace this with your client ID string
// refer to https://portal.thirdweb.com/typescript/v5/client on how to get a client ID
const clientId = process.env.NEXT_PUBLIC_APP_ID;

if (!clientId) {
  throw new Error('No client ID provided');
}

export const client = createThirdwebClient({
  clientId: clientId,
});

export const chain = somniaChain;
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

const ENTRYPOINT_ADDRESS = '0x0000000071727De22E5E9d8BAf0edAc6f37da032';
const FACTORY_ADDRESS = '0x4be0ddfebca9a5a4a617dee4dece99e7c862dceb';

export const wallets = [
  inAppWallet({
    smartAccount: {
      chain: somniaChain,
      sponsorGas: true,
      entryPoint: ENTRYPOINT_ADDRESS,
      factoryAddress: FACTORY_ADDRESS,
    },
    // executionMode: {
    //   mode: 'EIP7702', // or "EIP4337" or "EOA"
    //   sponsorGas: true, // sponsor gas for all transactions
    // },
  }),
];

// import { createThirdwebClient, getContract } from 'thirdweb';
// import { defineChain, baseSepolia } from 'thirdweb/chains';
// import { inAppWallet } from 'thirdweb/wallets';

// Define Somnia Testnet with correct configuration
// export const somniaTestnet = defineChain({
//   id: 50312,
//   name: 'Somnia Testnet',
//   nativeCurrency: {
//     decimals: 18,
//     name: 'Somnia Token',
//     symbol: 'STT',
//   },
//   rpcUrls: {
//     default: {
//       http: ['https://dream-rpc.somnia.network'],
//     },
//   },
//   blockExplorers: {
//     default: {
//       name: 'Somnia Explorer',
//       url: 'https://shannon-explorer.somnia.network/',
//     },
//   },
// });

// const clientId = '';

// if (!clientId) {
//   throw new Error('No client ID provided');
// }

// export const client = createThirdwebClient({
//   clientId: clientId,
// });

// export const chain = baseSepolia;
// // somniaTestnet;

// // Smart Account configuration
// const ENTRYPOINT_ADDRESS = '0x0000000071727De22E5E9d8BAf0edAc6f37da032';
// const FACTORY_ADDRESS = '0x4be0ddfebca9a5a4a617dee4dece99e7c862dceb';

// // Configure in-app wallet with smart account
// export const wallets = [
//   inAppWallet({
//     // smartAccount: {
//     //   chain: baseSepolia,
//     //   sponsorGas: true,
//     //   entryPoint: ENTRYPOINT_ADDRESS,
//     //   factoryAddress: FACTORY_ADDRESS,
//     // },
//     executionMode: {
//       mode: 'EIP7702', // or "EIP4337" or "EOA"
//       sponsorGas: true, // sponsor gas for all transactions
//     },
//   }),
// ];

// // Replace with your deployed SimpleNFT contract address on Somnia
// export const nftContractAddress = '0x5CF33F49f23Ba933E006770cfd5893E5D330620b';
// // '0x04fBCdD48489C18aF96a19403C35090bfc2051A3'; // UPDATE THIS

// export const nftContract = getContract({
//   address: nftContractAddress,
//   chain: chain,
//   client,
// });
