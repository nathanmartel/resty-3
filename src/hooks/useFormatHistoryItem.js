import { useSelector } from 'react-redux';
import  { getMethod, getBody, getAuthType, getAuthUsername, getAuthPassword, getAuthToken, getUrl } from '../selectors/selectors';

export default function useFormatHistoryItem() {

  const url = useSelector(getUrl);
  const method = useSelector(getMethod);
  const body = useSelector(getBody);
  const authType = useSelector(getAuthType);
  const authUsername = useSelector(getAuthUsername);
  const authPassword = useSelector(getAuthPassword);
  const authToken = useSelector(getAuthToken);
  
  const newHistoryItem = { 
    url,
    method,
    body,
    authType,
    authUsername,
    authPassword,
    authToken
  };

  return newHistoryItem;
}
