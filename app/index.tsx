import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import IntroScreens from './entrada';
import Home from './home'; 
import Login from './login';
import Signup from './cad';

type RootStackParamList = {
  IntroScreens: undefined;
  Login: undefined;
  Signup: undefined;
  Home: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  const [initialRoute, setInitialRoute] = useState<keyof RootStackParamList | null>(null);

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      try {
        const hasSeenOnboarding = await AsyncStorage.getItem('hasSeenOnboarding');
        if (hasSeenOnboarding) {
          setInitialRoute('Login'); // Rota válida do RootStackParamList
        } else {
          setInitialRoute('IntroScreens'); // Rota válida do RootStackParamList
        }
      } catch (error) {
        console.error('Erro ao verificar status do onboarding:', error);
        setInitialRoute('Login'); // Padrão caso ocorra um erro
      }
    };

    checkOnboardingStatus();
  }, []);

  if (!initialRoute) {
    return null; // Aguarda até que o estado seja definido
  }

  return (
    <Stack.Navigator initialRouteName={initialRoute} screenOptions={{ headerShown: false }}>
      <Stack.Screen name="IntroScreens" component={IntroScreens} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Signup" component={Signup} />
    </Stack.Navigator>
  );
};

export default App;
