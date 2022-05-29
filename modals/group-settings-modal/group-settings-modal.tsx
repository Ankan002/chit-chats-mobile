import { View, Text, Modal } from "react-native";
import React, { useState } from "react";
import { lightStyles, darkStyles } from "./styles";
import { useRecoilValue } from "recoil";
import { isDarkModeAtom } from "../../atom/isDarkModeAtom";
import { GroupChatType, UserType } from "../../types";
import { toastMessage } from "../../helpers/toast-message/toast-message";
import { userAtom } from "../../atom/userAtom";
import AsyncModalNavigationHeader from "../../components/AsyncModalNavigationHeader";
import Toast from "react-native-toast-message";
import GroupSettingsHeader from "../../components/GroupSettingsHeader";

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
      </View>
      <Toast />
    </Modal>
  );
};

export default GroupSettingsModal;
