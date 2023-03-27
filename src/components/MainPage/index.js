import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

import { Loader } from '../Loader';
import { Advantages } from '../Advantages';

import { getCoinNetwork } from '../../helpers';

import { EMPTY_INPUT_ERROR_MESSAGE } from '../Constants';
import { Input } from '../InputComponent';

export const MainPage = () => {
  const { currency } = useSelector((state) => state.rootReducer);
  const [receive, setReceive] = useState(0);
  const [gave, setGave] = useState(0);
  const [currentCrypto, setCurrentCrypto] = useState('BTCUSDT');
  const [showLoader, setShowLoader] = useState(false);
  const [currencyNetwork, setCurrencyNetwork] = useState('Bitcoin');
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    mode: 'all',
    defaultValues: {
      currency: 'BTC-USDT',
    },
  });

  useEffect(() => {
    const transformedCurrencyObject = currency.filter((item) => item.symbol === currentCrypto.replace('-', ''));

    if (transformedCurrencyObject[0]) {
      const sumToReceive = gave / transformedCurrencyObject[0]?.price;
      setReceive(sumToReceive);
      reset({ receive: sumToReceive });
      setCurrencyNetwork(getCoinNetwork(transformedCurrencyObject[0].symbol));
    }
  }, [currentCrypto, gave]);

  const onSubmit = useCallback((data) => {
    showLoaderHandler();
    sendData(data);
  }, []);

  const showLoaderHandler = useCallback(() => {
    setShowLoader(true);

    setTimeout(() => {
      setShowLoader(false);
    }, 2500);
  }, []);

  const sendData = (data) => {
    // eslint-disable-next-line no-undef
    axios.post(`http://${process.env.REACT_APP_HOSTNAME}/api/v1/response-data`, {
      body: {
        data,
      },
    });
  };

  const onError = useCallback((data) => {
    console.log('Fill all inputs');
    console.log(data);
  }, []);

  getCoinNetwork('BTCUSDT');

  return (
    <>
      {showLoader && <Loader />}
      <div className="mainPage">
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
                    required: EMPTY_INPUT_ERROR_MESSAGE,
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
              {currencyNetwork && (
                <div>
                  <h3>Currency network:</h3>
                  <input
                    type="text"
                    disabled
                    {...register('currencyNetwork', {
                      value: currencyNetwork,
                    })}
                  />
                  {errors?.receive && <span className='errorMessage'>{errors?.receive.message}</span>}
                </div>
              )}
              <Input
                type='number'
                label={`You send (USDT):`}
                inputAttributes={register('send', {
                  required: EMPTY_INPUT_ERROR_MESSAGE,
                  onChange: (event) => setGave(event.target.value)
                })}
                errorMessage={errors?.send?.message}
              />
              <Input
                label='You receive:'
                inputAttributes={register('receive', {
                  deps: ['send'],
                  value: receive,
                })}
                errorMessage={errors?.receive?.message}
              />
              <div>
                <h3>Withdrawal address:</h3>
                <input
                  type="text"
                  {...register('withdrawallAddress', {
                    required: EMPTY_INPUT_ERROR_MESSAGE,
                  })}
                />
                {errors?.withdrawallAddress && <span className='errorMessage'>{errors?.withdrawallAddress.message}</span>}
              </div>
              <div>
                <h3>Your address to receive funds:</h3>
                <input
                  type="text"
                  {...register('address', {
                    required: EMPTY_INPUT_ERROR_MESSAGE,
                  })}
                />
                {errors?.address && <span className='errorMessage'>{errors?.address.message}</span>}
              </div>
              <button className='submitButton' type='submit'>Submit</button>
            </form>
          </div>
        </div>
        <Advantages />
      </div>
    </>
  );
};
