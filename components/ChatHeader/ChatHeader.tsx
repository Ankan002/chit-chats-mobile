import { View, Text } from "react-native";
import React from "react";
import { darkStyles, lightStyles } from "./styles";
import {
  useFonts,
  Manrope_700Bold,
  Manrope_500Medium,
} from "@expo-google-fonts/manrope";

interface Props {
  isDarkMode: boolean;
}

const ChatHeader = (props: Props) => {
  const { isDarkMode } = props;

  const [fontsLoaded] = useFonts({
    Manrope_700Bold,
    Manrope_500Medium,
  });

  return (
    <View style={isDarkMode ? darkStyles.Header : lightStyles.Header}>
      <View
        style={
          isDarkMode ? darkStyles.GreetingSection : lightStyles.GreetingSection
        }
      >
        <Text style={isDarkMode ? darkStyles.Emoji : lightStyles.Emoji}>
          😊
        </Text>
        {fontsLoaded && (
          <>
            <Text
              style={isDarkMode ? darkStyles.BoldText : lightStyles.BoldText}
            >
              {" "}
              Be
            </Text>
            <Text
              style={
                isDarkMode ? darkStyles.NormalText : lightStyles.NormalText
              }
            >
              {" "}
              happy
            </Text>
          </>
        )}
      </View>
    </View>
  );
};

export default ChatHeader;
