import React, { useState, useEffect } from 'react';
import RaffleCard from './raffleCard';
import image from '../images/image.png';
import image1 from '../images/image1.png';
import image2 from '../images/image2.png';
import x from '../images/XLogo.png';
import wallet from "../images/Wallet.png"
import account from "../images/Accountt.png"
import { BigNumber, ethers } from 'ethers';
import Lotto from '../Lotto.json';
import { useWeb3ModalProvider, useWeb3ModalAccount } from '@web3modal/ethers5/react'

const ABI = Lotto.abi;
const contractAddress = "0x2c517B6B6819c70feE135519fBa8CbF1aA43277c";


function AllRaffles() {
  const { walletProvider } = useWeb3ModalProvider()
  //const { address, chainId, isConnected } = useWeb3ModalAccount()

  try {

  } catch (e) { console.log(e) }


  async function getGiveaway(id) { // return array of giveaway.
    try {
      const ethersProvider = new ethers.providers.Web3Provider(walletProvider)
      const contract = new ethers.Contract(contractAddress, ABI, ethersProvider);
      const giveaway = await contract.getGiveaway(id);
      return giveaway;
    } catch (e) { console.log(e) }
  }

  async function getLiveGiveaways() { // return array of liveaways ids.
      //if(!isConnected) throw Error("User disconnected");
      const ethersProvider = new ethers.providers.Web3Provider(walletProvider)
      const contract = new ethers.Contract(contractAddress, ABI, ethersProvider);
      const liveGiveaways = await contract.getLiveGiveaways();
      return liveGiveaways;
    
  }
  getLiveGiveaways();

  // async function getLiveGiveawaysInfo() { // return array of liveaways.
  //   for (let i = 0; i < liveGiveawaysIDS.length; i++) {
  //     const giveaway =  getGiveaway(liveGiveawaysIDS[i]);
  //     liveGiveawaysIDS[i] = giveaway;
  //   }
  // }
  // getLiveGiveawaysInfo();

  const converToEthFromHex = (hex) => {
    const decimal = parseInt(hex, 16);
    const ether = ethers.utils.formatEther(decimal.toString());
    return ether;
  }


  const initialRaffles = [
    {
      raffleImage: image, raffleName: "Azat's 100 ETH GIVEAWAY", rules: 'follow us', status: 'live', prize: "1000 ETH", duration: "7 Days", joined: "1560", creater: "Azat",
      rules: [
        { title: "You must follow us in twitter.", img: x },
        { title: "There must be at least 5 ETH in your account.", img: wallet },
        { title: "Your account must be created at least 3 months ago.", img: account },
      ]
    },
    {
      raffleImage: image1, raffleName: "Emre's 100 ETH GIVEAWAY", rules: 'follow us', status: 'finished', prize: "1000 ETH", duration: "7 Days", joined: "1560", creater: "Emre", rules: [
        { title: "You must follow us in twitter.", img: x },
        { title: "There must be at least 5 ETH in your account.", img: wallet },
        { title: "Your account must be created at least 3 months ago.", img: account },
      ]
    },
    {
      raffleImage: image2, raffleName: "Samet's 100 ETH GIVEAWAY", rules: 'follow us', status: 'live', prize: "1000 ETH", duration: "7 Days", joined: "1560", creater: "Samet", rules: [
        { title: "You must follow us in twitter.", img: x },
        { title: "There must be at least 5 ETH in your account.", img: wallet },
        { title: "Your account must be created at least 3 months ago.", img: account },
      ]
    },
    {
      raffleImage: image, raffleName: "Çolak's 100 ETH GIVEAWAY", rules: 'follow us', status: 'finished', prize: "1000 ETH", duration: "7 Days", joined: "1560", creater: "Çolak", rules: [
        { title: "You must follow us in twitter.", img: x },
        { title: "There must be at least 5 ETH in your account.", img: wallet },
        { title: "Your account must be created at least 3 months ago.", img: account },
      ]
    },
    {
      raffleImage: image1, raffleName: "Bayram's 100 ETH GIVEAWAY", rules: 'follow us', status: 'live', prize: "1000 ETH", duration: "7 Days", joined: "1560", creater: "Bayram", rules: [
        { title: "You must follow us in twitter.", img: x },
        { title: "There must be at least 5 ETH in your account.", img: wallet },
        { title: "Your account must be created at least 3 months ago.", img: account },
      ]
    },
    {
      raffleImage: image2, raffleName: "Azat's 100 ETH GIVEAWAY", rules: 'follow us', status: 'live', prize: "1000 ETH", duration: "7 Days", joined: "1560", creater: "Azat", rules: [
        { title: "You must follow us in twitter.", img: x },
        { title: "There must be at least 5 ETH in your account.", img: wallet },
        { title: "Your account must be created at least 3 months ago.", img: account },
      ]
    },
    {
      raffleImage: image, raffleName: "Emre's 100 ETH GIVEAWAY", rules: 'follow us', status: 'finished', prize: "1000 ETH", duration: "7 Days", joined: "1560", creater: "Emre", rules: [
        { title: "You must follow us in twitter.", img: x },
        { title: "There must be at least 5 ETH in your account.", img: wallet },
        { title: "Your account must be created at least 3 months ago.", img: account },
      ]
    },
    {
      raffleImage: image1, raffleName: "Samet's 100 ETH GIVEAWAY", rules: 'follow us', status: 'live', prize: "1000 ETH", duration: "7 Days", joined: "1560", creater: "Samet", rules: [
        { title: "You must follow us in twitter.", img: x },
        { title: "There must be at least 5 ETH in your account.", img: wallet },
        { title: "Your account must be created at least 3 months ago.", img: account },
      ]
    },
    {
      raffleImage: image2, raffleName: "Çolak's 100 ETH GIVEAWAY", rules: 'follow us', status: 'finished', prize: "1000 ETH", duration: "7 Days", joined: "1560", creater: "Çolak", rules: [
        { title: "You must follow us in twitter.", img: x },
        { title: "There must be at least 5 ETH in your account.", img: wallet },
        { title: "Your account must be created at least 3 months ago.", img: account },
      ]
    },
    {
      raffleImage: image, raffleName: "Bayram's 100 ETH GIVEAWAY", rules: 'follow us', status: 'live', prize: "1000 ETH", duration: "7 Days", joined: "1560", creater: "Bayram", rules: [
        { title: "You must follow us in twitter.", img: x },
        { title: "There must be at least 5 ETH in your account.", img: wallet },
        { title: "Your account must be created at least 3 months ago.", img: account },
      ]
    },
    {
      raffleImage: image1, raffleName: "Azat's 100 ETH GIVEAWAY", rules: 'follow us', status: 'live', prize: "1000 ETH", duration: "7 Days", joined: "1560", creater: "Azat", rules: [
        { title: "You must follow us in twitter.", img: x },
        { title: "There must be at least 5 ETH in your account.", img: wallet },
        { title: "Your account must be created at least 3 months ago.", img: account },
      ]
    },
    {
      raffleImage: image2, raffleName: "Emre's 100 ETH GIVEAWAY", rules: 'follow us', status: 'finished', prize: "1000 ETH", duration: "7 Days", joined: "1560", creater: "Emre", rules: [
        { title: "You must follow us in twitter.", img: x },
        { title: "There must be at least 5 ETH in your account.", img: wallet },
        { title: "Your account must be created at least 3 months ago.", img: account },
      ]
    },
    {
      raffleImage: image, raffleName: "Samet's 100 ETH GIVEAWAY", rules: 'follow us', status: 'live', prize: "1000 ETH", duration: "7 Days", joined: "1560", creater: "Samet", rules: [
        { title: "You must follow us in twitter.", img: x },
        { title: "There must be at least 5 ETH in your account.", img: wallet },
        { title: "Your account must be created at least 3 months ago.", img: account },
      ]
    },
    {
      raffleImage: image1, raffleName: "Çolak's 100 ETH GIVEAWAY", rules: 'follow us', status: 'finished', prize: "1000 ETH", duration: "7 Days", joined: "1560", creater: "Çolak", rules: [
        { title: "You must follow us in twitter.", img: x },
        { title: "There must be at least 5 ETH in your account.", img: wallet },
        { title: "Your account must be created at least 3 months ago.", img: account },
      ]
    },
    {
      raffleImage: image2, raffleName: "Bayram's 100 ETH GIVEAWAY", rules: 'follow us', status: 'live', prize: "1000 ETH", duration: "7 Days", joined: "1560", creater: "Bayram", rules: [
        { title: "You must follow us in twitter.", img: x },
        { title: "There must be at least 5 ETH in your account.", img: wallet },
        { title: "Your account must be created at least 3 months ago.", img: account },
      ]
    },
    {
      raffleImage: image, raffleName: "Azat's 100 ETH GIVEAWAY", rules: 'follow us', status: 'live', prize: "1000 ETH", duration: "7 Days", joined: "1560", creater: "Azat", rules: [
        { title: "You must follow us in twitter.", img: x },
        { title: "There must be at least 5 ETH in your account.", img: wallet },
        { title: "Your account must be created at least 3 months ago.", img: account },
      ]
    },
    {
      raffleImage: image1, raffleName: "Emre's 100 ETH GIVEAWAY", rules: 'follow us', status: 'finished', prize: "1000 ETH", duration: "7 Days", joined: "1560", creater: "Emre", rules: [
        { title: "You must follow us in twitter.", img: x },
        { title: "There must be at least 5 ETH in your account.", img: wallet },
        { title: "Your account must be created at least 3 months ago.", img: account },
      ]
    },
    {
      raffleImage: image2, raffleName: "Samet's 100 ETH GIVEAWAY", rules: 'follow us', status: 'live', prize: "1000 ETH", duration: "7 Days", joined: "1560", creater: "Samet", rules: [
        { title: "You must follow us in twitter.", img: x },
        { title: "There must be at least 5 ETH in your account.", img: wallet },
        { title: "Your account must be created at least 3 months ago.", img: account },
      ]
    },
    {
      raffleImage: image, raffleName: "Çolak's 100 ETH GIVEAWAY", rules: 'follow us', status: 'finished', prize: "1000 ETH", duration: "7 Days", joined: "1560", creater: "Çolak", rules: [
        { title: "You must follow us in twitter.", img: x },
        { title: "There must be at least 5 ETH in your account.", img: wallet },
        { title: "Your account must be created at least 3 months ago.", img: account },
      ]
    },
    {
      raffleImage: image1, raffleName: "Bayram's 100 ETH GIVEAWAY", rules: 'follow us', status: 'live', prize: "1000 ETH", duration: "7 Days", joined: "1560", creater: "Bayram", rules: [
        { title: "You must follow us in twitter.", img: x },
        { title: "There must be at least 5 ETH in your account.", img: wallet },
        { title: "Your account must be created at least 3 months ago.", img: account },
      ]
    },
  ];

  const [raffles, setRaffles] = useState(initialRaffles);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredRaffles = raffles.filter((raffle) =>
    raffle.raffleName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const liveRaffles = filteredRaffles.filter((raffle) => raffle.status === 'live');
  const finishedRaffles = filteredRaffles.filter((raffle) => raffle.status === 'finished');

  return (
    <div id='allRaffles'>
      <div className="flex items-center justify-center m-4 relative">
        <div className='underline-offset-0 border-b-4 w-64'>
          <h1 className="text-white text-3xl text-center m-4 mb-2">
            ALL RAFFLES
          </h1>
        </div>
        <input
          type="text"
          placeholder="Search by Raffle Name"
          className="p-2.5 focus:outline-none pl-4 pr-4 border rounded-3xl absolute right-20"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <h1 className="text-white text-3xl text-center m-4 underline-offset-0">
        LIVE RAFFLES
      </h1>
      <div className="flex flex-wrap m-4 items-center justify-center">
        {liveRaffles.map((raffle, index) => (
          <RaffleCard
            key={index}
            raffleImage={raffle.raffleImage}
            raffleName={raffle.raffleName}
            rules={raffle.rules}
            status={raffle.status}
            prize={raffle.prize}
            joined={raffle.joined}
            duration={raffle.duration}
            ruleImg={raffle.ruleImg}
            creater={raffle.creater}
          />
        ))}
      </div>
      <h1 className="text-white text-3xl text-center m-4 underline-offset-0">
        FINISHED RAFFLES
      </h1>
      <div className="flex flex-wrap m-4 items-center justify-center">
        {finishedRaffles.map((raffle, index) => (
          <RaffleCard
            key={index}
            raffleImage={raffle.raffleImage}
            raffleName={raffle.raffleName}
            rules={raffle.rules}
            status={raffle.status}
            prize={raffle.prize}
            joined={raffle.joined}
            duration={raffle.duration}
            ruleImg={raffle.ruleImg}
            creater={raffle.creater}
          />
        ))}
      </div>
    </div>
  );
}

export default AllRaffles;
