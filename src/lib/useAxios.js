// from
// https://github.com/strt/www/blob/6cb0dee92fc39ed71433a92996156e34639b8b49/src/lib/useAxios.js

/* 
NOTE:
Could use 

import useDeepCompareEffect from 'use-deep-compare-effect';

to fix the eslint hook warning, as if we pass args in an array literal,
hook is called infiitely. Just don't want to add a dependency when we can
fudge it by disabling eslint for that line. Though this may cause other problems.

 */

import { useReducer, useEffect } from 'react';

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
      return { ...state, loading: true, error: false };
    case STATES.error:
      return { ...state, loading: false, error: true };
    case STATES.success:
      return { ...state, loading: false, error: false, data: action.payload };
    default:
      throw new Error();
  }
}

export default function useAxios(args) {
  const [state, dispatch] = useReducer(axiosReducer, initialState);

  useEffect(() => {
    let cancelToken = null;

    dispatch({ type: STATES.loading });

    // async function start() {
    axios({
      ...args,
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
    // }

    return () => {
      if (cancelToken) {
        cancelToken();
      }
    };
    // The effect dependencies not being an array literal is a problem
    // but I don't see immediate side effects, and there isn't an easy way to fix it AFAIK.we ony
    // we only want this to run once anyway?
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(state);

  return state;
}

// const ASYNC_STATES = {
//   loading: 0,
//   success: 1,
//   error: 2,
// };

function asyncAxiosReducer(state, action) {
  switch (action.type) {
    case STATES.loading:
      return { ...state, loading: true, error: false };
    case STATES.error:
      return { ...state, loading: false, error: true };
    case STATES.success:
      return { ...state, loading: false, error: false, data: action.payload };
    default:
      throw new Error();
  }
}

export function useAxiosAsync(args) {
  const [state, dispatch] = useReducer(axiosReducer, initialState);

  useEffect(() => {
    let cancelToken = null;

    dispatch({ type: STATES.loading });

    const start = async () => {
      try {
        const result = await axios(args.url);
      } catch (err) {
        throw new Error(err);
      }
    };

    // async function start() {
    axios({
      ...args,
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
    // }

    return () => {
      if (cancelToken) {
        cancelToken();
      }
    };
    // The effect dependencies not being an array literal is a problem
    // but I don't see immediate side effects, and there isn't an easy way to fix it AFAIK.we ony
    // we only want this to run once anyway?
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(state);

  return state;
}

// export function async useAxiosAsync =
