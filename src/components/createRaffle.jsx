import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const GiveawayForm = ({ showModal, setShowModal }) => {
  const [giveawayData, setGiveawayData] = useState({
    name: '',
    prize: '',
    conditions: '',
    duration: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setGiveawayData({ ...giveawayData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Giveaway data submitted:', giveawayData);
    setShowModal(false);
  };

  return (
    <>
      <Modal show={showModal} onHide={() => setShowModal(false)} >
        <Modal.Header className='border-none text-white bg-purpleOne' >
          <Modal.Title className='w-full flex items-center justify-center'>Create Giveaway</Modal.Title>
        </Modal.Header>
        <Modal.Body className='text-white bg-purpleOne'>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="giveawayName">
              <Form.Label>Giveaway Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter giveaway name"
                name="name"
                value={giveawayData.name}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="giveawayPrize">
              <Form.Label>Prize</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter prize details"
                name="prize"
                value={giveawayData.prize}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="giveawayConditions">
              <Form.Label>Conditions</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter giveaway conditions"
                name="conditions"
                value={giveawayData.conditions}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="giveawayDuration">
              <Form.Label>Duration</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter giveaway duration"
                name="duration"
                value={giveawayData.duration}
                onChange={handleInputChange}
              />
            </Form.Group>

        <div className='w-full flex items-center justify-center'>
            <Button className='bg-blueOne mt-3' variant="primary" type="submit">
              Create Giveaway
            </Button>
        </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default GiveawayForm;
