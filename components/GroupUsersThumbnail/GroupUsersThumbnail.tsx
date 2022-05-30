import { View, Text, Pressable, Image, Alert } from "react-native";
import React, {useState} from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { isDarkModeAtom } from "../../atom/isDarkModeAtom";
import { lightStyles, darkStyles } from "./styles";
import { userAtom } from "../../atom/userAtom";
import UserModal from "../../modals/user-modal";
import {
  Manrope_400Regular,
  Manrope_700Bold,
  useFonts,
} from "@expo-google-fonts/manrope";
import { SearchedUserType, GroupChatType, UserType } from "../../types";
import { toastMessage } from "../../helpers/toast-message";
import { groupChatsAtom } from "../../atom/groupChatsAtom";
import { removeGroupMember, removeGroupMemberInState } from "../../helpers/remove-group-member";
import { MaterialIcons } from '@expo/vector-icons';

interface Props {
  user: SearchedUserType;
  groupChat: GroupChatType;
  setGroupChat: Function;
  isRemovingUser: boolean;
  setIsRemovingUser: Function;
}

const GroupUsersThumbnail = (props: Props) => {
  const { user, groupChat, setGroupChat, isRemovingUser, setIsRemovingUser } = props;

  const isDarkMode = useRecoilValue<boolean>(isDarkModeAtom);
  const loggedInUser = useRecoilValue<UserType>(userAtom);
  const [isUserModalVisible, setIsUserModalVisible] = useState<boolean>(false);
  const [groupChats, setGroupChats] = useRecoilState<Array<GroupChatType>>(groupChatsAtom);

  const [fontsLoaded] = useFonts({
    Manrope_400Regular,
    Manrope_700Bold,
  });

  const onUserProfileClick = () => {
      setIsUserModalVisible(true);
  }

  const onConfirmRemoveClick = async() => {
    const response = await removeGroupMember(isRemovingUser, setIsRemovingUser, groupChat._id, user._id ?? "");

    if(!response.success){
        toastMessage("error", "Oops!!", `${response.error}`);
        return
    }

    removeGroupMemberInState(groupChats, setGroupChats, user._id ?? "", groupChat._id);

    setGroupChat({
        ...groupChat,
        users: groupChat.users.filter((chatUser) => chatUser._id !== user._id)
    });

    toastMessage("success", "Successfully Kicked", `Successfully kicked ${user.username}`);
  };

  const onRemoveUserClick = async() => {
      if(groupChat.users.length <= 2){
          toastMessage("error", `Cannot Remove ${user.username}`, `Cannot remove ${user.username} as there is only 2 users in the group`);
          return;
      }

      Alert.alert("Are you sure?", `Are you sure you want to remove ${user.username} from ${groupChat.chatName}`, [
          {
              text: "No",
              style: "cancel",
              onPress: () => {return}
          },
          {
              text: "Yes",
              style: "default",
              onPress: () => onConfirmRemoveClick()
          }
      ]);
  }

  return (
    <Pressable
      style={
        isDarkMode ? darkStyles.ProfileContainer : lightStyles.ProfileContainer
      }
      onPress={onUserProfileClick}
    >
      <View
        style={
          isDarkMode ? darkStyles.ImageContainer : lightStyles.ImageContainer
        }
      >
        <Image
          source={{ uri: user.image ?? "an" }}
          style={isDarkMode ? darkStyles.ImageStyle : lightStyles.ImageStyle}
        />
      </View>

      {fontsLoaded && (
        <View
          style={
            isDarkMode
              ? darkStyles.DetailsContainer
              : lightStyles.DetailsContainer
          }
        >
          <Text style={isDarkMode ? darkStyles.UserName : lightStyles.UserName} numberOfLines={1} ellipsizeMode="tail">
              {user.username}
          </Text>

          {groupChat.groupAdmin._id === user._id && (
            <Text style={isDarkMode ? darkStyles.AdminText : lightStyles.AdminText}>
                Admin
            </Text>
          )}
        </View>
      )}

      {
          groupChat.groupAdmin._id === loggedInUser._id && user._id !== loggedInUser._id && (
              <View style={isDarkMode ? darkStyles.DeleteButtonContainer : lightStyles.DeleteButtonContainer}>
                  <Pressable onPress={onRemoveUserClick}>
                    <MaterialIcons name="delete" size={24} color={isRemovingUser ?  "#ADB4C1" : "#FD6438"} />

                  </Pressable>
              </View>
          )
      }
      <UserModal isModalVisible={isUserModalVisible} setIsModalVisible={setIsUserModalVisible} user={user} />
    </Pressable>
  );
};

export default GroupUsersThumbnail;
