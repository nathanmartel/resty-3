import { useSelector } from 'react-redux';
import  { getMethod, getBody, getAuthType, getAuthUsername, getAuthPassword, getAuthToken } from '../selectors/selectors';

export default function useFormatRequest() {

  const method = useSelector(getMethod);
  const body = useSelector(getBody);
  const authType = useSelector(getAuthType);
  const authUsername = useSelector(getAuthUsername);
  const authPassword = useSelector(getAuthPassword);
  const authToken = useSelector(getAuthToken);
  
  // Setup request
  const reqInit = {
    method: method
  };

  // Add body if requested and valid
  if(body && (method === 'GET') || (method === 'PATCH') || (method === 'PUT')) reqInit.body = JSON.parse(body);
  
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

  return reqInit;
}
