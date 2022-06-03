import { View, Text, Image, FlatList } from 'react-native'
import { useRecoilValue, useRecoilState } from "recoil";
import {isDarkModeAtom} from "../../atom/isDarkModeAtom";
import { fetchMore } from '../../helpers/fetch-chat-messages';
import { lightStyles, darkStyles } from './styles';
import { FetchedMessageType } from "../../types";
import { useFonts, Manrope_500Medium } from '@expo-google-fonts/manrope';
import { groupChatsAtom } from '../../atom/groupChatsAtom';
import { GroupChatType } from '../../types';
import { useNavigation } from '@react-navigation/core';
import { toastMessage } from '../../helpers/toast-message';
import { currentChatAtom } from '../../atom/currentChatAtom';
import { FakeMessages } from "../../constants/FakeMessages";
import Message from "../Message";
import React, {useState} from 'react'

const EmptyImage = require("../../assets/images/empty-chat-message.png");

interface Props{
    chatMessages: Array<FetchedMessageType>;
    isMoreMessagesAvailable: boolean;
    setIsMoreMessagesAvailable: Function;
    nextPage: number;
    setNextPage: Function;
    chatId: string;
    setChatMessages: Function;
}

interface MessageFlatListProps{
  index: number,
  item: FetchedMessageType
}

const styles = (props: Props) => {
  const { chatMessages, isMoreMessagesAvailable, setIsMoreMessagesAvailable, nextPage, setNextPage, chatId, setChatMessages } = props;

  const isDarkMode = useRecoilValue<boolean>(isDarkModeAtom);
  const [fontsLoaded] = useFonts({Manrope_500Medium});
  const [isMoreMessagesLoading, setIsMoreMessagesLoading] = useState<boolean>(false);
  const [groupChats, setGroupChats] =
    useRecoilState<Array<GroupChatType>>(groupChatsAtom);
  const navigation = useNavigation();
  const [currentSelectedChat, setCurrentSelectedChat] = useRecoilState<string | null>(currentChatAtom);

  const onEndOfCurrentMessageList = async() => {
    const response = await fetchMore(isMoreMessagesLoading, setIsMoreMessagesLoading, chatId, isMoreMessagesAvailable, setIsMoreMessagesAvailable, nextPage, setNextPage);

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
      // toastMessage("error", "Hold on...", `${response.error}`);
      return;
    }

    setChatMessages([...chatMessages, ...response.chatMessages]);
  }

  return (
    <View style={isDarkMode ? darkStyles.MessagesContainer : lightStyles.MessagesContainer}>
      {
        chatMessages.length === 0 ? (
          <View style={isDarkMode ? darkStyles.EmptyImageContainer : lightStyles.EmptyImageContainer}>
            <Image source={EmptyImage} style={isDarkMode ? darkStyles.EmptyImage : lightStyles.EmptyImage} />
            {
              fontsLoaded && (
                <Text style={isDarkMode ? darkStyles.EmptyText : lightStyles.EmptyText}>
                  Sent message to anti-social element... lets start a friendship...
                </Text>
              )
            }
          </View>
        ) : (
          <>
            <FlatList
              data={chatMessages}
              renderItem={({item}: MessageFlatListProps) => (<Message message={item} />)}
              keyExtractor={(item: FetchedMessageType) => item._id}
              inverted
              style={isDarkMode ? darkStyles.MessageFlatListStyle : lightStyles.MessageFlatListStyle}
              removeClippedSubviews={true}
              maxToRenderPerBatch={15}
              onEndReached={onEndOfCurrentMessageList}
              onEndReachedThreshold={0}
              showsVerticalScrollIndicator={false}
            />
          </>
        )
      }
    </View>
  )
}

export default styles