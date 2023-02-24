import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

import { Loader } from '../Loader';

import { emptyInputErrorMessage } from '../Constants';

import Logo from '../../images/logo.jpeg';

const MainPage = () => {
  const { currency } = useSelector((state) => state.rootReducer);
  const [receive, setReceive] = useState(0);
  const [gave, setGave] = useState(0);
  const [currentCrypto, setCurrentCrypto] = useState('BTCUSDT');
  const [showLoader, setShowLoader] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    mode: 'all',
    defaultValues: {
      currency: 'BTC-USDT',
    },
  });

  useEffect(() => {
    const a = currency.filter((item) => item.symbol === currentCrypto.replace('-', ''));

    if (a[0]) {
      const sumToReceive = gave / a[0]?.price;
      setReceive(sumToReceive);
      reset({ receive: sumToReceive });
    }
  }, [currentCrypto, gave]);

  const onSubmit = (data) => {
    showLoaderHandler();
    sendData(data);
  };

  const showLoaderHandler = () => {
    setShowLoader(true);

    setTimeout(() => {
      setShowLoader(false);
    }, 2500);
  };

  const sendData = (data) => {
    axios.post('http://localhost:8008/api/v1/response-data', {
      body: {
        data,
      },
    });
  };

  const onError = (data) => {
    console.log('Fill all inputs');
    console.log(data);
  };

  return (
    <>
      {showLoader && <Loader />}
      <div className="mainPage">
        <div className="buttonsContainer">
          <img src={Logo} className="buttonsLogo" alt="logo" />
          <span>Exchange rate</span>
          <span>News</span>
          <span>FAQ</span>
          <span>About</span>
        </div>
      <div className="exchangeContainer">
        <div className="exchangeTextContainer">
          <h1>Exchange Crypto simple</h1>
          <div className="margin">
            Fast, automatic and no hidden commissions.
            The easiest way to exchange cryptocurrency
            online. Minimal form of personal identification.
          </div>
          <h1>What is the transaction fee?</h1>
          <div>
            The transaction fee depends on the network fee for
            the coins you are trading. All commissions are
            included in the transaction amount, which you can
            see before proceeding with the exchange.
          </div>
        </div>
        <div className="exchangeInterfaceContainer">
          <form className="buyContainer" onSubmit={handleSubmit(onSubmit, onError)}>
            <div>
              <h3>Choose pair:</h3>
              <select
                {...register('currency', {
                  required: emptyInputErrorMessage,
                  onChange: (event) => setCurrentCrypto(event.target.value),
                })}
                defaultValue="Select pair"
              >
                {currency?.map((item) => (
                  <option key={item.symbol}>
                    {item.symbol.replace('USDT', '-USDT')}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <h3>You send {'(USDT)'}:</h3>
              <input
                type="text"
                {...register('send', {
                  required: emptyInputErrorMessage,
                  onChange: (event) => setGave(event.target.value)
                })}
              />
              {errors?.send && <span className='errorMessage'>{errors?.send.message}</span>}
            </div>
            <div>
              <h3>You receive:</h3>
              <input
                type="text"
                disabled
                {...register('receive', {
                  deps: ['send'],
                  value: receive,
                })}
              />
              {errors?.receive && <span className='errorMessage'>{errors?.receive.message}</span>}
            </div>
            <div>
              <h3>Your address:</h3>
              <input
                type="text"
                {...register('address', {
                  required: emptyInputErrorMessage,
                })}
              />
              {errors?.address && <span className='errorMessage'>{errors?.address.message}</span>}
            </div>
            <button className='submitButton' type='submit'>Submit</button>
          </form>
        </div>
      </div>
    </div>
    </>
  );
};

export default MainPage;
