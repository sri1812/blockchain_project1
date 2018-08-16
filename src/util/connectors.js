import { Connect, SimpleSigner } from 'uport-connect'

// export let uport = new Connect('TruffleBox')

export let uport = new Connect('Sri_Dapp', {
    clientId: '2ogWL5vZaYonsjiBaA2zkVXrmrnwUiTwBy2',
    network: 'rinkeby',
    signer: SimpleSigner('c98507ab8cd3386262be0a31fcd779ac8ec6561867924b9b3fbd3986c53a9b42')
})

export const web3 = uport.getWeb3()
