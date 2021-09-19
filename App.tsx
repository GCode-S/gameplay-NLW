import React from 'react';
import { StatusBar, LogBox } from 'react-native';
import { useFonts } from 'expo-font';
import { Rajdhani_500Medium, Rajdhani_700Bold } from '@expo-google-fonts/rajdhani';
import { Inter_400Regular, Inter_500Medium } from '@expo-google-fonts/inter';
import AppLoading from 'expo-app-loading';

LogBox.ignoreLogs(['You are not currently signed in to Expo on your development machine.'])

import { Routes } from './src/routes';

import { AuthProvider } from './src/hooks/auth';

import { Background } from './src/components/background';

export default function App(){

 const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Rajdhani_500Medium,
    Rajdhani_700Bold
  });

  if(!fontsLoaded){
    return <AppLoading />
  }

  return(
    <Background>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </Background>
  ); 
}