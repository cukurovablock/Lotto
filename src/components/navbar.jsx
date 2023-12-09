import React, { useState,useEffect } from 'react';
import logo from "../images/raffleIcon.png"
import ConnectButton from './walletConnect'
import GiveawayForm from './createRaffle';
import { Link } from 'react-scroll';
import "../style/navbar.css"

function Navbar() {
  const [showModal, setShowModal] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const handleCreateRaffle = () => {
    setShowModal(true);
  };

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navbarClasses = `navbar navbar-expand-lg${scrolled ? ' navbar-scrolled' : ''}`;
  return (
    <>
    <div>
      <nav className={navbarClasses}>
        <div className="container-fluid">
            <div className='logoArea flex mb-3'>
              <h1 className='title text-white text-4xl ml-4 mt-3 mr-4'>Lotto</h1>
              <div className='mt-4'>
              <Link to={""} className='text-white mx-2 text-xl mt-2'><i class="fa-brands fa-facebook"></i></Link>
              <Link to={""}  className='text-white mx-2 text-xl mt-2'><i class="fa-brands fa-twitter"></i></Link>
              <Link to={""}  className='text-white mx-2 text-xl mt-2'><i class="fa-brands fa-instagram"></i></Link> 
              <Link to={""}  className='text-white ml-2 text-xl mt-2 mr-10'><i class="fa-brands fa-youtube"></i></Link>  
              </div>   
            </div>
            <div className="titleArea w-68">
              <ul className="navbar-nav">
                    <li className="nav-item cursor-pointer mr-3">
                    <Link
                            className='nav-link text-xl text-white cursor-pointer relative'
                            activeClass="active"
                            to="topJoined"
                            spy={true}
                            smooth={true}
                            duration={100}
                        >
                            Top Joined 
                    </Link>
                    </li>
                    <li className="nav-item cursor-pointer mr-3">
                    <Link
                            className='nav-link cursor-pointer text-xl text-white relative'
                            activeClass="active"
                            to="raffleTable"
                            spy={true}
                            smooth={true}
                            duration={100}
                        >
                            Raffle Table
                    </Link>
                    </li>
                    <li className="nav-item cursor-pointer mr-3">
                    <Link
                            className='nav-link cursor-pointer text-xl text-white relative'
                            activeClass="active"
                            to="allRaffles"
                            spy={true}
                            smooth={true}
                            duration={100}
                        >
                            All Raffles
                    </Link>
                    </li>
                </ul>
            </div>
            <div className="navbar-nav">
                <button onClick={handleCreateRaffle} className='bg-blueOne text-white mr-3 ml-3  rounded-3xl p-2.5 mt-auto mb-auto'>Create Raffle</button> 
                <ConnectButton/>
            </div>
            </div>
        </nav>
    </div>
    <GiveawayForm showModal={showModal} setShowModal={setShowModal} />
    </>
  )
}

export default Navbar
