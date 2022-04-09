import { View, Text, Button } from "react-native";
import React from "react";
import { lightStyles, darkStyles } from "./styles";
import { useRecoilValue } from "recoil";
import { isDarkModeAtom } from "../../atom";
import Toggler from "../Toggler";
import SettingsNavigationButton from "../SettingsNavigationButton";

const SettingsBody = () => {
  const isDarkMode = useRecoilValue<boolean>(isDarkModeAtom);
  return (
    <View
      style={isDarkMode ? darkStyles.BodyContainer : lightStyles.BodyContainer}
    >
      <Toggler type="Theme" />
      <SettingsNavigationButton name="My Profile" screenName="Profile" />
      <SettingsNavigationButton name="Change Username" screenName="UpdateUsername" />
      <SettingsNavigationButton name="Change Tagline" screenName="UpdateTagline" />
    </View>
  );
};

export default SettingsBody;
