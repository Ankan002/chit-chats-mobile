import { View, Text, Modal, FlatList } from "react-native";
import React, { useState } from "react";
import { lightStyles, darkStyles } from "./styles";
import { useRecoilValue } from "recoil";
import { isDarkModeAtom } from "../../atom/isDarkModeAtom";
import { GroupChatType, UserType } from "../../types";
import { toastMessage } from "../../helpers/toast-message/toast-message";
import { userAtom } from "../../atom/userAtom";
import AsyncModalNavigationHeader from "../../components/AsyncModalNavigationHeader";
import GroupSettingsBody from "../../components/GroupSettingsBody";
import Toast from "react-native-toast-message";
import GroupSettingsHeader from "../../components/GroupSettingsHeader";
import LeaveGroupSection from "../../components/LeaveGroupSection";
import { toastConfig } from "../../config";

interface Props {
  isModalVisible: boolean;
  setModalVisible: Function;
  groupChat: GroupChatType;
  setGroupChat: Function;
}

const GroupSettingsModal = (props: Props) => {
  const { isModalVisible, setModalVisible, groupChat, setGroupChat } = props;

  const isDarkMode = useRecoilValue<boolean>(isDarkModeAtom);
  const [isRemovingUser, setIsRemovingUser] = useState<boolean>(false);
  const loggedInUser = useRecoilValue<UserType>(userAtom);
  const [isLeavingGroup, setIsLeavingGroup] = useState<boolean>(false);

  const onRequestModalClose = () => {
    if (isRemovingUser) {
      toastMessage(
        "error",
        "Removing User",
        "Hold on while we remove the user from the group"
      );
      return;
    }

    setModalVisible(false);
  };

  return (
    <Modal
      visible={isModalVisible}
      onRequestClose={onRequestModalClose}
      animationType="slide"
      transparent={false}
    >
      <View
        style={
          isDarkMode ? darkStyles.ModalContainer : lightStyles.ModalContainer
        }
      >
        <AsyncModalNavigationHeader
          isUpdating={isRemovingUser}
          updateStatement="Hold on... while we remove the user..."
          isModalActive={isModalVisible}
          setIsModalActive={setModalVisible}
        />
        <GroupSettingsHeader
          image={groupChat.groupImage}
          groupName={groupChat.chatName}
          isAdmin={groupChat.groupAdmin._id === loggedInUser._id}
          groupChat={groupChat}
          setGroupChat={setGroupChat}
        />
        <GroupSettingsBody groupChat={groupChat} setGroupChat={setGroupChat} isRemovingUser={isRemovingUser} setIsRemovingUser={setIsRemovingUser} />
        <LeaveGroupSection isLeavingGroup={isLeavingGroup} setIsLeavingGroup={setIsLeavingGroup} group={groupChat} />
      </View>
      <Toast config={toastConfig} />
    </Modal>
  );
};

export default GroupSettingsModal;
