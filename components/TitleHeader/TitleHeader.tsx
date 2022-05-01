import { View, Text } from "react-native";
import React from "react";
import { useRecoilValue } from "recoil";
import { isDarkModeAtom } from "../../atom";
import { darkStyles, lightStyles } from "./styles";
import { useFonts, Manrope_600SemiBold } from "@expo-google-fonts/manrope";

interface Props{
    title: string;
}

const TitleHeader = (props: Props) => {
  const {title} = props;
  const isDarkMode = useRecoilValue<boolean>(isDarkModeAtom);
  const [fontsLoaded] = useFonts({ Manrope_600SemiBold });

  return (
    <View style={isDarkMode ? darkStyles.Container : lightStyles.Container}>
      {fontsLoaded && (
        <Text
          style={isDarkMode ? darkStyles.HeadingText : lightStyles.HeadingText}
        >
          {title}
        </Text>
      )}
    </View>
  );
};

export default TitleHeader;
