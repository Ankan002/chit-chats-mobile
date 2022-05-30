import { View, Text, Pressable, Image } from 'react-native';
import React, {useState, useEffect} from 'react';
import { SingleChatType, GroupChatType, UserType } from "../../types";
import { getChatNameAndImage } from "../../helpers/get-chat-name-image";
import { userAtom } from "../../atom/userAtom";
import { isDarkModeAtom } from "../../atom/isDarkModeAtom";
import { darkStyles, lightStyles } from "./styles"
import { Manrope_700Bold, Manrope_400Regular, useFonts } from "@expo-google-fonts/manrope";
import { useNavigation } from '@react-navigation/core';
import { useRecoilValue } from "recoil";

type Props = {
  type: "group-chat";
  chat: GroupChatType;
} | {
  type: "single-chat";
  chat: SingleChatType;
}

const SingleChat = (props: Props) => {

  const { type, chat } = props;

  const [fontsLoaded] = useFonts({
    Manrope_700Bold,
    Manrope_400Regular
  });

  const [chatName, setChatName] = useState<string>("");
  const [chatImage, setChatImage] = useState<string>("https://i.pinimg.com/564x/c9/6c/30/c96c308f905434c7e2f33fa81b9c2763.jpg");
  const loggedInUser = useRecoilValue<UserType>(userAtom);
  const isDarkMode = useRecoilValue<boolean>(isDarkModeAtom);
  const navigation = useNavigation<any>();

  useEffect(() => {
    if(type === "group-chat"){
        setChatName(chat.chatName);
        setChatImage(chat.groupImage);
    }
    else{
        const data = getChatNameAndImage(chat.users, loggedInUser._id ?? "");
        if(data?.chatImage) setChatImage(data.chatImage);
        if(data?.chatName) setChatName(data.chatName);
    }
  }, [chat]);

  const onChatClick = () => {
    if(type === "single-chat"){
      navigation.navigate("SingleChat", {chat});
    }
    else{
      navigation.navigate("GroupChat", {chat});
    }
  }

  return (
    <Pressable
     style={isDarkMode ? darkStyles.ChatContainer : lightStyles.ChatContainer}
     onPress={onChatClick}
    >
      <View
        style={isDarkMode ? darkStyles.ImageContainer : lightStyles.ImageContainer}
      >
        <Image
         source={{uri: chatImage}}
         defaultSource={{uri: "https://i.pinimg.com/564x/c9/6c/30/c96c308f905434c7e2f33fa81b9c2763.jpg"}}
         style={isDarkMode ? darkStyles.ImageStyle : lightStyles.ImageStyle}
        />
      </View>

      <View
        style={isDarkMode ? darkStyles.DetailsContainer : lightStyles.DetailsContainer}
      >
        {
          fontsLoaded && (
            <Text
              style={isDarkMode ? darkStyles.ChatName : lightStyles.ChatName}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {chatName}
            </Text>
          )
        }

        {
          fontsLoaded && (
            <Text
              style={isDarkMode ? darkStyles.ChatText : lightStyles.ChatText}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {
                chat.latestMessage ? `${chat.latestMessage.content}` : "No messages sent yet"
              }
            </Text>
          )
        }
      </View>
    </Pressable>
  );
};

export default SingleChat;