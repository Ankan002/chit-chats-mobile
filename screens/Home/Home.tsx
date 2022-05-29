import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import { lightStyles, darkStyles } from "./styles";
import { useRecoilValue } from "recoil";
import { isDarkModeAtom } from "../../atom";
import { StatusBar } from "expo-status-bar";
import ChatHeader from "../../components/ChatHeader";
import ChatsSection from "../../components/ChatsSection";

const Home = () => {
  const isDarkMode = useRecoilValue<boolean>(isDarkModeAtom);

  return (
    <SafeAreaView
      style={
        isDarkMode ? darkStyles.AndroidSafeArea : lightStyles.AndroidSafeArea
      }
    >
      <StatusBar style={ isDarkMode ? "light" : "dark" } />
      <ChatHeader isDarkMode={isDarkMode} chatType="personal" />
      <View
        style={isDarkMode ? darkStyles.MainBody : lightStyles.MainBody}
      >
        <ChatsSection type="single-chat" />
      </View>
    </SafeAreaView>
  );
};

export default Home;
