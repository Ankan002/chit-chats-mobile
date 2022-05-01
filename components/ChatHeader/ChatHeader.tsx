import { View, Text, Pressable } from "react-native";
import React from "react";
import { darkStyles, lightStyles } from "./styles";
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/core";
import {
  useFonts,
  Manrope_700Bold,
  Manrope_500Medium,
} from "@expo-google-fonts/manrope";

interface Props {
  isDarkMode: boolean;
  chatType: "personal" | "group";
}

const ChatHeader = (props: Props) => {
  const { isDarkMode, chatType } = props;
  const navigation = useNavigation();

  const [fontsLoaded] = useFonts({
    Manrope_700Bold,
    Manrope_500Medium,
  });

  const onNavigateClick = () => {
    if(chatType === "personal") navigation.navigate("UserSearch");
    if(chatType === "group") navigation.navigate("CreateGroup");
  }

  return (
    <View style={isDarkMode ? darkStyles.Header : lightStyles.Header}>
      <View
        style={
          isDarkMode ? darkStyles.GreetingSection : lightStyles.GreetingSection
        }
      >
        {fontsLoaded && (
          <>
            <Text
              style={
                isDarkMode ? darkStyles.NormalText : lightStyles.NormalText
              }
            >
              {(chatType === "personal") ? "Personal" : "Group"}
            </Text>
          </>
        )}
      </View>
      <Pressable onPress={onNavigateClick}>
        {
          (chatType === "personal") ? (
            <MaterialIcons name="person-search" size={30} color={isDarkMode ? "#FAFAFC" : "#131517"} />
          ) : (
            <MaterialIcons name="group-add" size={35} color={isDarkMode ? "#FAFAFC" : "#131517"} />
          )
        }
      </Pressable>
    </View>
  );
};

export default ChatHeader;
