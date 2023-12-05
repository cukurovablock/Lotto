import { createWeb3Modal, defaultConfig } from '@web3modal/ethers5/react'

const projectId = '74a3110c105451dba332d9b89d1b1fad'

const mainnet = {
  chainId: 1,
  name: 'Ethereum',
  currency: 'ETH',
  explorerUrl: 'https://etherscan.io',
  rpcUrl: 'https://cloudflare-eth.com'
}

const metadata = {
  name: 'My Website',
  description: 'My Website description',
  url: 'https://mywebsite.com',
  icons: ['https://avatars.mywebsite.com/']
}

createWeb3Modal({
  ethersConfig: defaultConfig({ metadata }),
  chains: [mainnet],
  projectId,
    themeVariables: {
    '--w3m-color-mix' :"#000"
}
})


export default function ConnectButton() {
    return <w3m-button />
  }