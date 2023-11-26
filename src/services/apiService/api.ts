/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { setOffers, isLoaded } from '../../store/actions';
import { useEffect } from 'react';
import store from '../../store';
import { getToken } from './token';
import { Offer } from '../../types/offer';


const BASE_URL = 'https://14.design.pages.academy/six-cities';
const REQUEST_TIMEOUT = 5000;

function createAPI(): AxiosInstance {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = getToken();

      if (token && config.headers) {
        config.headers['x-token'] = token;
      }

      return config;
    });

  return api;
}

const Options = {
  BASE_URL: 'https://14.design.pages.academy/six-cities/'
};



function useGetOffers(dispatch: typeof store.dispatch, path: string) {
  useEffect(() => {
    let isNeedUpdate = true;
    async function startFetching() {
      const data = await request(path);
      if (isNeedUpdate) {
        dispatch(setOffers(data));
        setTimeout(() => dispatch(isLoaded()), 500);
      }

    }
    startFetching();

    return (() => {
      isNeedUpdate = false;
    });
  }, [dispatch, path]);
}

async function request(path: string, options = {}) {
  const url = new URL(path, Options.BASE_URL);
  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(String(response.status));
  }
  return response.json();

}

async function updateOffers(data: Offer): Promise<Offer> {
  const status = data.isFavorite ? 1 : 0;
  const response: Promise<Offer> = await request(`favorite/${data.id}/${status}`, {
    method: 'post',
    headers: {
      'content-type': 'application/json',
      'x-token': 'T2xpdmVyLmNvbm5lckBnbWFpbC5jb20=',
    },
    body: JSON.stringify(data)
  });

  return await response.json()
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

export { createAPI, useGetOffers, updateOffers };
