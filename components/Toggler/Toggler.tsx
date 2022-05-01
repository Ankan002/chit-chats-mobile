import { View, Text, Switch } from "react-native";
import React from "react";
import { useRecoilState } from "recoil";
import { isDarkModeAtom } from "../../atom";
import { darkStyles, lightStyles } from "./styles";
import { changeTheme } from "../../helpers/change-theme";
import { useFonts, Manrope_500Medium } from "@expo-google-fonts/manrope";

interface Props {
  type: "Theme";
}

const Toggler = (props: Props) => {
  const { type } = props;
  const [isDarkMode, setIsDarkMode] = useRecoilState<boolean>(isDarkModeAtom);

  const [fontsLoaded] = useFonts({ Manrope_500Medium });

  const toggler = async () => {
    if (type === "Theme") {
      await changeTheme(isDarkMode, setIsDarkMode);
    }
  };

  return (
    <View style={isDarkMode ? darkStyles.Container : lightStyles.Container}>
      {fontsLoaded && type === "Theme" && (
        <Text
          style={isDarkMode ? darkStyles.SettingName : lightStyles.SettingName}
        >
          Dark{"  "}Mode
        </Text>
      )}
      <Switch
        trackColor={{
          false: "#eb957c",
          true: "#FD6337",
        }}
        thumbColor="#08CE94"
        value={type === "Theme" && isDarkMode}
        onChange={toggler}
      />
    </View>
  );
};

export default Toggler;
