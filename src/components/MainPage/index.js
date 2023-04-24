import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

import { Loader } from '../Loader';
import { Advantages } from '../Advantages';
import { Input } from '../InputComponent';

import { generateRandomNumber, getCoinNetwork } from '../../helpers';

import { EMPTY_INPUT_ERROR_MESSAGE, INVALID_NUMBER } from '../Constants';

export const MainPage = () => {
  const { currency } = useSelector((state) => state.rootReducer);
  const [receive, setReceive] = useState(0);
  const [gave, setGave] = useState(0);
  const [currentCrypto, setCurrentCrypto] = useState('BTCUSDT');
  const [showLoader, setShowLoader] = useState(false);
  const [currencyNetwork, setCurrencyNetwork] = useState('Bitcoin');
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    mode: 'onSubmit',
    defaultValues: {
      currency: 'BTC-USDT',
    },
  });
  window.sessionStorage.setItem('lang', 'eng');

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
    sendData(data).then((response) => {
      if (response) {
        sessionStorage.setItem('exchangeInfo', JSON.stringify(response));
        showLoaderHandler();
      }
    });
  }, []);

  const showLoaderHandler = useCallback(() => {
    setShowLoader(true);

    setTimeout(() => {
      setShowLoader(false);
      window.location.pathname = '/faq';
    }, 1700);
  }, []);

  const sendData = (data) => {
    const requestObject = {
      ...data,
      exchangeId: generateRandomNumber(),
    }

    return axios.post(`http://localhost:8008/api/v1/response-data`, {
      body: {
        data: requestObject,
      },
    });
  };

  const onError = useCallback((data) => {
    console.log('Fill all inputs');
    console.log(data);
  }, []);

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
                <Input
                  type='text'
                  label="Currency network:"
                  disabled
                  inputAttributes={register('currencyNetwork', {
                    value: currencyNetwork,
                  })}
                  errorMessage={errors?.currencyNetwork?.message}
                />
              )}
              <Input
                type='number'
                label="You send (USDT):"
                inputAttributes={register('send', {
                  required: EMPTY_INPUT_ERROR_MESSAGE,
                  minLength: {
                    value: 2,
                    message: INVALID_NUMBER,
                  },
                  onChange: (event) => setGave(event.target.value),
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
              <Input
                type='email'
                label="Your email:"
                inputAttributes={register('email', {
                  required: EMPTY_INPUT_ERROR_MESSAGE,
                })}
                errorMessage={errors?.send?.email}
              />
              <Input
                label="Your address to receive funds:"
                inputAttributes={register('address', {
                  required: EMPTY_INPUT_ERROR_MESSAGE,
                })}
                errorMessage={errors?.send?.address}
              />
              <button className='submitButton' type='submit'>Submit</button>
            </form>
          </div>
        </div>
        <Advantages />
      </div>
    </>
  );
};
