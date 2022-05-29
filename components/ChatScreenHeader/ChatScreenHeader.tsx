import { View, Text, Image } from "react-native";
import React from "react";
import { darkStyles, lightStyles } from "./styles";
import { useFonts, Manrope_600SemiBold } from "@expo-google-fonts/manrope";
import { useRecoilValue } from "recoil";
import { isDarkModeAtom } from "../../atom";
import {
  FiraCode_500Medium,
  FiraCode_400Regular,
} from "@expo-google-fonts/fira-code";

type Props =
  | {
      type: "group-chat";
      image: string;
      name: string;
    }
  | {
      type: "single-chat";
      image: string;
      name: string;
      username: string;
    };

const ChatScreenHeader = (props: Props) => {
  const { type } = props;
  const isDarkMode = useRecoilValue<boolean>(isDarkModeAtom);
  const [fontsLoaded] = useFonts({
    Manrope_600SemiBold,
    FiraCode_500Medium,
    FiraCode_400Regular,
  });

  return (
    <View
      style={
        isDarkMode ? darkStyles.HeaderContainer : lightStyles.HeaderContainer
      }
    >
      <View
        style={
          isDarkMode
            ? darkStyles.ChatImageContainer
            : lightStyles.ChatImageContainer
        }
      >
        <Image
          source={{ uri: props.image }}
          style={
            isDarkMode
              ? darkStyles.ChatImageStyles
              : lightStyles.ChatImageStyles
          }
        />
      </View>

      {fontsLoaded && (
        <Text style={isDarkMode ? darkStyles.ChatName : lightStyles.ChatName}>
          {props.name}
        </Text>
      )}

      {fontsLoaded && type === "single-chat" && (
        <Text
          style={
            isDarkMode ? darkStyles.ChatUsername : lightStyles.ChatUsername
          }
        >
          {props.username}
        </Text>
      )}
    </View>
  );
};

export default ChatScreenHeader;
