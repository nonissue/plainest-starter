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

import { useReducer, useEffect, useRef, useMemo } from 'react';

import axios from 'axios';

const STATES = {
  loading: 0,
  success: 1,
  error: 2,
};

const initialState = { loading: true, error: null, data: undefined };

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

export const useMemoList = (list, compareFn = (a, b) => a === b) => {
  const listRef = useRef(list);
  const listChanged =
    list.length !== listRef.current.length ||
    list.some((arg, index) => !compareFn(arg, listRef.current[index]));
  if (listChanged) {
    // we can't do this in effects, which run too late.
    listRef.current = list;
  }
  return listRef.current;
};
let debug = false;

// Could maybe simplify parameter signature now that I think I have the deps handled.
// (spreading the url object seems a little redundant)
// I think it was the shape of the parameters (not consistent between objects/strings/arrays)
// that was causing me so many problems.

// eslint-disable-next-line import/prefer-default-export
export function useAxios(url, options = {}) {
  debug = false;
  const [state, dispatch] = useReducer(axiosReducer, initialState);

  // Memoing the passed params seems to resolve the useEffect dependency issues
  const config = useMemo(() => ({ ...url, ...options }), [url, options]);

  console.log('useAxios called.');
  useEffect(() => {
    let cancelToken = null;
    // eslint-disable-next-line no-console

    /* 
    Only fetch when the url !== null
    (the url param is set to null when we are waiting on
    data from another instance of the hook) 
     */

    if (config.url) {
      axios(config.url, {
        ...config.options,
        cancelToken: new axios.CancelToken(token => {
          cancelToken = token;
        }),
      })
        .then(({ data }) => {
          cancelToken = null;
          if (debug) {
            setTimeout(() => {
              dispatch({ type: STATES.success, payload: data });
            }, 1000);
          } else {
            dispatch({ type: STATES.success, payload: data });
          }
        })
        .catch(e => {
          if (axios.isCancel(e)) return;
          dispatch({ type: STATES.error });
        });
    }

    return () => {
      if (cancelToken) {
        cancelToken();
      }
    };
  }, [config.url, config.options]);

  return state;
}
