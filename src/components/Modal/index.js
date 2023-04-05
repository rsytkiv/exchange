import React from 'react';
import PropTypes from 'prop-types';

export const Modal = ({
  modalState,
  setModalState,
  exchangeId,
  sumToSend,
  sumtoReceive,
  currency,
}) => {
  const onClickHandler = () => {
    setModalState(!modalState);
  };

  return (
    <div className="modal-container">
      <div className="modal">
        <span>
          <span className="bold">Your exchange id is:</span> {exchangeId}
        </span>
        <br/>
        <span>
          Now you see the address to which you should transfer <span className="bold">{sumToSend} USDT</span>
          <br/>
          After our approval you will receive your <span className="bold">{sumtoReceive} {currency}</span>.
          <br/>
          Typically it happens during an hour
        </span>
        <span>
          Address to transfer: <span className="bold">0x5e2bfc30dcc3941149d8c79c637076e78708b850cf9edd146cd8b2136082d3e3</span>
        </span>
        <div
          className="close"
          onClick={onClickHandler}
        >
          &times;
        </div>
      </div>
    </div>
  );
};

Modal.defaultProps = {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setModalState: () => {},
  sumToSend: '',
  sumtoReceive: 0,
  currency: '',
};

Modal.propTypes = {
  modalState: PropTypes.bool.isRequired,
  setModalState: PropTypes.func,
  exchangeId: PropTypes.number.isRequired,
  sumToSend: PropTypes.string,
  sumtoReceive: PropTypes.number,
  currency: PropTypes.string,
};
