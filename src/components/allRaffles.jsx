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
  const { address, chainId, isConnected } = useWeb3ModalAccount()
  const [raffle1, setRaffle1] = useState(null);

  async function getGiveaway(id) { // return array of giveaway.
    try {
      const ethersProvider = new ethers.providers.Web3Provider(walletProvider)
      const contract = new ethers.Contract(contractAddress, ABI, ethersProvider);
      const giveaway = await contract.getGiveaway(id);
      const name = giveaway["giveawayName"];
      return giveaway;
    } catch (e) { console.log(e) }
  }

  async function getGiveawayMaxParticuls(id) { // max katılımcı sayısı.
    try {
      const ethersProvider = new ethers.providers.Web3Provider(walletProvider)
      const contract = new ethers.Contract(contractAddress, ABI, ethersProvider);
      const giveaway = await contract.getGiveaway(id);
      const number = giveaway["maxParticipants"];
      return converToDeciaml(number._hex);
    } catch (e) { console.log(e) }
  }

  async function getGiveawayName(id) { // giveaway name
    try {
      const ethersProvider = new ethers.providers.Web3Provider(walletProvider)
      const contract = new ethers.Contract(contractAddress, ABI, ethersProvider);
      const giveaway = await contract.getGiveaway(id);
      const name = giveaway["giveawayName"];
      return name;
    } catch (e) { console.log(e) }
  }

  async function getGiveawayAmount(id) { // ödül
    try {
      const ethersProvider = new ethers.providers.Web3Provider(walletProvider)
      const contract = new ethers.Contract(contractAddress, ABI, ethersProvider);
      const giveaway = await contract.getGiveaway(id);
      const price = giveaway["amount"];
      return price._hex;
    } catch (e) { console.log(e) }
  }

  async function getGiveawayCreater(id) { // creater
    try {
      const ethersProvider = new ethers.providers.Web3Provider(walletProvider)
      const contract = new ethers.Contract(contractAddress, ABI, ethersProvider);
      const giveaway = await contract.getGiveaway(id);
      const owner = giveaway["owner"];
      return owner;
    } catch (e) { console.log(e) }
  }

  async function getGiveawayStartDate(id) { // return start date.
    try {
      const ethersProvider = new ethers.providers.Web3Provider(walletProvider)
      const contract = new ethers.Contract(contractAddress, ABI, ethersProvider);
      const giveaway = await contract.getGiveaway(id);
      const date = giveaway["base"]["startDate"]._hex;

      const avaxFujiUnixTimestamp = converToDeciaml(date);

      const timestampInSeconds = avaxFujiUnixTimestamp; // Assuming it's in seconds
      const timestampInMilliseconds = timestampInSeconds * 1000;
      const dateObject = new Date(timestampInMilliseconds);
      
      const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
      const formattedDate = dateObject.toLocaleDateString('en-US', options);

      return formattedDate;
      
    } catch (e) { console.log(e) }
  }

  async function getGiveawayEndDate(id) { // end date
    try {
      const ethersProvider = new ethers.providers.Web3Provider(walletProvider);
      const contract = new ethers.Contract(contractAddress, ABI, ethersProvider);
      const giveaway = await contract.getGiveaway(id);
      const startDate = giveaway.base.startDate._hex;
      const timeLength = giveaway.timeLength._hex;
  
      const startTimestamp = convertToDecimal(startDate);
      const endTimeInSeconds = startTimestamp + convertToDecimal(timeLength);
      const endTimeInMilliseconds = endTimeInSeconds * 1000;
  
      // Create a Date object for the end time
      const endDateObject = new Date(endTimeInMilliseconds);
  
      // Format the date as a string
      const options = { day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' };
      const formattedEndDate = endDateObject.toLocaleDateString('en-US', options);
  
      return formattedEndDate;
    } catch (e) {
      console.log(e);
      throw new Error('Failed to get giveaway end date.');
    }
  }
  
  // Assume convertToDecimal is a function to convert hex to decimal
  function convertToDecimal(hex) {
    return parseInt(hex, 16);
  }



  // async function getLiveGiveaways() {
  //   try {
  //     if (!isConnected || !walletProvider) {
  //       throw new Error("User not connected or wallet provider not available");
  //     }
  
  //     const ethersProvider = new ethers.providers.Web3Provider(walletProvider);
  //     const contract = new ethers.Contract(contractAddress, ABI, ethersProvider);
  //     const liveGiveaways = await contract.getLiveGiveaways();
  //     console.log(liveGiveaways)
  //     return liveGiveaways;
  //   } catch (error) {
  //     console.error("Error fetching live giveaways:", error);
  //     // Handle the error, show a message to the user, or take appropriate action
  //   }
  // } 
  // getLiveGiveaways();

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

  const converToDeciaml = (hex) => {
    const decimal = parseInt(hex, 16);
    return decimal;
  }

  const getGiveawayInfo = async (id) => {
    try {
      const raffleAmount = converToEthFromHex(await getGiveawayAmount(id));
      const raffleName = await getGiveawayName(id);
      const raffleCreater = await getGiveawayCreater(id);
      const raffleMaxParticipants = await getGiveawayMaxParticuls(id);
      const raffleStartDate = await getGiveawayStartDate(id);
      const raffleEndDate = await getGiveawayEndDate(id);
  
      return {
        amount: raffleAmount,
        name: raffleName,
        creater: raffleCreater,
        maxParticipants: raffleMaxParticipants,
        startDate: raffleStartDate,
        endDate: raffleEndDate,
      };
    } catch (error) {
      console.error("Error getting giveaway info:", error);
      return null;
    }
  };

  console.log(getGiveawayInfo(0))

  const initialRaffles = [
    {
      raffleImage: image, raffleName: raffle1.name, rules: 'follow us', status: 'live', prize: raffle1.amount, duration: raffle1.endDate, joined: "1560", creater: raffle1.creater,
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
