export const SET_URL = 'SET_URL';
export const setUrl = (url) => ({
  type: SET_URL,
  payload: url
});

export const SET_METHOD = 'SET_METHOD';
export const setMethod = (method) => ({
  type: SET_METHOD,
  payload: method
});

export const SET_BODY = 'SET_BODY';
export const setBody = (body) => ({
  type: SET_BODY,
  payload: body
});

export const SET_AUTHTYPE = 'SET_AUTHTYPE';
export const setAuthType = (authType) => ({
  type: SET_AUTHTYPE,
  payload: authType
});

export const SET_AUTHUSERNAME = 'SET_AUTHUSERNAME';
export const setAuthUsername = (authUsername) => ({
  type: SET_AUTHUSERNAME,
  payload: authUsername
});

export const SET_AUTHPASSWORD = 'SET_AUTHPASSWORD';
export const setAuthPassword = (authPassword) => ({
  type: SET_AUTHPASSWORD,
  payload: authPassword
});

export const SET_AUTHTOKEN = 'SET_AUTHTOKEN';
export const setAuthToken = (authToken) => ({
  type: SET_AUTHTOKEN,
  payload: authToken
});

export const SET_RES = 'SET_RES';
export const setRes = (res) => ({
  type: SET_RES,
  payload: res
});

export const SET_LOADING = 'SET_LOADING';
export const setLoading = (loading) => ({
  type: SET_LOADING,
  payload: loading
});

export const SET_ERROR = 'SET_ERROR';
export const setError = (error) => ({
  type: SET_ERROR,
  payload: error
});

export const SET_HISTORY = 'SET_HISTORY';
export const setHistory = (history) => ({
  type: SET_HISTORY,
  payload: history
});

export const setLSHistory = () => {
  const history = JSON.parse(localStorage.getItem('history'));
  return history;
};
