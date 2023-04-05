import { CURRENCY_TYPE } from "./components/Constants";

export const getCoinNetwork = (currency) => CURRENCY_TYPE[currency];

export const generateRandomNumber = () => Math.floor(Math.random() * (999999999 - 100000000 + 1)) + 100000000;
