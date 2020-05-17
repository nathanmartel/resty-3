export const fetchResponse = (url, reqInit) => {
  return fetch(url, reqInit)
    .then(res => { 
      if(!res.ok) throw Error(res.statusText);
      else return res;
    })
    .then(res => res.json());
};

export const initHistoryFromLocalStorage = () => {
  const history = JSON.parse(localStorage.getItem('history'));
  if(!history) return [];
  else return history;
};

export const getLocalStorageHistory = () => {
  return JSON.parse(localStorage.getItem('history'));
};

export const setLocalStorageHistory = (newHistoryItem) => {
  let historyFromLS = getLocalStorageHistory();
  if(historyFromLS) {
    historyFromLS.push(newHistoryItem);
    localStorage.setItem('history', JSON.stringify(historyFromLS));
  } else {
    localStorage.setItem('history', JSON.stringify([newHistoryItem]));
  }
};
