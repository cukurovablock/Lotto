import React from 'react';
import profile from '../images/profile.png';
import Coin from '../images/coin.png';

function Wallet({ name, wallet }) {
  return (
    <div className="generalBox rounded-2xl bg-walletBg">
      <div className="row">
        <div className="col-4">
          <img src={profile} alt="Profile" className="profileImg w-16 m-2" />
        </div>
        <div className="col-8 justify-center items-center">
          <div className="row text-center m-1 mb-0 font-medium">
            <h5 className="nameText text-lg text-white">{name}</h5>
          </div>
          <div className="walletText ml-2 row text-center">
            <img src={Coin} alt="Star" className="w-6 h-6 col-4 p-0" />
            <h5 className="col-6 font-medium text-sm text-walletColor mt-1">{wallet}</h5>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Wallet;
