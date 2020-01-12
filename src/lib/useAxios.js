// from
// https://github.com/strt/www/blob/6cb0dee92fc39ed71433a92996156e34639b8b49/src/lib/useAxios.js
// actually I think this is the original:
// https://github.com/ABWalters/react-api-hooks/blob/master/src/useAPI.js
// this is similar:
// https://github.com/use-hooks/react-hooks-axios/blob/master/src/index.js
/* 
NOTE:
Could use 

import useDeepCompareEffect from 'use-deep-compare-effect';

to fix the eslint hook warning, as if we pass args in an array literal,
hook is called infiitely. Just don't want to add a dependency when we can
fudge it by disabling eslint for that line. Though this may cause other problems.

 */

import { useReducer, useEffect, useCallback, useRef } from 'react';

import axios from 'axios';

const STATES = {
  loading: 0,
  success: 1,
  error: 2,
};

const initialState = { loading: true, error: false, data: undefined };

function axiosReducer(state, action) {
  switch (action.type) {
    case STATES.loading:
      return { ...state, loading: true, error: null };
    case STATES.error:
      return { ...state, loading: false, error: action.payload };
    case STATES.success:
      return { ...state, loading: false, error: null, data: action.payload };
    default:
      throw new Error();
  }
}

/*
useAxios 
- ARGS param currently only accepts url
*/
function fetch(args, options, dispatch) {
  let cancelToken = null;
  axios(args.url, {
    // ...args,
    // ...args.options,
    ...options,
    cancelToken: new axios.CancelToken(token => {
      cancelToken = token;
    }),
  })
    .then(({ data }) => {
      cancelToken = null;
      dispatch({ type: STATES.success, payload: data });
    })
    .catch(e => {
      if (axios.isCancel(e)) return;
      dispatch({ type: STATES.error });
    });
}

// eslint-disable-next-line import/prefer-default-export
export function useAxios(args, options = {}) {
  const [state, dispatch] = useReducer(axiosReducer, initialState);
  const task = useRef();

  const test = useCallback(fetch, [options, args]);

  useEffect(() => {
    // console.log(JSON.stringify(args.options));

    // console.log(args.options);
    /* 
    Only fetch when the url !== null
    (the url param is set to null when we are waiting on
    data from another instance of the hook) 
     */
    console.log('effect called');
    if (args.url) {
      //

      fetch(args, options, dispatch);
    }
    // return () => {
    //   if (cancelToken) {
    //     cancelToken();
    //   }
    // };
  }, [args.url]);

  return state;
}
