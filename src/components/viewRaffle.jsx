import React from 'react';
import { Modal } from 'react-bootstrap';
import RuleBox from './ruleBox';
import profile from '../images/profile.png';
import '../style/viewRaffle.css';

const ViewRaffle = ({ showModal, setShowModal, name, prize, duration, creater, joined, rules, image, ruleImg }) => {
  const isRulesArray = Array.isArray(rules);

  return (
    <>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header className='bg-purpleOne border-0'>
          <Modal.Title className=' text-white w-full flex items-center justify-center'>{name}</Modal.Title>
        </Modal.Header>
        <Modal.Body className='bg-purpleOne'>
          <div className='row'>
            <div className='col-6'>
              <div className='durationAndJoinedArea flex justify-between m-3'>
                <h1 className='text-center text-white text-lg p-1 bg-blueOne'>{duration}</h1>
                <h1 className='text-center text-white text-lg p-1 bg-blueOne'>{joined} People Joined !</h1>
              </div>
              <div className='prizeArea'>
                <h1 className='text-center text-white text-4xl'>{prize}</h1>
              </div>
              <div className='imageArea flex items-center justify-center'>
                <img src={image} className='w-64' alt={name} />
              </div>
            </div>
            <div className='col-6'>
              <h5 className='text-center text-white text-lg'>RULES</h5>
              <div className='rulesAresv flex flex-wrap gap-4'>
                {isRulesArray && rules.map((rule, index) => (
                  <RuleBox rule={rule} key={index} image={ruleImg} />
                ))}
              </div>
            </div>
          </div>
          <div className='joinAndCreaterArea relative my-2'>
            <div className='joinButtonArea flex items-center justify-center'>
              <button
                className="bg-blueOne joinButton shadow-2xl shadow-black text-white py-2 w-36 px-10 rounded-ss-xl rounded-ee-xl"
              >
                JOIN
              </button>
            </div>
            <div className='createrArea row absolute right-1 bottom-1 flex'>
              <img src={profile} className='w-16 col-8' alt={creater} />
              <h4 className='col-4 text-white flex items-center justify-center'>{creater}</h4>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ViewRaffle;
