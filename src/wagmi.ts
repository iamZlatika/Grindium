import { http, createConfig } from 'wagmi'
import { sepolia } from 'wagmi/chains'
import { injected } from 'wagmi/connectors'

export const config = createConfig({
  connectors: [injected()],
  chains: [sepolia],
  transports: {
    [sepolia.id]: http(), // можно указать свой Infura/Alchemy URL
  },
})
