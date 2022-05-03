import { View, Text, Pressable } from "react-native";
import React from "react";
import { lightStyles, darkStyles } from "./styles";
import { useRecoilValue } from "recoil";
import { isDarkModeAtom } from "../../atom/isDarkModeAtom";
import { useFonts, Manrope_500Medium } from "@expo-google-fonts/manrope";
import { Entypo } from '@expo/vector-icons'; 
import { SearchedUserType } from "../../types";
import { removeUser } from "../../helpers/remove-user";

interface Props {
  user: SearchedUserType;
  selectedUsers: Array<SearchedUserType>;
  setSelectedUsers: Function;
  selectedUserIdSet: Set<string>;
  setSelectedUserIdSet: Function;
}

const SelectedGroupUser = (props: Props) => {
  const { user, selectedUsers, setSelectedUsers, selectedUserIdSet, setSelectedUserIdSet } = props;

  const isDarkMode = useRecoilValue<boolean>(isDarkModeAtom);
  const [fontsLoaded] = useFonts({ Manrope_500Medium });

  const onRemoveClick = () => {
    const newUsers = removeUser(selectedUsers, user._id ?? "");
    setSelectedUsers(newUsers);
    setSelectedUserIdSet(new Set([...selectedUserIdSet].filter(id => id !== user._id)));
  }

  return (
    <View
      style={isDarkMode ? darkStyles.UserContainer : lightStyles.UserContainer}
    >
      {fontsLoaded && (
        <Text
          style={
            isDarkMode ? darkStyles.UsernameText : lightStyles.UsernameText
          }
        >
          {user.username}
        </Text>
      )}

      <Pressable style={isDarkMode ? darkStyles.RemoveBtn : lightStyles.RemoveBtn} onPress={onRemoveClick}>
        <Entypo name="cross" size={12} color="#FD6438" />
      </Pressable>
    </View>
  );
};

export default SelectedGroupUser;
