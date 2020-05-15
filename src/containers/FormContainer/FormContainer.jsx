import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import  { getUrl, getMethod, getBody, getAuthType, getAuthUsername, getAuthPassword, getAuthToken } from '../../selectors/selectors';
import RequestForm from '../../components/RequestForm/RequestForm';
import styles from './FormContainer.css';


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
  
  const handleUrlChange = ({ target }) => dispatch({ type: 'SET_URL', payload: target.value });
  const handleMethodChange = ({ target }) => dispatch({ type: 'SET_METHOD', payload: target.value });
  const handleBodyChange = ({ target }) => dispatch({ type: 'SET_BODY', payload: target.value });
  const handleAuthTypeChange = ({ target }) => dispatch({ type: 'SET_AUTHTYPE', payload: target.value });
  const handleAuthUsernameChange = ({ target }) => dispatch({ type: 'SET_AUTHUSERNAME', payload: target.value });
  const handleAuthPasswordChange = ({ target }) => dispatch({ type: 'SET_AUTHPASSWORD', payload: target.value });
  const handleAuthTokenChange = ({ target }) => dispatch({ type: 'SET_AUTHTOKEN', payload: target.value });

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
        ? dispatch({ type: 'SET_RES', payload: json }) 
        : dispatch({ type: 'SET_RES', payload: [json] }))
      .catch(err => dispatch({ type: 'SET_ERROR', payload: err }));
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
