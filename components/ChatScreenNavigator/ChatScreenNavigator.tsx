import { View, Text, Pressable } from "react-native";
import React from "react";
import { useRecoilValue } from "recoil";
import { Entypo, Ionicons, Feather } from "@expo/vector-icons";
import { isDarkModeAtom } from "../../atom/isDarkModeAtom";
import { lightStyles, darkStyles } from "./styles";
import { useNavigation } from "@react-navigation/core";

interface Props {
  type: "group-chat-screen" | "single-chat-screen";
  setIsModalVisible: Function;
  isModalVisible: boolean
}

const ChatScreenNavigator = (props: Props) => {
  const { type, setIsModalVisible, isModalVisible } = props;

  const isDarkMode = useRecoilValue<boolean>(isDarkModeAtom);

  const navigation = useNavigation();

  const onBackButtonClick = () => {
    if (navigation.canGoBack()) navigation.goBack();
  };

  const onNavigationButtonClick = () => {
    setIsModalVisible(!isModalVisible);
  }

  return (
    <View style={isDarkMode ? darkStyles.Container : lightStyles.Container}>
      <Pressable
        style={isDarkMode ? darkStyles.BackButton : lightStyles.BackButton}
        onPress={onBackButtonClick}
      >
        <Entypo
          name="chevron-left"
          size={24}
          color={isDarkMode ? "#FDFEFF" : "#171725"}
        />
      </Pressable>

      {type === "group-chat-screen" ? (
        <Pressable
          style={isDarkMode ? darkStyles.NavigationButton : lightStyles.NavigationButton}
          onPress={onNavigationButtonClick}
        >
          <Feather
            name="settings"
            size={30}
            color={isDarkMode ? "#FDFEFF" : "#171725"}
          />
        </Pressable>
      ) : (
        <Pressable
          style={isDarkMode ? darkStyles.NavigationButton : lightStyles.NavigationButton}
          onPress={onNavigationButtonClick}
        >
          <Ionicons
            name="information-circle-outline"
            size={35}
            color={isDarkMode ? "#FDFEFF" : "#171725"}
          />
        </Pressable>
      )}
    </View>
  );
};

export default ChatScreenNavigator;
