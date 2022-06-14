import { StyleSheet, Text, View } from 'react-native';
import rootReducers from './Reducers';
import Index from './Pages/Index';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

const store = createStore(rootReducers)

export default function App() {
  
  return (
   <Provider store = {store}>
      <Index/>
   </Provider>
  )
  
}
