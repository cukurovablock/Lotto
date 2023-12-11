import { createWeb3Modal, defaultConfig } from '@web3modal/ethers5/react'

const projectId = '74a3110c105451dba332d9b89d1b1fad'

const mainnet = {
  chainId: 43113,
  name: 'Avax Fuji C-Chain',
  currency: 'AVAX',
  explorerUrl: 'https://testnet.snowtrace.io',
  rpcUrl: 'https://api.avax-test.network/ext/bc/C/rpc'
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