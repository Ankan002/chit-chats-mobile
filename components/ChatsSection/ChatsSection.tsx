import { View, Text, Image, FlatList, ActivityIndicator } from "react-native";
import React, {useEffect} from "react";
import { useRecoilValue } from "recoil";
import { isDarkModeAtom } from "../../atom/isDarkModeAtom";
import { lightStyles, darkStyles } from "./styles";
import { useFonts, Manrope_500Medium } from "@expo-google-fonts/manrope";
import { singleChatsAtom } from "../../atom/singleChatsAtom";
import { groupChatsAtom } from "../../atom/groupChatsAtom";
import type { GroupChatType, SingleChatType } from "../../types";
import { FakeSingleChats } from "../../constants/FakeSingleChat";
import { chatsLoadingAtom } from "../../atom/chatsLoadingAtom";
import Chat from "../Chat";

const EmptyChatImage = require("../../assets/images/empty-chat.png");

interface Props {
  type: "single-chat" | "group-chat";
}

interface SingleChatListProps {
  index: number;
  item: SingleChatType;
}

interface GroupChatListProps{
  index: number;
  item: GroupChatType
}

const ChatsSection = (props: Props) => {
  const { type } = props;

  const isDarkMode = useRecoilValue<boolean>(isDarkModeAtom);
  const singleChats = useRecoilValue<Array<SingleChatType>>(singleChatsAtom);
  const groupChats = useRecoilValue<Array<GroupChatType>>(groupChatsAtom);
  const isChatsLoading = useRecoilValue<boolean>(chatsLoadingAtom);
  const [fontsLoaded] = useFonts({ Manrope_500Medium });

  return (
    <View
      style={
        isDarkMode
          ? darkStyles.ChatsSectionContainer
          : lightStyles.ChatsSectionContainer
      }
    >
      {isChatsLoading ? (
        <View
          style={
            isDarkMode ? darkStyles.LoadingSection : lightStyles.LoadingSection
          }
        >
          <ActivityIndicator size="large" color="#FD6438" />
        </View>
      ) : (
        <>
          {type === "single-chat" && (
            <>
              {singleChats.length === 0 ? (
                <View
                  style={
                    isDarkMode
                      ? darkStyles.EmptyContainer
                      : lightStyles.EmptyContainer
                  }
                >
                  <Image
                    source={EmptyChatImage}
                    style={
                      isDarkMode
                        ? darkStyles.EmptyImage
                        : lightStyles.EmptyImage
                    }
                  />
                  {fontsLoaded && (
                    <Text
                      style={
                        isDarkMode
                          ? darkStyles.EmptyText
                          : lightStyles.EmptyText
                      }
                    >
                      No chats yet... find some friends
                    </Text>
                  )}
                </View>
              ) : (
                <FlatList
                  data={singleChats}
                  renderItem={({ item }: SingleChatListProps) => (
                    <Chat type="single-chat" chat={item} />
                  )}
                  keyExtractor={(item: SingleChatType) => item._id ?? ""}
                  style={
                    isDarkMode
                      ? darkStyles.FlatListStyle
                      : lightStyles.FlatListStyle
                  }
                  disableScrollViewPanResponder={true}
                  showsHorizontalScrollIndicator={false}
                />
              )}
            </>
          )}

          {type === "group-chat" && (
            <>
              {groupChats.length === 0 ? (
                <View
                  style={
                    isDarkMode
                      ? darkStyles.EmptyContainer
                      : lightStyles.EmptyContainer
                  }
                >
                  <Image
                    source={EmptyChatImage}
                    style={
                      isDarkMode
                        ? darkStyles.EmptyImage
                        : lightStyles.EmptyImage
                    }
                  />
                  {fontsLoaded && (
                    <Text
                      style={
                        isDarkMode
                          ? darkStyles.EmptyText
                          : lightStyles.EmptyText
                      }
                    >
                      No groups joined yet... either join one or create one...
                    </Text>
                  )}
                </View>
              ) : (
                <FlatList
                  data={groupChats}
                  renderItem={({ item }: GroupChatListProps) => (
                    <Chat type="group-chat" chat={item} />
                  )}
                  keyExtractor={(item: GroupChatType) => item._id ?? ""}
                  style={
                    isDarkMode
                      ? darkStyles.FlatListStyle
                      : lightStyles.FlatListStyle
                  }
                  disableScrollViewPanResponder={true}
                  showsHorizontalScrollIndicator={false}
                />
              )}
            </>
          )}
        </>
      )}
    </View>
  );
};

export default ChatsSection;
