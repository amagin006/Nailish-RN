import { CUSTOMERLIST_LOADING } from './actionTypes';

export const customerLoad = isFetching => {
  console.log('cutomerLoad', isFetching);
  return {
    type: CUSTOMERLIST_LOADING,
    payload: isFetching,
  };
};
