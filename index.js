// imports
import { ethers } from './ethers-5.6.esm.min.js'
import { abi, contractAddress } from './constants.js'

// global variables
let provider, signer, contractFundMe

// getElements
const btnConnectToMetamask = document.querySelector('#connectToMetamask')
const btnPrintAddress = document.querySelector('#printAddress')
const btnShowContractBalance = document.querySelector('#showContractBalance')
const inpAmount = document.querySelector('#amount')
const btnFund = document.querySelector('#fund')
const btnWithdraw = document.querySelector('#withdraw')

// functions
const initGlobalVariables = async () => {
    contractFundMe = new ethers.Contract(contractAddress, abi, signer)
}

// clickFunctions
const connectToMetamask = async () => {
    if (!window.ethereum) {
        console.warn('Please install Metamask!')
        return
    }
    provider = new ethers.providers.Web3Provider(window.ethereum)
    await provider.send('eth_requestAccounts', [])
    signer = provider.getSigner()
    await initGlobalVariables()
}

const printAddress = async () => {
    console.log(await signer.getAddress())
}

const showContractBalance = async () => {
    const contractBalance = await provider.getBalance(contractFundMe.address)
    console.log(ethers.utils.formatEther(contractBalance))
}

const fund = async () => {
    const amount = inpAmount.value
    const res = await contractFundMe.fund({
        value: ethers.utils.parseEther(amount),
    })
    console.log(res)
}

const withdraw = async () => {
    const signer = new ethers.Wallet(
        '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80',
        provider
    )
    const templateContract = contractFundMe.connect(signer)
    const res = await templateContract.functions.withdraw()
    console.log(res)
}

// define onclick event
btnConnectToMetamask.onclick = connectToMetamask
btnPrintAddress.onclick = printAddress
btnShowContractBalance.onclick = showContractBalance
btnFund.onclick = fund
btnWithdraw.onclick = withdraw
