import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { currentChatAtom } from "../../atom/currentChatAtom";
import { isDarkModeAtom } from "../../atom/isDarkModeAtom";
import { lightStyles, darkStyles } from "./styles";
import { useRoute } from "@react-navigation/core";
import ChatScreenBody from "../../components/ChatScreenBody";
import { GroupChatType } from "../../types";
import ChatScreenNavigator from "../../components/ChatScreenNavigator";
import ChatScreenHeader from "../../components/ChatScreenHeader";
import GroupSettingsModal from "../../modals/group-settings-modal";

const GroupChat = () => {
  const isDarkMode = useRecoilValue<boolean>(isDarkModeAtom);
  const [currentChat, setCurrentChat] = useState<GroupChatType | null>(null);
  const [isGroupSettingsModalActive, setIsGroupSettingsModalActive] =
    useState<boolean>(false);
  const [currentSelectedChat, setCurrentSelectedChat] = useRecoilState<
    string | null
  >(currentChatAtom);

  const router = useRoute<any>();
  const { chat } = router.params;

  useEffect(() => {
    if (!chat) return;

    setCurrentChat(chat);
    setCurrentSelectedChat(chat._id);
  }, [chat]);

  return (
    <View
      style={
        isDarkMode ? darkStyles.AndroidSafeArea : lightStyles.AndroidSafeArea
      }
    >
      {currentChat && (
        <>
          <ChatScreenNavigator
            type="group-chat-screen"
            isModalVisible={isGroupSettingsModalActive}
            setIsModalVisible={setIsGroupSettingsModalActive}
            chatId={currentChat._id ?? ""}
          />

          <ChatScreenHeader
            type="group-chat"
            name={currentChat.chatName}
            image={currentChat.groupImage}
          />

          {chat && <ChatScreenBody type="group" chatId={currentChat._id} />}

          <GroupSettingsModal
            isModalVisible={isGroupSettingsModalActive}
            setModalVisible={setIsGroupSettingsModalActive}
            groupChat={currentChat}
            setGroupChat={setCurrentChat}
          />
        </>
      )}
    </View>
  );
};

export default GroupChat;
