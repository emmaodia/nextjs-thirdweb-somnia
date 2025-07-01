'use client';
import { useState } from 'react';
import { balanceOf, totalSupply } from 'thirdweb/extensions/erc721';
import {
  ConnectButton,
  TransactionButton,
  useActiveAccount,
  useReadContract,
} from 'thirdweb/react';
import { prepareContractCall } from 'thirdweb';
import {
  accountAbstraction,
  client,
  nftContract,
  wallets,
} from '../../constants';
import Link from 'next/link';

const GaslessHome: React.FC = () => {
  const smartAccount = useActiveAccount();
  console.log(smartAccount);
  const [txStatus, setTxStatus] = useState<string>('');

  // Get total supply
  const { data: totalMinted } = useReadContract(totalSupply, {
    contract: nftContract,
  });

  // Get user's balance
  const { data: userBalance } = useReadContract(balanceOf, {
    contract: nftContract,
    owner: smartAccount?.address!,
    queryOptions: { enabled: !!smartAccount },
  });

  return (
    <div className='flex flex-col items-center'>
      <h1 className='text-2xl md:text-6xl font-semibold md:font-bold tracking-tighter mb-12 text-zinc-100'>
        Gasless NFT Minting
      </h1>

      <ConnectButton
        client={client}
        accountAbstraction={accountAbstraction}
        connectModal={{
          size: 'compact',
        }}
        wallets={wallets}
      />

      <div className='flex flex-col mt-8 items-center'>
        <div className='mb-8 p-8 bg-zinc-900 rounded-2xl shadow-xl'>
          <div className='text-center mb-6'>
            <p className='text-3xl font-bold text-white mb-2'>
              {totalMinted?.toString() || '0'}
            </p>
            <p className='text-sm text-zinc-400'>Total NFTs Minted</p>
          </div>

          <div className='flex items-center justify-center'>
            <div className='w-48 h-48 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg'>
              <div className='text-white text-center'>
                <p className='text-6xl font-bold mb-2'>NFT</p>
                <p className='text-sm opacity-80'>SimpleNFT Collection</p>
              </div>
            </div>
          </div>
        </div>

        {smartAccount ? (
          <div className='flex flex-col items-center gap-4'>
            <p className='font-semibold text-center text-lg'>
              You own{' '}
              <span className='text-green-400'>
                {userBalance?.toString() || '0'}
              </span>{' '}
              NFTs
            </p>

            <TransactionButton
              transaction={() =>
                prepareContractCall({
                  contract: nftContract,
                  method: 'function mint(address to)',
                  params: [smartAccount.address],
                })
              }
              onError={(error) => {
                console.error('Transaction error:', error);
                // Better error messages based on bundler responses
                let errorMessage = 'Transaction failed';

                if (error.message?.includes('400')) {
                  errorMessage = 'Invalid request or unsupported chain';
                } else if (error.message?.includes('401')) {
                  errorMessage = 'Authentication failed. Check your API key';
                } else if (error.message?.includes('500')) {
                  errorMessage = 'Bundler service error. Please try again';
                } else if (error.message?.includes('502')) {
                  errorMessage = 'Network provider error';
                } else if (error.message?.includes('policy')) {
                  errorMessage = 'Transaction rejected by policy';
                } else {
                  errorMessage = error.message || 'Unknown error occurred';
                }
                alert(`Error: ${error.message}`);
              }}
              onTransactionSent={(result) => {
                console.log('Transaction sent:', result.transactionHash);
                setTxStatus('Transaction submitted...');
              }}
              onTransactionConfirmed={async (receipt) => {
                console.log('Transaction confirmed:', receipt);
                alert('NFT minted successfully!');
              }}
              className='px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-lg font-semibold transition-all transform hover:scale-105 shadow-lg'
            >
              Mint NFT (Gasless)
            </TransactionButton>
          </div>
        ) : (
          <p className='text-center w-full mt-10 text-zinc-400'>
            Connect your wallet to mint NFTs without gas fees!
          </p>
        )}
      </div>

      <Link
        href='/'
        className='text-sm text-gray-400 mt-12 hover:text-gray-300'
      >
        Back to menu
      </Link>
    </div>
  );
};

export default GaslessHome;
