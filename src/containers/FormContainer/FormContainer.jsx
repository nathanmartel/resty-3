import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import  { getUrl, getMethod, getBody, getAuthType, getAuthUsername, getAuthPassword, getAuthToken } from '../../selectors/selectors';
import RequestForm from '../../components/RequestForm/RequestForm';
import styles from './FormContainer.css';
import { setUrl, setMethod, setBody, setAuthType, setAuthUsername, setAuthPassword, setAuthToken, setRes, setError } from '../../actions/actions';


const FormContainer = () => {
  
  const url = useSelector(getUrl);
  const method = useSelector(getMethod);
  const body = useSelector(getBody);
  const authType = useSelector(getAuthType);
  const authUsername = useSelector(getAuthUsername);
  const authPassword = useSelector(getAuthPassword);
  const authToken = useSelector(getAuthToken);
  const authUsernamePlaceholder = 'Username';
  const authPasswordPlaceholder = 'Password';
  const authTokenPlaceholder = 'Bearer Token';
  // const history = useSelector(useLSHistory);
  const dispatch = useDispatch();
  
  const handleUrlChange = ({ target }) => dispatch(setUrl(target.value));
  const handleMethodChange = ({ target }) => dispatch(setMethod(target.value));
  const handleBodyChange = ({ target }) => dispatch(setBody(target.value));
  const handleAuthTypeChange = ({ target }) => dispatch(setAuthType(target.value));
  const handleAuthUsernameChange = ({ target }) => dispatch(setAuthUsername(target.value));
  const handleAuthPasswordChange = ({ target }) => dispatch(setAuthPassword(target.value));
  const handleAuthTokenChange = ({ target }) => dispatch(setAuthToken(target.value));

  function fetchRequest() {
    console.log('in fetchRequest');
    // Setup request
    const reqInit = {
      method: method
    };

    // Add body if requested
    if(body) reqInit.body = JSON.parse(body);
    
    // Add headers if requested
    if(authType === 'basic') {
      const encodedData = btoa(`${authUsername} ${authPassword}`);  
      const myHeaders = new Headers;
      myHeaders.append('Authorization', `Basic ${encodedData}`);
      reqInit.headers = myHeaders; 
    }
    if(authType === 'bearerToken') {
      const myHeaders = new Headers;
      myHeaders.append('Authorization', `Bearer ${authToken}`);
      reqInit.headers = myHeaders; 
    }

    // Send that request!
    fetch(url, reqInit)
      .then(res => { 
        if(!res.ok) throw Error(res.statusText);
        else return res;
      })
      .then(res => res.json())
      // Make sure response is in array form
      .then(json => Array.isArray(json) 
        ? dispatch(setRes(json)) 
        : dispatch(setRes([json])))
      .catch(err => dispatch(setError(err)));
  }

  // Create a history item and update request history in localStorage
  // function addFetchToHistory() {

  //   const newHistoryItem = { 
  //     url,
  //     method,
  //     body,
  //     authType,
  //     authUsername,
  //     authPassword,
  //     authToken
  //   };

  //   console.log('in useAddFetchToHistory');
  //   let newHistory;
  //   if(history) {
  //     newHistory = history;
  //     newHistory.push(newHistoryItem);
  //     localStorage.setItem('history', JSON.stringify(newHistory));
  //   } else {
  //     localStorage.setItem('history', JSON.stringify([newHistoryItem]));
  //   }
  // }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'SET_ERROR', payload: '' });
    fetchRequest();
    dispatch({ type: 'SET_LOADING', payload: false });
    console.log('submitting!');
    // addFetchToHistory();
  };


  return (
    <RequestForm 
      url={url} 
      onUrlChange={handleUrlChange}
      method={method} 
      body={body}
      onMethodChange={handleMethodChange}
      onBodyChange={handleBodyChange}
      authType={authType}
      authUsername={authUsername}
      authPassword={authPassword}
      authToken={authToken}
      authUsernamePlaceholder={authUsernamePlaceholder}
      authPasswordPlaceholder={authPasswordPlaceholder}
      authTokenPlaceholder={authTokenPlaceholder}
      onAuthTypeChange={handleAuthTypeChange}
      onAuthUsernameChange={handleAuthUsernameChange}
      onAuthPasswordChange={handleAuthPasswordChange}
      onAuthTokenChange={handleAuthTokenChange}
      onSubmit={handleSubmit}  
    />
  );
};

export default FormContainer;
