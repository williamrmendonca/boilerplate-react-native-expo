import React from 'react';
import { useFonts } from 'expo-font';
import { Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';
import { ThemeProvider } from 'styled-components';
import AppLoading from 'expo-app-loading';

import { CartProvider } from './src/hooks/cart';

import theme from './src/styles/theme';

import { Routes } from './src/routes';

export default function App() {

  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold
  })

  if (!fontsLoaded) {
    return <AppLoading />
  }

  return (
    <ThemeProvider theme={theme}>
      <CartProvider>
        <Routes />
      </CartProvider>
    </ThemeProvider>
  );
}