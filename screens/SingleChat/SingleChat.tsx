import { View, Text } from "react-native";
import React, { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { isDarkModeAtom } from "../../atom/isDarkModeAtom";
import { lightStyles, darkStyles } from "./styles";
import ChatScreenNavigator from "../../components/ChatScreenNavigator";
import { useRoute } from "@react-navigation/core";
import { SearchedUserType, SingleChatType, UserType } from "../../types";
import { getSingleChatDisplayUser } from "../../helpers/get-chat-name-image";
import { userAtom } from "../../atom";
import UserModal from "../../modals/user-modal/user-modal";
import ChatScreenHeader from "../../components/ChatScreenHeader";

const SingleChat = () => {
  const isDarkMode = useRecoilValue<boolean>(isDarkModeAtom);
  const router = useRoute<any>();
  const [currentChat, setCurrentChat] = useState<SingleChatType | null>(null);
  const [isProfileModalActive, setIsProfileModalActive] =
    useState<boolean>(false);
  const [displayUser, setDisplayUser] = useState<SearchedUserType>({});
  const loggedInUser = useRecoilValue<UserType>(userAtom);

  const { chat } = router.params;

  useEffect(() => {
    if (!chat) return;

    setCurrentChat(chat);
  }, [chat]);

  useEffect(() => {
    if (!currentChat) return;

    const userToBeDisplayed = getSingleChatDisplayUser(
      currentChat.users,
      loggedInUser._id ?? ""
    );

    if (userToBeDisplayed) setDisplayUser(userToBeDisplayed);
  }, [currentChat]);

  return (
    <View
      style={
        isDarkMode ? darkStyles.AndroidSafeArea : lightStyles.AndroidSafeArea
      }
    >
      {currentChat && (
        <ChatScreenNavigator
          type="single-chat-screen"
          isModalVisible={isProfileModalActive}
          setIsModalVisible={setIsProfileModalActive}
        />
      )}

      <ChatScreenHeader
        type="single-chat"
        image={displayUser.image ?? "na"}
        username={displayUser.username ?? "na"}
        name={displayUser.name ?? "na"}
      />

      <UserModal
        user={displayUser}
        isModalVisible={isProfileModalActive}
        setIsModalVisible={setIsProfileModalActive}
      />
    </View>
  );
};

export default SingleChat;
