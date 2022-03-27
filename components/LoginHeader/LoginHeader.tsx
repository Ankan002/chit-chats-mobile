import { View, Text } from 'react-native';
import React from 'react';
import {Manrope_400Regular, useFonts} from '@expo-google-fonts/manrope'
import { useRecoilValue } from 'recoil';
import { isDarkModeAtom } from '../../atom/isDarkModeAtom';
import { lightStyles, darkStyles } from './styles';

const LoginHeader = () => {
  
  const [fontsLoaded] = useFonts({Manrope_400Regular});
  const isDarkMode = useRecoilValue(isDarkModeAtom);

  return (
    <View style={(isDarkMode) ? darkStyles.HeaderContainer : lightStyles.HeaderContainer}>
      {
          (fontsLoaded) && (
            <Text style={(isDarkMode) ? darkStyles.HeaderText : lightStyles.HeaderText}>
                CHIT CHATS
            </Text>
          )
      }
    </View>
  );
};

export default LoginHeader;