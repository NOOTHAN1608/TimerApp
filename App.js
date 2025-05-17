// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TimerListScreen from './screens/TimerListScreen';
import AddTimerScreen from './screens/AddTimerScreen';
import HistoryScreen from './screens/HistoryScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Timers">
        <Stack.Screen name="Timers" component={TimerListScreen} />
        <Stack.Screen name="Add Timer" component={AddTimerScreen} />
        <Stack.Screen name="History" component={HistoryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
