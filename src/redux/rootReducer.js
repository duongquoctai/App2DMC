import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';
import darkModeReducer from './slices/dark-mode';
import calendarReducer from './slices/calendar';
import userReducer from './slices/user';
import notificationsReducer from './slices/notifications';
import authReducer from './slices/auth';

// ----------------------------------------------------------------------

const rootPersistConfig = {
  key: 'root',
  storage: storage,
  keyPrefix: 'redux-',
  version: 1,
  whitelist: ['theme']
};

const productPersistConfig = {
  key: 'product',
  storage: storage,
  keyPrefix: 'redux-',
  blacklist: ['isLoading', 'error', 'products', 'product', 'filters']
};

const authPersistConfig = {
  key: 'auth',
  storage: storage,
  keyPrefix: 'redux-',
  blacklist: ['loginLoading', 'error']
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  theme: darkModeReducer,
  calendar: calendarReducer,
  user: userReducer,
  notifications: notificationsReducer
});

export { rootPersistConfig, rootReducer };
