import React from 'react';
import { CURRENCY_NETWORK } from '../Constants';

export const FaqPage = () => {
  const variables = JSON.parse(sessionStorage.getItem('exchangeInfo'));

  return (
    <>
      {variables?.data && (
        <div className="ticketContainer">
          <span>
            <span className="bold">Your exchange id is:</span> {variables?.data?.exchangeId}
          </span>
          <br/>
          <span>
            Now you see the address to which you should transfer <span className="bold">{variables?.data?.sumToSend} USDT</span>.
            After our approval you will receive your <span className="bold">{variables?.data?.currency.replace('-USDT', '')}</span>.
            <br/>
            Typically it happens during an hour
          </span>
          <br/>
          <ul>
            <li>
              <span className="bold">Currency:</span> {variables?.data?.currency}
            </li>
            <li>
              <span className="bold">Network:</span> {variables?.data?.currencyNetwork}
            </li>
            <li>
              <span className="bold">Amount to send:</span> {variables?.data?.send}
            </li>
            <li>
              <span className="bold">Amount to receive:</span> {variables?.data?.receive}
            </li>
          </ul>
          <span className="address">
            <span className="bold">Address to transfer:</span>
            <br/>
            <span>{CURRENCY_NETWORK[variables?.data?.currency.replace('-', '')]}</span>
          </span>
        </div>
      )}
    </>
  );
};
