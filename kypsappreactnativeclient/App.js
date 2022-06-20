import { StyleSheet, Text, View } from 'react-native';
import rootReducers from './Reducers';
import Index from './Pages/Index';
import Home from './Pages/Home/home';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const store = createStore(rootReducers)
const stack = createNativeStackNavigator()

export default function App() {
  
  return (
    <Provider store = {store}>
      <NavigationContainer>
          <stack.Navigator screenOptions={{headerShown:false}}>
            {/* <stack.Screen component={Index} name="index"/> */}
            <stack.Screen component={Home} name="home"/>
          </stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
  
}
