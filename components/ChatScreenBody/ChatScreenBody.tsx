import {
  View,
  Text,
  TextInput,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { isDarkModeAtom } from "../../atom";
import { lightStyles, darkStyles } from "./styles";
import { fetchInitialChats } from "../../helpers/fetch-chat-messages";
import { Feather, AntDesign } from "@expo/vector-icons";
import { useFonts, Manrope_400Regular } from "@expo-google-fonts/manrope";
import { groupChatsAtom } from "../../atom/groupChatsAtom";
import { singleChatsAtom } from "../../atom/singleChatsAtom";
import { currentChatAtom } from "../../atom/currentChatAtom";
import {
  sendMessage,
  updateGroupChatsOnMessageSent,
  updateSingleChatsOnMessageSend,
} from "../../helpers/send-message";
import ChatMessageDisplay from "../ChatMessageDisplay";
import { useNavigation } from "@react-navigation/core";
import { FetchedMessageType, GroupChatType, SingleChatType } from "../../types";
import MediaMessageModal from "../../modals/media-message-modal";
import { toastMessage } from "../../helpers/toast-message";

interface Props {
  chatId: string;
  type: "group" | "single";
}

const ChatScreenBody = (props: Props) => {
  //TODO: Try implement a native emoji picker

  const { chatId, type } = props;

  const [fontsLoaded] = useFonts({
    Manrope_400Regular,
  });

  const isDarkMode = useRecoilValue<boolean>(isDarkModeAtom);
  const [messages, setMessages] = useState<Array<FetchedMessageType>>([]);

  const [isMoreMessageAvailable, setIsMoreMessageAvailable] =
    useState<boolean>(true);
  const [nextPage, setNextPage] = useState<number>(1);
  const [isInitialLoading, setIsInitialLoading] = useState<boolean>(false);
  const [isSendingMessage, setIsSendingMessage] = useState<boolean>(false);

  const [newMessageContent, setNewMessageContent] = useState<string>("");

  const [groupChats, setGroupChats] =
    useRecoilState<Array<GroupChatType>>(groupChatsAtom);
  const [singleChats, setSingleChats] =
    useRecoilState<Array<SingleChatType>>(singleChatsAtom);
  const [currentSelectedChat, setCurrentSelectedChat] = useRecoilState<
    string | null
  >(currentChatAtom);
  const [isMediaMessageModalVisible, setIsMediaMessageModalVisible] = useState<boolean>(false);

  const navigation = useNavigation();

  const onInitialChatFetch = async () => {
    const response = await fetchInitialChats(
      isInitialLoading,
      setIsInitialLoading,
      chatId,
      isMoreMessageAvailable,
      setIsMoreMessageAvailable,
      nextPage,
      setNextPage
    );

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
      toastMessage("error", "Hold on...", `${response.error}`);
      return;
    }

    setMessages(response.chatMessages);
  };

  useEffect(() => {
    if (!chatId) return;
    onInitialChatFetch();
  }, [chatId]);

  const onSendMessageClick = async () => {
    if(isInitialLoading) {
      toastMessage("error", "Hold on...", "We are fetching your old memories... so hold on before making one more....");
      return;
    }

    const response = await sendMessage(
      isSendingMessage,
      setIsSendingMessage,
      newMessageContent,
      chatId
    );

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

    setNewMessageContent("");
  };

  const onMediaMessageButtonClick = () => {
    if(isInitialLoading) return;

    if(isSendingMessage) {
      toastMessage("error", "Hold on", "We are sending the message...");
      return;
    }

    setIsMediaMessageModalVisible(true);
  }

  return (
    <View
      style={isDarkMode ? darkStyles.BodyContainer : lightStyles.BodyContainer}
    >
      <View
        style={
          isDarkMode
            ? darkStyles.MessageFlatListSection
            : lightStyles.MessageFlatListSection
        }
      >
        {isInitialLoading ? (
          <View
            style={
              isDarkMode ? darkStyles.LoadingView : lightStyles.LoadingView
            }
          >
            <ActivityIndicator color="#FD6438" size="large" />
          </View>
        ) : (
          <ChatMessageDisplay
            chatMessages={messages}
            isMoreMessagesAvailable={isMoreMessageAvailable}
            setIsMoreMessagesAvailable={setIsMoreMessageAvailable}
            nextPage={nextPage}
            setNextPage={setNextPage}
            chatId={chatId}
            setChatMessages={setMessages}
          />
        )}
      </View>

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
          style={
            isDarkMode
              ? darkStyles.SendMessageHelperButton
              : lightStyles.SendMessageHelperButton
          }
          onPress={onMediaMessageButtonClick}
        >
          <AntDesign
            name="plus"
            size={24}
            color={isDarkMode ? "#F6F8FA" : "#0A0911"}
          />
        </Pressable>

        <Pressable
          style={[
            isDarkMode
              ? darkStyles.SendMessageButton
              : lightStyles.SendMessageButton,
            {
              backgroundColor: `${
                isInitialLoading || isSendingMessage
                  ? `${isDarkMode ? "#08070C" : "#FFFFFF"}`
                  : "#FD6438"
              }`,
              borderColor: `${
                isInitialLoading || isSendingMessage
                  ? `${isDarkMode ? "#F6F8FA" : "#0A0911"}`
                  : "transparent"
              }`,
              borderWidth: parseInt(
                `${isInitialLoading || isSendingMessage ? "1" : "0"}`
              ),
            },
          ]}
          onPress={onSendMessageClick}
        >
          <Feather
            name="send"
            size={24}
            color={`${
              isInitialLoading || isSendingMessage
                ? `${isDarkMode ? "#F6F8FA" : "#0A0911"}`
                : `${isDarkMode ? "#0A0911" : "#F6F8FA"}`
            }`}
          />
        </Pressable>
      </View>

      <MediaMessageModal isMediaMessageModalVisible={isMediaMessageModalVisible} setIsMediaMessageModalVisible={setIsMediaMessageModalVisible} messages={messages} setMessages={setMessages} chatId={chatId} type={type}  />
    </View>
  );
};

export default ChatScreenBody;
