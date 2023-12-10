import React from 'react'
import RuleBox from './ruleBox'
import mobile from "../images/mobile.png"
import x from '../images/XLogo.png';
import wallet from "../images/Wallet.png"
import account from "../images/Accountt.png"
import "../style/generalRaffle.css"

function GeneralRaffle({image}) {
  return (
    <div>
        <div className='row w-10/12 bg-sliderBg ml-auto mr-auto rounded-2xl'>
        <div className='raffleNameArea col-4 inline-block mt-auto mb-auto'>
          <h1 className='text-white text-6xl text-center mb-4'>100 ETHEREUM GIVEAWAY</h1>
          <div className='dayArea row w-full rounded-xl bg-pinkOne ml-auto mr-auto'>
            <h3 className=' text-white mx-3 py-1 text-lg m-2 flex items-center justify-center letter tracking-wide font-medium'>Last 4 Days</h3>
          </div>
          <div className='joinedArea row w-full rounded-xl bg-purpleOne mt-3 ml-auto mr-auto'>
            <h3 className=' text-white mx-3 py-1 text-lg m-2 flex items-center justify-center tracking-wide font-medium'>1364 People Joined !</h3>
          </div>
        </div>

        <div className='imageArea col-4 items-center justify-center inline-block'>
          <div>
            <img src={image} className='w-full flex items-center justify-center m-3'/>
          </div>
          <div className='w-full flex items-center justify-center m-1 mb-5'>
            <button className='bg-blueOne joinButton shadow-2xl shadow-black text-white py-2 w-44 px-10 rounded-ss-xl rounded-ee-xl' >
              <h4 className='tracking-wider font-medium text-lg'>Join</h4>
            </button>
          </div>
        </div>
        <div className='rulesArea col-4 mt-auto mb-auto'>
          <div className='ruleBoxes'>
            <div className='flex items-center justify-center'><h3 className='text-white text-xl underline'>Rules</h3></div>
            <RuleBox image={x} rule={"You must follow us in twitter."}/>
            <RuleBox image={wallet} rule={"There must be at least 5 ETH in your account."}/>
            <RuleBox image={account} rule={"Your account must be created at least 3 months ago."}/>
        </div>
        </div>
        </div>
    </div>
  )
}

export default GeneralRaffle
