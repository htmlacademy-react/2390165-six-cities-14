/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import axios, { AxiosInstance } from 'axios';
import { useAppDispatch } from '../../hooks';
import { setOffers, isLoaded } from '../../store/actions';
import { Offer } from '../../types/offer';
import { useEffect } from 'react';
import store from '../../store';


const BASE_URL = 'https://14.design.pages.academy/six-cities';
const REQUEST_TIMEOUT = 5000;

export function createAPI(): AxiosInstance {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: REQUEST_TIMEOUT,
  });
  return api;
}

const Options = {
  BASE_URL: 'https://14.design.pages.academy/six-cities/'
};

async function request(path: string, options = {}) {
  const url = new URL(path, Options.BASE_URL);
  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(String(response.status));
  }
  return response.json();

}

function useGetOffers(dispatch: typeof store.dispatch) {
  useEffect(() => {
    let isNeedUpdate = true;
    async function startFetching() {
      const data = await request('offers');
      if (isNeedUpdate) {
        dispatch(setOffers(data));
        setTimeout(() => dispatch(isLoaded()), 500);
      }

    }
    startFetching();

    return (() => {
      isNeedUpdate = false;
    });
  }, []);
}


// function useGetOffers(dispatch: typeof store.dispatch) {
//   useEffect(() => {
//     let isNeedUpdate = true;

//     request('offers')
//       .then((data) => isNeedUpdate && dispatch(setOffers(data)))
//       .then(() => setTimeout(() =>
//         dispatch(isLoaded()), 500));


//     return (() => {
//       isNeedUpdate = false;
//     });
//   }, []);
// }

const options = {
  method: '',
  headers: { 'content-type': 'application/json' },
  body: []
};


export { useGetOffers };
