import { View, Text } from 'react-native';
import React, {useEffect, useState} from 'react';
import { useRecoilValue } from "recoil";
import { isDarkModeAtom } from "../../atom/isDarkModeAtom";
import { lightStyles, darkStyles } from './styles';
import { useRoute } from '@react-navigation/core';
import { GroupChatType } from '../../types';
import ChatScreenNavigator from "../../components/ChatScreenNavigator";
import ChatScreenHeader from '../../components/ChatScreenHeader';
import GroupSettingsModal from '../../modals/group-settings-modal';

const GroupChat = () => {

  const isDarkMode = useRecoilValue<boolean>(isDarkModeAtom);
  const [currentChat, setCurrentChat] = useState<GroupChatType | null>(null);
  const [isGroupSettingsModalActive, setIsGroupSettingsModalActive] = useState<boolean>(false);

  const router = useRoute<any>();
  const {chat} = router.params;

  useEffect(() => {
    if(!chat) return;

    setCurrentChat(chat);
    console.log(chat);
  }, [chat])

  return (
    <View style={isDarkMode ? darkStyles.AndroidSafeArea : lightStyles.AndroidSafeArea}>
      {
        currentChat && (
          <>
            <ChatScreenNavigator type="group-chat-screen" isModalVisible={isGroupSettingsModalActive} setIsModalVisible={setIsGroupSettingsModalActive} />
            <ChatScreenHeader type="group-chat" name={currentChat.chatName} image={currentChat.groupImage} />
            <GroupSettingsModal isModalVisible={isGroupSettingsModalActive} setModalVisible={setIsGroupSettingsModalActive} groupChat={currentChat} setGroupChat={setCurrentChat} />
          </>
        )
      }
      
    </View>
  );
};

export default GroupChat;