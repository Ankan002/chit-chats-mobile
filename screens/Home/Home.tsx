import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import { lightStyles, darkStyles } from "./styles";
import { useRecoilValue } from "recoil";
import { isDarkModeAtom } from "../../atom";
import { StatusBar } from "expo-status-bar";
import ChatHeader from "../../components/ChatHeader";

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
    </SafeAreaView>
  );
};

export default Home;
