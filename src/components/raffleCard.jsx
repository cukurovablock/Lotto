import React, { useState,useEffect } from 'react';
import '../style/raffleCard.css';
import finished from '../images/finished.png';
import ViewRaffle from './viewRaffle';
import AOS from 'aos'


function RaffleCard({ raffleName, raffleImage, rules, status, creater, duration, joined, prize, ruleImg }) {
  const [isVisible, setIsVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(()=>{
    AOS.init({duration: 1000})
  },[])

  const handleViewRaffle = () => {
    setShowModal(true);
  };

  const handleMouseEnter = () => setIsVisible(true);
  const handleMouseLeave = () => setIsVisible(false);

  return (
    <div className="mb-5">
      <div data-aos="fade-down" className={`card w-56 h-96 m-4 raffle-card bg-sliderBg rounded-2xl relative ${status === 'finished' ? 'finished-card' : ''}`}>
        <div className={`finishArea absolute z-1 ${status === "finished" ? "block" : "hidden"} h-full flex items-center justify-center`}>
          <img src={finished} className='p-3'></img>
        </div>
        <div className='flex absolute top-2 left-2 statusArea'>
          <span className={`h-4 w-4 rounded-full mt-1 ${status === 'live' ? 'bg-green-600' : 'bg-red-600'}`}></span>
          <h4 className='text-white ml-2 text-lg'>{status}</h4>
        </div>
        <div className="w-58 h-58 flex items-center justify-center">
          <img src={raffleImage} className="card-img-top object-contain rounded-2xl w-52 h-52 " alt={raffleName} />
        </div>
        <div className="card-body justify-center items-center flex flex-col">
          <h5 className="card-title text-cardText2 font-semibold text-2xl text-center">{raffleName}</h5>
          <button
            onClick={handleViewRaffle}
            className="bg-blueOne joinButton shadow-2xl shadow-black text-white py-2 w-36 px-10 rounded-ss-xl rounded-ee-xl"
          >
            VIEW
          </button>
        </div>
        <button
          className="bg-purpleOne rounded-full text-white w-8 absolute right-2 top-2 infoButton"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <i className="p-2 fa-solid fa-info"></i>
        </button>
      </div>
      <ViewRaffle
        image={raffleImage}
        name={raffleName}
        prize={prize}
        duration={duration}
        creater={creater}
        joined={joined}
        rules={rules}
        showModal={showModal}
        setShowModal={setShowModal}
        ruleImg={ruleImg}
      />
    </div>
  );
}

export default RaffleCard;
