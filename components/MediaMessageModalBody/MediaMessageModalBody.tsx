import { View, Text, Image, Pressable, TextInput } from 'react-native'
import React, {useState} from 'react'
import { useRecoilState, useRecoilValue } from "recoil";
import { toastMessage } from "../../helpers/toast-message";
import { isDarkModeAtom } from "../../atom/isDarkModeAtom";
import { FetchedMessageType, GroupChatType, SingleChatType } from "../../types";
import { FontAwesome, Feather } from "@expo/vector-icons";
import {
  useFonts,
  Manrope_600SemiBold,
  Manrope_400Regular,
} from "@expo-google-fonts/manrope";
import { sendMediaMessage, updateGroupChatsOnMessageSent, updateSingleChatsOnMessageSend } from '../../helpers/send-message';
import { currentChatAtom } from '../../atom/currentChatAtom';
import { useNavigation } from '@react-navigation/core';
import DocumentPicker, {
  DocumentPickerResponse,
} from "react-native-document-picker";
import { lightStyles, darkStyles } from "./styles";
import { groupChatsAtom } from '../../atom/groupChatsAtom';
import { singleChatsAtom } from '../../atom/singleChatsAtom';
import { Socket } from 'socket.io-client';

interface Props{
  chatId: string;
  type: "group" | "single";
  messages: Array<FetchedMessageType>;
  setMessages: Function;
  setIsMediaMessageModalVisible: Function;
  isSendingMediaMessage: boolean;
  setIsSendingMediaMessage: Function;
  socket: Socket | null;
}

const MediaMessageModalBody = (props: Props) => {

  const {chatId, type, messages, setMessages, setIsMediaMessageModalVisible, setIsSendingMediaMessage, isSendingMediaMessage, socket} = props;

  const [fontsLoaded] = useFonts({
    Manrope_600SemiBold,
    Manrope_400Regular,
  });

  const isDarkMode = useRecoilValue<boolean>(isDarkModeAtom);
  const [selectedMedia, setSelectedMedia] =
    useState<DocumentPickerResponse | null>(null);
  const [newMessageContent, setNewMessageContent] = useState<string>("");
  const [groupChats, setGroupChats] = useRecoilState<Array<GroupChatType>>(groupChatsAtom);
  const [singleChats, setSingleChats] = useRecoilState<Array<SingleChatType>>(singleChatsAtom);
  const [currentSelectedChat, setCurrentSelectedChat] = useRecoilState<string | null>(currentChatAtom);
  const navigation = useNavigation();

  const onImageSelect = async () => {
    try {
      const file = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.images],
      });

      setSelectedMedia(file);
    } catch (error) {
      if (DocumentPicker.isCancel(error)) return;
      toastMessage("error", "Fatal Error", `${error}`);
      return;
    }
  };

  const onRemoveImageClick = () => {
    setSelectedMedia(null);
  };

  const onSendMessageClick = async () => {

      const response = await sendMediaMessage(isSendingMediaMessage, setIsSendingMediaMessage, selectedMedia, newMessageContent, chatId);

      if (!response.success && response.notGroupMember === true) {
        const updatedGroups = groupChats.filter(
          (groupChat) => groupChat._id !== chatId
        );
        setGroupChats(updatedGroups);
        setCurrentSelectedChat(null);
        toastMessage(
          "error",
          "Oh.. no..",
          "Your friend just kicked you of the group"
        );
        navigation.goBack();
        return;
      }
  
      if (!response.success) {
        toastMessage("error", "Fatal Error", `${response.error}`);
        return;
      }

      if (type === "group") {
        updateGroupChatsOnMessageSent(
          response.message,
          chatId,
          groupChats,
          setGroupChats
        );
      } else {
        updateSingleChatsOnMessageSend(
          response.message,
          chatId,
          singleChats,
          setSingleChats
        );
      }

      setMessages([
        {
          ...response.message,
          chat: response.message.chat._id,
        },
        ...messages,
      ]);

      socket?.emit("new-message", response.message);

      setNewMessageContent("");
      setSelectedMedia(null);
      setIsMediaMessageModalVisible(false);
  };

  return (
    <View
          style={
            isDarkMode ? darkStyles.FormContainer : lightStyles.FormContainer
          }
        >
          {selectedMedia ? (
            <Pressable
              style={
                isDarkMode
                  ? darkStyles.MediaContainer
                  : lightStyles.MediaContainer
              }
              onPress={onImageSelect}
            >
              <Image
                source={{ uri: selectedMedia.uri }}
                style={isDarkMode ? darkStyles.Media : lightStyles.Media}
              />
            </Pressable>
          ) : (
            <Pressable
              style={
                isDarkMode
                  ? darkStyles.EmptyMediaContainer
                  : lightStyles.EmptyMediaContainer
              }
              onPress={onImageSelect}
            >
              <FontAwesome
                name="image"
                size={90}
                color={isDarkMode ? "#F6F8FA" : "#0A0911"}
              />
              {fontsLoaded && (
                <Text
                  style={
                    isDarkMode
                      ? darkStyles.EmptyMediaContainerText
                      : lightStyles.EmptyMediaContainerText
                  }
                >
                  Select An Image
                </Text>
              )}
            </Pressable>
          )}
          {selectedMedia && (
            <View
              style={
                isDarkMode
                  ? darkStyles.DeleteButtonContainer
                  : lightStyles.DeleteButtonContainer
              }
            >
              <Pressable
                style={
                  isDarkMode
                    ? darkStyles.DeleteButton
                    : lightStyles.DeleteButton
                }
                onPress={onRemoveImageClick}
              >
                <Feather name="trash-2" size={26} color="#FD6438" />
              </Pressable>
            </View>
          )}

          <View
            style={
              isDarkMode
                ? darkStyles.SendMessageContainer
                : lightStyles.SendMessageContainer
            }
          >
            <View
              style={
                isDarkMode
                  ? darkStyles.SendMessageSection
                  : lightStyles.SendMessageSection
              }
            >
              {fontsLoaded && (
                <View
                  style={
                    isDarkMode
                      ? darkStyles.SendMessageInputView
                      : lightStyles.SendMessageInputView
                  }
                >
                  <TextInput
                    multiline={true}
                    style={
                      isDarkMode
                        ? darkStyles.SendMessageInput
                        : lightStyles.SendMessageInput
                    }
                    value={newMessageContent}
                    onChangeText={setNewMessageContent}
                    placeholder="Message"
                    placeholderTextColor="#7E7D80"
                  />
                </View>
              )}

              <Pressable
                style={[
                  isDarkMode
                    ? darkStyles.SendMessageButton
                    : lightStyles.SendMessageButton,
                  {
                    backgroundColor: `${
                      isSendingMediaMessage
                        ? `${isDarkMode ? "#08070C" : "#FFFFFF"}`
                        : "#FD6438"
                    }`,
                    borderColor: `${
                      isSendingMediaMessage
                        ? `${isDarkMode ? "#F6F8FA" : "#0A0911"}`
                        : "transparent"
                    }`,
                    borderWidth: parseInt(
                      `${isSendingMediaMessage ? "1" : "0"}`
                    ),
                  },
                ]}
                onPress={onSendMessageClick}
              >
                <Feather
                  name="send"
                  size={24}
                  color={`${
                    isSendingMediaMessage
                      ? `${isDarkMode ? "#F6F8FA" : "#0A0911"}`
                      : `${isDarkMode ? "#0A0911" : "#F6F8FA"}`
                  }`}
                />
              </Pressable>
            </View>
          </View>
        </View>
  )
}

export default MediaMessageModalBody