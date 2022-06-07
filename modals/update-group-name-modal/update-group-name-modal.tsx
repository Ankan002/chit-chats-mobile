import { View, Text, Modal } from "react-native";
import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { lightStyles, darkStyles } from "../group-settings-modal/styles";
import { isDarkModeAtom } from "../../atom/isDarkModeAtom";
import { toastMessage } from "../../helpers/toast-message";
import AsyncModalNavigationHeader from "../../components/AsyncModalNavigationHeader";
import TitleHeader from "../../components/TitleHeader";
import Toast from "react-native-toast-message";
import GroupNameUpdateForm from "../../components/GroupNameUpdateForm";
import { GroupChatType } from "../../types";
import { toastConfig } from "../../config";

interface Props {
  isModalVisible: boolean;
  setIsModalVisible: Function;
  currentName: string;
  groupChat: GroupChatType;
  setGroupChat: Function;
}

const UpdateGroupNameModal = (props: Props) => {
  const {
    isModalVisible,
    setIsModalVisible,
    currentName,
    groupChat,
    setGroupChat,
  } = props;

  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const isDarkMode = useRecoilValue<boolean>(isDarkModeAtom);

  const onModalCloseRequest = () => {
    if (isUpdating) {
      toastMessage(
        "error",
        "Updating...",
        "Group Name is being updated... hold on..."
      );
      return;
    }

    setIsModalVisible(false);
  };

  return (
    <Modal
      visible={isModalVisible}
      onRequestClose={onModalCloseRequest}
      animationType="slide"
      transparent={false}
    >
      <View
        style={
          isDarkMode ? darkStyles.ModalContainer : lightStyles.ModalContainer
        }
      >
        <AsyncModalNavigationHeader
          isModalActive={isModalVisible}
          setIsModalActive={setIsModalVisible}
          isUpdating={isUpdating}
          updateStatement="Hold on... we are updating the group name"
        />
        <TitleHeader title="Update Group Name" />
        <GroupNameUpdateForm
          previousName={currentName}
          isUpdating={isUpdating}
          setIsUpdating={setIsUpdating}
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          currentGroupChat={groupChat}
          setCurrentGroupChat={setGroupChat}
        />
      </View>
      <Toast config={toastConfig} />
    </Modal>
  );
};

export default UpdateGroupNameModal;
