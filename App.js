
// import React from 'react';
// import { SafeAreaProvider } from 'react-native-safe-area-context';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import WeatherScreen from './src/WeatherScreen';
// import WeatherByCountryScreen from './src/WeatherByCountryScreen';

// const Stack = createStackNavigator();

// export default function App() {
//   return (
//     <SafeAreaProvider>
//       <NavigationContainer>
//         <Stack.Navigator initialRouteName="WeatherScreen">
//           <Stack.Screen name="WeatherScreen" component={WeatherScreen} options={{ title: 'Weather' }} />
//           <Stack.Screen name="WeatherByCountryScreen" component={WeatherByCountryScreen} options={{ title: 'Weather by Country' }} />
//         </Stack.Navigator>
//       </NavigationContainer>
//     </SafeAreaProvider>
//   );
// }
import * as React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';


import WeatherScreen from './src/WeatherScreen';
import WeatherCountryScreen from './src/WeatherCountryScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="City Weather" component={WeatherScreen} />
          <Stack.Screen name="Country Weather" component={WeatherCountryScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
