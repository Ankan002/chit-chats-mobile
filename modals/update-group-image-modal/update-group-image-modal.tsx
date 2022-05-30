import { View, Text, Modal } from "react-native";
import React, { useState } from "react";
import { lightStyles, darkStyles } from "./styles";
import { useRecoilValue } from "recoil";
import { isDarkModeAtom } from "../../atom";
import { GroupChatType } from "../../types";
import { toastMessage } from "../../helpers/toast-message/toast-message";
import AsyncModalNavigationHeader from "../../components/AsyncModalNavigationHeader/AsyncModalNavigationHeader";
import Toast from "react-native-toast-message";
import TitleHeader from "../../components/TitleHeader";
import GroupImageUpdateForm from '../../components/GroupImageUpdateForm/GroupImageUpdateForm';

interface Props {
  isModalVisible: boolean;
  setIsModalVisible: Function;
  groupChat: GroupChatType;
  setGroupChat: Function;
}

const UpdateGroupImageModal = (props: Props) => {
  const { isModalVisible, setIsModalVisible, groupChat, setGroupChat } = props;

  const isDarkMode = useRecoilValue<boolean>(isDarkModeAtom);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  const onModalCloseRequested = () => {
    if (isUpdating) {
      toastMessage(
        "error",
        "Hold on...",
        "Group Image is being updated hold on...."
      );

      return;
    }

    setIsModalVisible(!isModalVisible);
  };

  return (
    <Modal
      visible={isModalVisible}
      onRequestClose={onModalCloseRequested}
      animationType="slide"
      transparent={false}
    >
      <View
        style={
          isDarkMode ? darkStyles.ModalContainer : lightStyles.ModalContainer
        }
      >
        <AsyncModalNavigationHeader
          isUpdating={isUpdating}
          isModalActive={isModalVisible}
          setIsModalActive={setIsModalVisible}
          updateStatement="Group Image is being updated hold on...."
        />

        <TitleHeader title="Update Group Image" />

        <GroupImageUpdateForm isUpdating={isUpdating} setIsUpdating={setIsUpdating}
        currentGroupChat={groupChat} setCurrentGroupChat={setGroupChat} isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} />
      </View>
      <Toast />
    </Modal>
  );
};

export default UpdateGroupImageModal;
