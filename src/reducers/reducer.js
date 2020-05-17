import { initHistoryFromLocalStorage } from '../services/services';
import { SET_URL, SET_METHOD, SET_BODY, SET_AUTHTYPE, SET_AUTHUSERNAME, SET_AUTHPASSWORD, SET_AUTHTOKEN, SET_LOADING, SET_ERROR, SET_RES, SET_HISTORY, ADD_HISTORY } from "../actions/actions";

const initialState = {
  url: 'http://jsonplaceholder.typicode.com/posts',
  method: 'GET',
  body: '',
  authType: '',
  authUsername: '',
  authPassword: '',
  authToken: '',
  res: [],
  loading: false,
  error: '',
  history: initHistoryFromLocalStorage()
};

export default function reducer(state = initialState, action) {
  switch(action.type) {
    case SET_URL:
      return { ...state, url: action.payload };
    case SET_METHOD:
      return { ...state, method: action.payload };
    case SET_BODY:
      return { ...state, body: action.payload };
    case SET_AUTHTYPE:
      return { ...state, authType: action.payload };
    case SET_AUTHUSERNAME:
      return { ...state, authUsername: action.payload };
    case SET_AUTHPASSWORD:
      return { ...state, authPassword: action.payload };
    case SET_AUTHTOKEN:
      return { ...state, authToken: action.payload };
    case SET_LOADING:
      return { ...state, loading: action.payload };
    case SET_ERROR:
      return { ...state, error: action.payload };
    case SET_RES:
      return { ...state, res: action.payload };
    case ADD_HISTORY:
      return { ...state, history: [...state.history, action.payload] };
    case SET_HISTORY:
      return { ...state, history: action.payload };
    
    default:
      return state;
  }
}
