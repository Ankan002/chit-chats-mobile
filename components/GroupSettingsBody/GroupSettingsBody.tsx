import { View, Text, FlatList } from "react-native";
import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { isDarkModeAtom } from "../../atom/isDarkModeAtom";
import { userAtom } from "../../atom/userAtom";
import { GroupChatType, SearchedUserType, UserType } from "../../types";
import ModalTriggerButton from "../ModalTriggerButton";
import { lightStyles, darkStyles } from "./styles";
import AddUsersModal from "../../modals/add-users-modal";
import GroupUsersThumbnail from "../GroupUsersThumbnail";

interface Props {
  groupChat: GroupChatType;
  setGroupChat: Function;
  isRemovingUser: boolean;
  setIsRemovingUser: Function;
}

interface UserFlatListProps {
  index: number;
  item: SearchedUserType;
}

const GroupSettingsBody = (props: Props) => {
  const { groupChat, setGroupChat, isRemovingUser, setIsRemovingUser } = props;

  const isDarkMode = useRecoilValue<boolean>(isDarkModeAtom);
  const [isAddUserModalVisible, setIsAddUserModalVisible] =
    useState<boolean>(false);

  const loggedInUser = useRecoilValue<UserType>(userAtom);

  return (
    <View style={isDarkMode ? darkStyles.Container : lightStyles.Container}>
      {loggedInUser._id === groupChat.groupAdmin._id && (
        <ModalTriggerButton
          title="Add Users"
          setModalVisibility={setIsAddUserModalVisible}
        />
      )}
      <AddUsersModal
        isAddUsersModalVisible={isAddUserModalVisible}
        setIsAddUsersModalVisible={setIsAddUserModalVisible}
        groupChat={groupChat}
        setGroupChat={setGroupChat}
      />
      <FlatList
        data={groupChat.users}
        renderItem={({ item }: UserFlatListProps) => (
          <GroupUsersThumbnail
            user={item}
            groupChat={groupChat}
            setGroupChat={setGroupChat}
            isRemovingUser={isRemovingUser}
            setIsRemovingUser={setIsRemovingUser}
          />
        )}
        keyExtractor={(item: SearchedUserType) => item._id ?? ""}
        disableScrollViewPanResponder={true}
        showsVerticalScrollIndicator={false}
        style={
          isDarkMode ? darkStyles.FlatListStyle : lightStyles.FlatListStyle
        }
      />
    </View>
  );
};

export default GroupSettingsBody;
