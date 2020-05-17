import React from 'react';
import { getHistory } from '../../selectors/selectors';
import { useSelector, useDispatch } from 'react-redux';
import HistoryItem from '../../components/HistoryItem/HistoryItem';
import styles from './HistoryList.css';
import { setHistory, setUrl, setMethod, setBody, setAuthType, setAuthUsername, setAuthPassword, setAuthToken } from '../../actions/actions';

const HistoryList = () => {

  const history = useSelector(getHistory);
  const dispatch = useDispatch();
  
  const handleClearHistory = () => {
    localStorage.removeItem('history');
    dispatch(setHistory([]));
  };
  
  const handleLoadHistoryItem = (index) => {
    dispatch(setUrl(history[index].url));
    dispatch(setMethod(history[index].method));
    dispatch(setBody(history[index].body));
    dispatch(setAuthType(history[index].authType));
    dispatch(setAuthUsername(history[index].authUsername));
    dispatch(setAuthPassword(history[index].authPassword));
    dispatch(setAuthToken(history[index].authToken));
  };
  

  const historyObj = history.map((item, index) => 
    <HistoryItem 
      key={index} 
      method={item.method} 
      url={item.url} 
      index={index} 
      onLoadHistoryItemClick={() => handleLoadHistoryItem(index)} 
    />);
  
  return (
    <>
      <div className={styles.HistoryList}>
        <h3>History</h3>
        <hr />
        {history && history.length > 0 &&
          <>
            {historyObj}
            <button onClick={() => handleClearHistory()}>Clear History</button>
          </>
        }
      </div>
    </>
  );
};

export default HistoryList;
