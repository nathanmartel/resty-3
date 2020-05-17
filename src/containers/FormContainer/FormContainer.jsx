import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import  { getUrl, getMethod, getBody, getAuthType, getAuthUsername, getAuthPassword, getAuthToken } from '../../selectors/selectors';
import RequestForm from '../../components/RequestForm/RequestForm';
import styles from './FormContainer.css';
import { setUrl, setMethod, setBody, setAuthType, setAuthUsername, setAuthPassword, setAuthToken, setRes, setError, setLoading, addHistory } from '../../actions/actions';
import useFormatRequest from '../../hooks/useFormatRequest';
import { fetchResponse, setLocalStorageHistory } from '../../services/services';
import useFormatHistoryItem from '../../hooks/useFormatHistoryItem';


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
  
  const reqInit = useFormatRequest();
  const newHistoryItem = useFormatHistoryItem();
  const dispatch = useDispatch();
  
  const handleUrlChange = ({ target }) => dispatch(setUrl(target.value));
  const handleMethodChange = ({ target }) => dispatch(setMethod(target.value));
  const handleBodyChange = ({ target }) => dispatch(setBody(target.value));
  const handleAuthTypeChange = ({ target }) => dispatch(setAuthType(target.value));
  const handleAuthUsernameChange = ({ target }) => dispatch(setAuthUsername(target.value));
  const handleAuthPasswordChange = ({ target }) => dispatch(setAuthPassword(target.value));
  const handleAuthTokenChange = ({ target }) => dispatch(setAuthToken(target.value));

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    dispatch(setError(''));
    fetchResponse(url, reqInit)
      // Make sure response is in array form
      .then(json => Array.isArray(json) 
        ? dispatch(setRes(json)) 
        : dispatch(setRes([json])))
      .then(dispatch(setLoading(false)))
      .then(setLocalStorageHistory(newHistoryItem))
      .then(dispatch(addHistory(newHistoryItem)))
      .catch(err => dispatch(setError(err)));    
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
