import { View, Text } from 'react-native';
import React from 'react';
import { darkStyles, lightStyles } from "./styles";

interface Props{
    isDarkMode: boolean;
    image: string;
    name: string;
    username: string;
};

const SettingsHeader = (props: Props) => {
  const {isDarkMode, image, name, username} = props;
  return (
    <View style={isDarkMode ? darkStyles.HeaderContainer : lightStyles.HeaderContainer}>
      <Text>SettingsHeader</Text>
    </View>
  );
};

export default SettingsHeader;