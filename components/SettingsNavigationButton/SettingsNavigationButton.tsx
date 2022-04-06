import { View, Text, Pressable } from 'react-native';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { isDarkModeAtom } from '../../atom';
import { darkStyles, lightStyles } from "./styles";
import { useFonts, Manrope_500Medium } from "@expo-google-fonts/manrope"
import { Entypo } from '@expo/vector-icons'; 
import { userAtom } from "../../atom/userAtom";
import type { UserType } from "../../types";
import { useNavigation } from "@react-navigation/core"; 

interface Props{
    name: string;
    screenName: "Profile";
}

const SettingsNavigationButton = (props: Props) => {
  const { name, screenName } = props;
  const [fontsLoaded] = useFonts({Manrope_500Medium});

  const isDarkMode = useRecoilValue<boolean>(isDarkModeAtom);
  const user = useRecoilValue<UserType>(userAtom);
  const navigation = useNavigation<any>();

  const onSettingClick = () => {
    if(screenName === "Profile") navigation.navigate(screenName, {userId: user._id});
  };

  return (
    <View style={isDarkMode ? darkStyles.Container : lightStyles.Container}>
        {
            (fontsLoaded) && (
                <Text style={isDarkMode ? darkStyles.SettingName : lightStyles.SettingName}>
                    {name}
                </Text>
            )
        }

        <Pressable onPress={onSettingClick}>
            <Entypo name="chevron-right" size={24} color="#FD6337" />
        </Pressable>
    </View>
  );
};

export default SettingsNavigationButton;