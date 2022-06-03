import { View, Text, Pressable, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { SingleChatType, GroupChatType, UserType } from "../../types";
import { getChatNameAndImage } from "../../helpers/get-chat-name-image";
import { userAtom } from "../../atom/userAtom";
import { isDarkModeAtom } from "../../atom/isDarkModeAtom";
import { darkStyles, lightStyles } from "./styles";
import { notificationChatsAtom } from "../../atom/notificationChatsAtom";
import {
  Manrope_700Bold,
  Manrope_400Regular,
  useFonts,
} from "@expo-google-fonts/manrope";

import { useNavigation } from "@react-navigation/core";
import { useRecoilValue, useRecoilState } from "recoil";

type Props =
  | {
      type: "group-chat";
      chat: GroupChatType;
    }
  | {
      type: "single-chat";
      chat: SingleChatType;
    };

const SingleChat = (props: Props) => {
  const { type, chat } = props;

  const [fontsLoaded] = useFonts({
    Manrope_700Bold,
    Manrope_400Regular,
  });

  const [chatName, setChatName] = useState<string>("");
  const [chatImage, setChatImage] = useState<string>(
    "https://i.pinimg.com/564x/c9/6c/30/c96c308f905434c7e2f33fa81b9c2763.jpg"
  );
  const loggedInUser = useRecoilValue<UserType>(userAtom);
  const isDarkMode = useRecoilValue<boolean>(isDarkModeAtom);
  const navigation = useNavigation<any>();
  const [notificationChats, setNotificationChats] = useRecoilState<Set<string>>(
    notificationChatsAtom
  );

  useEffect(() => {
    if (type === "group-chat") {
      setChatName(chat.chatName);
      setChatImage(chat.groupImage);
    } else {
      const data = getChatNameAndImage(chat.users, loggedInUser._id ?? "");
      if (data?.chatImage) setChatImage(data.chatImage);
      if (data?.chatName) setChatName(data.chatName);
    }
  }, [chat]);

  const onChatClick = () => {
    if (chat._id && notificationChats.has(chat._id)) {
      setNotificationChats(
        new Set([...notificationChats].filter((chatId) => chatId !== chatId))
      );
    }
    if (type === "single-chat") {
      navigation.navigate("SingleChat", { chat });
    } else {
      navigation.navigate("GroupChat", { chat });
    }
  };

  return (
    <Pressable
      style={isDarkMode ? darkStyles.ChatContainer : lightStyles.ChatContainer}
      onPress={onChatClick}
    >
      <View
        style={
          isDarkMode ? darkStyles.ImageContainer : lightStyles.ImageContainer
        }
      >
        <Image
          source={{ uri: chatImage }}
          style={isDarkMode ? darkStyles.ImageStyle : lightStyles.ImageStyle}
        />
      </View>

      <View
        style={
          isDarkMode
            ? darkStyles.DetailsContainer
            : lightStyles.DetailsContainer
        }
      >
        {fontsLoaded && (
          <Text
            style={
              isDarkMode
                ? [
                    darkStyles.ChatName,
                    {
                      color: `${
                        notificationChats.has(chat._id ?? "")
                          ? "#08CD92"
                          : "#F6F8FA"
                      }`,
                      fontWeight: `${
                        notificationChats.has(chat._id ?? "")
                          ? "700"
                          : "500"
                      }`
                    },
                  ]
                : [
                    lightStyles.ChatName,
                    {
                      color: `${
                        notificationChats.has(chat._id ?? "")
                          ? "#08CD92"
                          : "#0A0911"
                      }`,
                      fontWeight: `${
                        notificationChats.has(chat._id ?? "")
                          ? "700"
                          : "500"
                      }`
                    },
                  ]
            }
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {chatName}
          </Text>
        )}

        {fontsLoaded && (
          <Text
          style={
            isDarkMode
              ? [
                  darkStyles.ChatText,
                  {
                    color: `${
                      notificationChats.has(chat._id ?? "")
                        ? "#08CD92"
                        : "#F6F8FA"
                    }`,
                    fontWeight: `${
                      notificationChats.has(chat._id ?? "")
                        ? "600"
                        : "400"
                    }`
                  },
                ]
              : [
                  lightStyles.ChatText,
                  {
                    color: `${
                      notificationChats.has(chat._id ?? "")
                        ? "#08CD92"
                        : "#0A0911"
                    }`,
                    fontWeight: `${
                      notificationChats.has(chat._id ?? "")
                        ? "600"
                        : "400"
                    }`
                  },
                ]
          }
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {chat.latestMessage
              ? `${chat.latestMessage.content}`
              : "No messages sent yet"}
          </Text>
        )}
      </View>
    </Pressable>
  );
};

export default SingleChat;
