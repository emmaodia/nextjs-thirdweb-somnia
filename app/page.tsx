import Link from 'next/link';

export default function Home() {
  return (
    <div className='flex flex-col items-center justify-center min-h-[80vh]'>
      <h1 className='text-4xl md:text-6xl font-bold tracking-tighter mb-8 text-zinc-100'>
        Thirdweb Account Abstraction
      </h1>
      <p className='text-xl text-zinc-400 mb-12 text-center max-w-2xl'>
        Experience gasless transactions on Somnia blockchain with smart accounts
      </p>
      <div className='flex gap-4'>
        <Link
          href='/gasless'
          className='px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors'
        >
          Try Gasless Transactions
        </Link>
      </div>
    </div>
  );
}
