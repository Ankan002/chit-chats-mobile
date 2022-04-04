import { View, Text } from "react-native";
import React from "react";
import { lightStyles, darkStyles } from "./styles";
import { useRecoilValue } from "recoil";
import { isDarkModeAtom } from "../../atom";
import Toggler from "../Toggler";

const SettingsBody = () => {
  const isDarkMode = useRecoilValue<boolean>(isDarkModeAtom);
  return (
    <View
      style={isDarkMode ? darkStyles.BodyContainer : lightStyles.BodyContainer}
    >
      <Toggler type="Theme" />
    </View>
  );
};

export default SettingsBody;
