// pages/index.js

import { useState, useEffect } from 'react';

const IndexPage = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleKeyDown = (e) => {
    // Check if the 'Esc' key is pressed to close the modal
    if (e.key === 'Escape') {
      closeModal();
    }
  };

  useEffect(() => {
    // Focus the link inside the modal when it opens
    if (isModalOpen) {
      document.getElementById('modal-link').focus();
    }
  }, [isModalOpen]);

  return (
    <div>
      <style jsx>{`
        .hamburger {
          cursor: pointer;
          font-size: 24px;
          margin: 20px;
        }

        .modal {
          display: ${isModalOpen ? 'block' : 'none'};
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          z-index: 1;
        }

        .modal-content {
          background: white;
          padding: 20px;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      `}</style>

      <div
        className="hamburger"
        role="button"
        tabIndex="0"
        id="hamburger-button"
        onClick={openModal}
        onKeyDown={(e) => e.key === 'Enter' && openModal()}
      >
        ☰
      </div>

      <div
        className="modal"
        onClick={closeModal}
        onKeyDown={handleKeyDown}
        tabIndex="-1" // This makes the modal focusable
      >
        <div className="modal-content">
          {/* Link or Button inside the modal */}
          <a
            href="#"
            id="modal-link"
            onClick={(e) => {
              e.preventDefault();
              // Handle link click inside the modal
              alert('Link inside modal clicked!');
            }}
          >
            Click me inside modal
          </a>
        </div>
      </div>
    </div>
  );
};

export default IndexPage;
