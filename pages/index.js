import { ethers } from "ethers"

const abi = [
  {
    "constant": false,
    "inputs": [
      {
        "name": "recipient",
        "type": "address"
      },
      {
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "transfer",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }
]

export default function Home() {
  const connectWallet = async () => {
    const provider = new ethers.providers.Web3Provider(window.ronin.provider);
    const signer = await provider.getSigner();

    const contract = new ethers.Contract('0x29c6f8349a028e1bdfc68bfa08bdee7bc5d47e16', abi, signer)
    contract['transfer'].apply(null, [await signer.getAddress(), 1]).then(async (result) => {
      console.log({
        type: 'hash',
        data: result.hash
      })
    }).catch((res) => {
      console.log('error:', res)
    })
  }

  return (
    <div>
      <button onClick={connectWallet}>Test</button>
    </div>
  )
}
