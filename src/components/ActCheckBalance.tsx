'use client'
import { getChain } from '@/utils/network'
import { Project, Token } from '@/utils/projects'
import { GetAbi } from '@/utils/web3'
import { useEffect, useState } from 'react'
import { formatEther, parseEther } from 'viem'
import { useAccount, useBalance, useSimulateContract, useWaitForTransactionReceipt, useWriteContract } from 'wagmi'
import { TokenQuantityInput } from './TokenQuantityInput'
import { useNotifications } from '@/context/Notifications'
import { TokenBalance } from '@/components/TokenBalance'
import { useRouter } from 'next/navigation'
import TreasuryCollateral from './TreasuryCollateral'

type Address = `0x${string}` | undefined

export default function ActProject({ project }: { project?: Project }) {
  const [amount, setAmount] = useState('0.01')
  const { address, chainId, chain } = useAccount()
  const [tokenAddress, setTokenAddress] = useState<Address>()
  const [selectedCollateral, setSelectedCollateral] = useState<Token | undefined>(undefined)

  const { Add } = useNotifications()
  const router = useRouter()

  const { data: balanceData } = useBalance({
    token: tokenAddress,
    address,
  })

  useEffect(() => {
    if (project && project.smartcontracts.CheckToken && chainId && project.smartcontracts.CheckToken[chainId]) {
      setTokenAddress(project.smartcontracts.CheckToken[chainId].address as `0x${string}`)
    }
    if (project && project.smartcontracts.Collaterals && chainId && project.smartcontracts.Collaterals[chainId]) {
      let collaterals = project.smartcontracts.Collaterals[chainId]
      if (collaterals.length > 0) {
        setSelectedCollateral(collaterals[collaterals.length - 1])
      }
    }
  }, [project, chainId])

  const { error: estimateError } = useSimulateContract({
    abi:
      chainId !== undefined && project?.smartcontracts.CheckToken[chainId] !== undefined
        ? GetAbi(project?.smartcontracts.CheckToken[chainId].abi!)
        : undefined,
    address:
      chainId !== undefined && project?.smartcontracts.CheckToken[chainId] !== undefined
        ? (project?.smartcontracts.CheckToken[chainId].address as `0x${string}`)
        : undefined,
    functionName: 'redeemFromTreasury',
    args: [address!, parseEther(amount), selectedCollateral?.address as `0x${string}`],
  })

  const { data, writeContract } = useWriteContract()

  const {
    isLoading,
    error: txError,
    isSuccess: txSuccess,
  } = useWaitForTransactionReceipt({
    hash: data,
  })

  const handleSendTransation = () => {
    if (estimateError) {
      Add(`Transaction failed: ${estimateError.cause}`, {
        type: 'error',
      })
      return
    }
    writeContract({
      abi: GetAbi(project?.smartcontracts.CheckToken[chainId!].abi!),
      address: project?.smartcontracts.CheckToken[chainId!].address as `0x${string}`,
      functionName: 'redeemFromTreasury',
      args: [address!, parseEther(amount), selectedCollateral?.address as `0x${string}`],
    })
  }

  useEffect(() => {
    if (txSuccess) {
      Add(`Transaction successful`, {
        type: 'success',
        href: chain?.blockExplorers?.default.url ? `${chain.blockExplorers.default.url}/tx/${data}` : undefined,
      })
      router.refresh()
    } else if (txError) {
      Add(`Transaction failed: ${txError.cause}`, {
        type: 'error',
      })
    }
  }, [txSuccess, txError])

  const changeSelectedCollateral = (symbol: string) => {
    if (project && project.smartcontracts.Collaterals && chainId && project.smartcontracts.Collaterals[chainId]) {
      let collaterals = project.smartcontracts.Collaterals[chainId]
      for (let collateral of collaterals) {
        if (collateral.symbol === symbol) {
          setSelectedCollateral(collateral)
        }
      }
    }
  }

  return (
    <div className='flex-column align-center '>
      {chainId === undefined ||
      project === undefined ||
      project.smartcontracts.Collaterals == undefined ||
      project.smartcontracts.Collaterals[chainId] == undefined ? (
        <div className='flex items-center'>
          <div role='status'>
            <svg
              aria-hidden='true'
              className='w-4 h-4 me-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600'
              viewBox='0 0 100 101'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                fill='currentColor'
              />
              <path
                d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                fill='currentFill'
              />
            </svg>
            <span className='sr-only'>Loading...</span>
          </div>
          {chainId !== undefined &&
          project !== undefined &&
          project.smartcontracts.Collaterals !== undefined &&
          project.smartcontracts.Collaterals[chainId] == undefined
            ? `Switch network to ${getChain(parseInt(Object.keys(project.smartcontracts.Collaterals)[0])).name}`
            : 'Select project and connect your wallet'}
        </div>
      ) : (
        <>
          {/* "Check balance" */}
          <div className='flex-col justify-end m-2'>
            <div className='stats shadow join-item mb-2 bg-[#282c33]'>
              <div className='stat '>
                <div className='stat-title '>Your balance</div>
                {tokenAddress && address ? (
                  <TokenBalance address={address} tokenAddress={tokenAddress} />
                ) : (
                  <p>Please connect your wallet</p>
                )}
              </div>
            </div>
          </div>
          {/* "Operation on" */}
          <h2 className='text-xl'>Redeem from Treasury</h2>
          <p className='text-gray-500 dark:text-gray-400'>Exchange your CHECK tokens for a Collateral</p>
          <div>
            <label className='form-control w-full'>
              <ul className='w-full text-sm font-medium '>
                {project?.smartcontracts.Collaterals && project?.smartcontracts.Collaterals[chainId] ? (
                  project?.smartcontracts.Collaterals[chainId].map((token) => (
                    <TreasuryCollateral
                      key={'check-balance-' + token.symbol}
                      project={project}
                      token={token}
                      checkBalance={balanceData?.value}
                    />
                  ))
                ) : (
                  <></>
                )}
              </ul>
            </label>
            <div className='flex align-end w-full grid md:grid-cols-1 lg:grid-cols-2 gap-4 '>
              <div className='flex-col justify-end mx-2 my-1'>
                <p className='text-gray-500'>You will get 0 {selectedCollateral?.symbol}</p>
              </div>
            </div>
          </div>
          <h2 className='text-xl'>Burn for Ara Token</h2>
          <p className='text'>Mint ARA Token in exchange for your CHECK tokens</p>
        </>
      )}
    </div>
  )
}
