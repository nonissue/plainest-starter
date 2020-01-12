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
      return { ...state, loading: true, error: null };
    case STATES.error:
      return { ...state, loading: false, error: action.payload };
    case STATES.success:
      return { ...state, loading: false, error: null, data: action.payload };
    default:
      throw new Error();
  }
}

export default function useAxios(args) {
  const [state, dispatch] = useReducer(axiosReducer, initialState);

  useEffect(() => {
    let cancelToken = null;

    dispatch({ type: STATES.loading });

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

  return state;
}

// eslint-disable-next-line no-unused-vars
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

/* 
Create the async task
Return the async task

*/

export function createAxiosAsync(args) {
  const start = async () => {
    try {
      const result = await axios({ ...args });
      return result;
    } catch (err) {
      throw new Error(err);
    }
  };

  return start;
}

/* 
Funtion: useAxiosAsync

parameter: args -> has to be an object with a url field 
returns: state (created with reducer after data is fetched)

Is there any diff between useaxios and useaxiosasync?

TODO: 
- [ ] test
- [ ] unsub for effect
- [ ] axios cancel
- [ ] abstract so we can create other async tasks
 */
export function useAxiosAsync(args) {
  const [state, dispatch] = useReducer(axiosReducer, initialState);
  const asyncTask = createAxiosAsync(args);

  useEffect(() => {
    if (!args.url) {
      return;
    }

    dispatch({ type: STATES.loading });

    if (asyncTask) {
      (async () => {
        try {
          const result = await asyncTask();
          dispatch({ type: STATES.success, payload: result.data });
        } catch (e) {
          if (axios.isCancel(e)) return;

          dispatch({ type: STATES.error });
        }
      })();
    } else {
      dispatch({ types: STATES.error });
    }

    // The effect dependencies not being an array literal is a problem
    // but I don't see immediate side effects, and there isn't an easy way to fix it AFAIK.we ony
    // we only want this to run once anyway?
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [args.url]);

  // console.log(state);

  return state;
}

// export function async useAxiosAsync =
