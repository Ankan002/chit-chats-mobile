import { View, Text, Image } from 'react-native';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { isDarkModeAtom } from '../../atom/isDarkModeAtom';
import { lightStyles, darkStyles } from './styles';
import { Manrope_400Regular, Manrope_500Medium, useFonts } from '@expo-google-fonts/manrope';

const loginImage = require('../../assets/images/login.png')

const LoginBody = () => {

  const isDarkMode = useRecoilValue<Boolean>(isDarkModeAtom);
  const [fontsLoaded] = useFonts({
      Manrope_500Medium,
      Manrope_400Regular
  })

  return (
    <View style={(isDarkMode) ? darkStyles.BodyContainer : lightStyles.BodyContainer}>
      <Image
       source={loginImage}
       style={(isDarkMode) ? darkStyles.LoginImage : lightStyles.LoginImage} 
      />
      {
          (fontsLoaded) && (
              <View style={(isDarkMode) ? darkStyles.TextContainer : lightStyles.TextContainer}>

                <Text style={(isDarkMode) ? darkStyles.TagLine : lightStyles.TagLine}>
                    Make Friends
                </Text>

                <Text style={(isDarkMode) ? darkStyles.TagDescription : lightStyles.TagDescription}>
                    A great way to find new friends as well as connect with old friends
                </Text>
              </View>
          )
      }
      
    </View>
  );
};

export default LoginBody;