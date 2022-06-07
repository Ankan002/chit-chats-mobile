import { View, Text, SafeAreaView } from "react-native";
import React, {useEffect} from "react";
import { lightStyles, darkStyles } from "./styles";
import { useRecoilState, useRecoilValue } from "recoil";
import { isDarkModeAtom } from "../../atom";
import { StatusBar } from "expo-status-bar";
import ChatHeader from "../../components/ChatHeader";
import ChatsSection from "../../components/ChatsSection";
import { currentChatAtom } from "../../atom/currentChatAtom";

const Group = () => {
  const isDarkMode = useRecoilValue<boolean>(isDarkModeAtom);
  const [currentSelectedChat, setCurrentSelectedChat] = useRecoilState<
    string | null
    >(currentChatAtom);

  useEffect(() => {
    setCurrentSelectedChat(null);
  }, []);


  return (
    <SafeAreaView
      style={
        isDarkMode ? darkStyles.AndroidSafeArea : lightStyles.AndroidSafeArea
      }
    >
      <StatusBar style={ isDarkMode ? "light" : "dark" } />
      <ChatHeader isDarkMode={isDarkMode} chatType="group" />
      <View style={isDarkMode ? darkStyles.MainBody : lightStyles.MainBody}>
        <ChatsSection type="group-chat" />
      </View>
    </SafeAreaView>
  );
};

export default Group;