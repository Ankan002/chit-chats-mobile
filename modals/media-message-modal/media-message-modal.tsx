import { View, Text, Modal } from "react-native";
import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { toastMessage } from "../../helpers/toast-message";
import { isDarkModeAtom } from "../../atom/isDarkModeAtom";
import { FetchedMessageType } from "../../types";
import AsyncModalNavigationHeader from "../../components/AsyncModalNavigationHeader";
import Toast from "react-native-toast-message";
import MediaMessageModalBody from "../../components/MediaMessageModalBody";
import { lightStyles, darkStyles } from "./styles";

interface Props {
  chatId: string;
  type: "group" | "single";
  messages: Array<FetchedMessageType>;
  setMessages: Function;
  isMediaMessageModalVisible: boolean;
  setIsMediaMessageModalVisible: Function;
}

const MediaMessageModal = (props: Props) => {
  const {
    chatId,
    type,
    messages,
    setMessages,
    isMediaMessageModalVisible,
    setIsMediaMessageModalVisible,
  } = props;

  const isDarkMode = useRecoilValue<boolean>(isDarkModeAtom);
  const [isSendingMediaMessage, setIsSendingMediaMessage] =
    useState<boolean>(false);

  const onModalCloseRequest = () => {
    if (isSendingMediaMessage) {
      toastMessage("error", "Wait...", "We are sending the message hold on...");
      return;
    }

    setIsMediaMessageModalVisible(false);
  };

  return (
    <Modal
      visible={isMediaMessageModalVisible}
      animationType="slide"
      transparent={false}
      onRequestClose={onModalCloseRequest}
    >
      <View
        style={
          isDarkMode ? darkStyles.ModalContainer : lightStyles.ModalContainer
        }
      >
        <AsyncModalNavigationHeader
          isModalActive={isMediaMessageModalVisible}
          setIsModalActive={setIsMediaMessageModalVisible}
          isUpdating={isSendingMediaMessage}
          updateStatement="We are sending the message hold on..."
        />

        <MediaMessageModalBody
          chatId={chatId}
          type={type}
          messages={messages}
          setMessages={setMessages}
          setIsMediaMessageModalVisible={setIsMediaMessageModalVisible}
          isSendingMediaMessage={isSendingMediaMessage}
          setIsSendingMediaMessage={setIsSendingMediaMessage}
        />
      </View>
      <Toast />
    </Modal>
  );
};

export default MediaMessageModal;
