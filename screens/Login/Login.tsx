import { View, Text, Button } from 'react-native';
import React from 'react';
import {lightStyles, darkStyles} from './styles';
import { useRecoilValue } from 'recoil';
import { isDarkModeAtom } from '../../atom/isDarkModeAtom';
import {StatusBar} from 'expo-status-bar';
import LoginHeader from '../../components/LoginHeader';
import LoginBody from '../../components/LoginBody';
import LoginSection from '../../components/LoginSection';

const Login = () => {

  const isDarkMode = useRecoilValue<boolean>(isDarkModeAtom);

  return (
    <View style={isDarkMode ? darkStyles.AndroidSafeArea : lightStyles.AndroidSafeArea}>
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />
      <LoginHeader />
      <LoginBody />
      <View style={isDarkMode ? darkStyles.LoginSectionContainer : lightStyles.LoginSectionContainer}>
        <LoginSection />
      </View>
    </View>
  );
};

export default Login;