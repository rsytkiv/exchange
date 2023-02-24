import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchCurrencyPrice } from '../../store/rootReducer';

import { PAIRS_LIST } from '../Constants';

import Logo from '../../images/logo.jpeg';

const Navigation = () => {
  const dispatch = useDispatch();
  const { currency, prevCurrency } = useSelector((state) => state.rootReducer);
  const [active, setActive] = useState(false);
  const slicedArray = currency.slice(0, 6);

  useEffect(() => {
    dispatch(fetchCurrencyPrice(PAIRS_LIST));

    const interval = setInterval(() => {
      dispatch(fetchCurrencyPrice(PAIRS_LIST));
    }, '3000');

    return () => {
      clearInterval(interval)
    }
  }, [dispatch]);

  useEffect(() => {
    const burger = document.querySelector('.burger');

    burger.addEventListener('click', () => {
      burger.classList.toggle('active');
    });
  }, []);

  const onClickHandler = () => {
    setActive(!active);
    console.log(active);
  };

  return (
    <div className="header">
      <div className="navbar">
        <img src={Logo} className="navigationLogo" alt="logo" />
        {/* <div className="homeButtonContainer">
          <Link className="homeButton" to="/">Home</Link>
        </div>
        <div>
          <Link className="exchangeButton" to="/exchange">Exchange</Link>
        </div> */}
      </div>
      <div className="priceContainer">
        {slicedArray?.map((item) => (
          <div key={item.symbol}>
            <span className="currencyBoldText">{item.symbol.replace('USDT', '')}</span> - ${parseFloat(item.price)}
          </div>
        ))}
      </div>
      <div className="mobileMenu">
        <div
          className="burger"
          onClick={onClickHandler}
        >
          <span></span>
        </div>
        <div className="mobileMenuContent">
          <ul className="mobileNavigationList">
            <li>Home</li>
            <li>About</li>
            <li>Terms</li>
            <li></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
