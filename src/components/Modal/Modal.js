import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

export const ImgModal = ({ img, isOpen, onClose }) => {
  return (
    <Modal 
    isOpen={isOpen}
    style={customStyles}
    onRequestClose={onClose}>
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          flexDirection: 'column',
        }}
      >
        <button onClick={onClose}>x</button>
        <img src={img} alt='{alt}' width={600} />
      </div>
    </Modal>
  );
};
 