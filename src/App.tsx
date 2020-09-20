import React, { useState } from 'react';
import Modal from 'react-modal';
import './App.css';
import BookSearchDialog from './BookSearchDialog';

Modal.setAppElement('#root');

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.7)"
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    padding: 0,
    transform: 'translate(-50%, -50%)'
  }
};

const App = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleAddClick = () => {
    setModalIsOpen(true);
  }

  const handleModalClose = () => {
    setModalIsOpen(false);
  }

  return (
    <div className="App">
      <section className="nav">
        <h1>買いたい本リスト</h1>
        <div className="button-like" onClick={handleAddClick}>追加</div>
      </section>
      <Modal isOpen={modalIsOpen} onRequestClose={handleModalClose} style={customStyles} >
        <BookSearchDialog maxResults={20} />
      </Modal>
    </div>
  );
}

export default App;
