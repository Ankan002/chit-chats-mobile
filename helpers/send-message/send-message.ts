import AsyncStoage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";
import {
  GroupChatType,
  GroupSentMessageType,
  SingleChatType,
  SingleSentMessageType,
} from "../../types";
import { DocumentPickerResponse } from "react-native-document-picker";

export const sendMessage = async (
  isSending: boolean,
  setIsSending: Function,
  content: string,
  chatId: string
) => {
  if (isSending)
    return {
      success: false,
      error: "We are sending the message hold on",
    };

  if (content.length < 5 || content.length > 400)
    return {
      success: false,
      error:
        "Message Content should be at least 5 characters long and at most 400 characters long",
    };

  setIsSending(true);

  try {
    const token = await AsyncStoage.getItem("auth-token");

    const response = await fetch(
      `${Constants?.manifest?.extra?.apiEndpoint}/message`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token ?? "",
        },
        body: JSON.stringify({
          chatId,
          content,
        }),
      }
    );

    const data = await response.json();

    setIsSending(false);

    if (!data.success && data.error === "You are not a part of this group")
      return {
        success: false,
        notGroupMember: true,
      };

    if (!data.success)
      return {
        success: false,
        error: data.error,
      };

    return {
      success: data.success,
      message: data.data.message,
    };
  } catch (error) {
    console.log(error);
    setIsSending(false);

    return {
      success: false,
      error: "Internal Server Error!!",
    };
  }
};

export const sendMediaMessage = async (
  isSendingMediaMessage: boolean,
  setIsSendingMediaMessage: Function,
  media: DocumentPickerResponse | null,
  content: string,
  chatId: string
) => {
  if (isSendingMediaMessage)
    return {
      success: false,
      error: "We are sending message hold on...",
    };

  if (!media)
    return {
      success: false,
      error: "Please provide us with a media to send...",
    };

  if (content.length < 5 || content.length > 400)
    return {
      success: false,
      error:
        "Message Content should be at least 5 characters long and at most 400 characters long",
    };

  setIsSendingMediaMessage(true);

  try {
    const token = await AsyncStoage.getItem("auth-token");

    const mediaContent = {
      uri: media.uri,
      type: media.type,
      name: media.name,
    };

    const formData = new FormData();

    formData.append("media", mediaContent as unknown as Blob);
    formData.append("chatId", chatId);
    formData.append("content", content);

    // console.log(Constants?.manifest?.extra?.apiEndpoint);
    console.log(token);

    const response = await fetch(
      `${Constants?.manifest?.extra?.apiEndpoint}/message/media`,
      {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
          "auth-token": token ?? "",
        },
        body: formData,
      }
    );

    console.log(`${JSON.stringify(response)}`);

    const data = await response.json();

    setIsSendingMediaMessage(false);

    if (!data.success && data.error === "You are not a part of this group")
      return {
        success: false,
        notGroupMember: true,
      };

    if (!data.success)
      return {
        success: false,
        error: data.error,
      };

    return {
      success: data.success,
      message: data.data.message,
    };
  } catch (error) {
    console.log(error);
    setIsSendingMediaMessage(false);

    return {
      success: false,
      error: "Internal Server Error",
    };
  }
};

export const updateGroupChatsOnMessageSent = (
  latestMessage: GroupSentMessageType,
  groupId: string,
  groupChats: Array<GroupChatType>,
  setGroupChats: Function
) => {
  const removedGroupChats = groupChats.filter(
    (groupChat) => groupChat._id !== groupId
  );

  const updatedGroup = {
    ...latestMessage.chat,
    latestMessage: {
      __v: latestMessage.__v,
      _id: latestMessage._id,
      sender: latestMessage.sender._id,
      content: latestMessage.content,
      chat: latestMessage.chat._id,
      media: latestMessage?.media,
    },
  };

  const updatedGroupChats = [updatedGroup, ...removedGroupChats];

  setGroupChats(updatedGroupChats);
};

export const updateSingleChatsOnMessageSend = (
  latestMessage: SingleSentMessageType,
  chatId: string,
  singleChats: Array<SingleChatType>,
  setSingleChats: Function
) => {
  const removedSingleChats = singleChats.filter(
    (singleChat) => singleChat._id !== chatId
  );

  const updatedSingleChat = {
    ...latestMessage.chat,
    latestMessage: {
      __v: latestMessage.__v,
      _id: latestMessage._id,
      sender: latestMessage.sender._id,
      content: latestMessage.content,
      chat: latestMessage.chat._id,
      media: latestMessage?.media,
    },
  };

  const updatedSingleChats = [updatedSingleChat, ...removedSingleChats];

  setSingleChats(updatedSingleChats);
};
