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
};

export default function reducer(state = initialState, action) {
  switch(action.type) {
    case 'SET_URL':
      return { ...state, url: action.payload };
    case 'SET_METHOD':
      return { ...state, method: action.payload };
    case 'SET_BODY':
      return { ...state, body: action.payload };
    case 'SET_AUTHTYPE':
      return { ...state, authType: action.payload };
    case 'SET_AUTHUSERNAME':
      return { ...state, authUsername: action.payload };
    case 'SET_AUTHPASSWORD':
      return { ...state, authPassword: action.payload };
    case 'SET_AUTHTOKEN':
      return { ...state, authToken: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_RES':
      return { ...state, res: action.payload };
    
    default:
      return state;
  }
}
