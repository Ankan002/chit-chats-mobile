import { View, Text, Pressable, ActivityIndicator } from "react-native";
import React from "react";
import { darkStyles, lightStyles } from "./styles";
import { isDarkModeAtom } from "../../atom/isDarkModeAtom";
import { Manrope_700Bold, useFonts } from "@expo-google-fonts/manrope";
import { userAtom } from "../../atom";
import { useRecoilValue, useRecoilState } from "recoil";
import { groupChatsAtom } from "../../atom/groupChatsAtom";
import { useNavigation } from "@react-navigation/core";
import { leaveGroup } from "../../helpers/leave-group";
import { GroupChatType, UserType } from "../../types";
import { toastMessage } from "../../helpers/toast-message";

interface Props {
  isLeavingGroup: boolean;
  setIsLeavingGroup: Function;
  group: GroupChatType;
}

const LeaveGroupSection = (props: Props) => {
  const { isLeavingGroup, setIsLeavingGroup, group } = props;

  const isDarkMode = useRecoilValue<boolean>(isDarkModeAtom);
  const [fontsLoaded] = useFonts({ Manrope_700Bold });

  const userLoggedIn = useRecoilValue<UserType>(userAtom);
  const [groupChats, setGroupChats] = useRecoilState<Array<GroupChatType>>(groupChatsAtom);
  const navigation = useNavigation();

  const onLeaveButtonClick = async() => {
      const response = await leaveGroup(isLeavingGroup, setIsLeavingGroup, group, userLoggedIn._id ?? "");

      if(response.success === false){
        toastMessage("error", "Fatal Error", `${response.error}`);
        return;
      }

      const updatedGroupChats = groupChats.filter((groupChat) => groupChat._id !== group._id);

      setGroupChats(updatedGroupChats);

      toastMessage("success", "Yeah...", `Successfully left ${group.chatName}`);

      if(navigation.canGoBack()) navigation.goBack();
  }

  return (
    <View
      style={
        isDarkMode
          ? darkStyles.LeaveButtonContainer
          : lightStyles.LeaveButtonContainer
      }
    >
      <Pressable
        style={isDarkMode ? darkStyles.LeaveButton : lightStyles.LeaveButton}
        onPress={onLeaveButtonClick}
      >
        {isLeavingGroup ? (
          <ActivityIndicator
            size="large"
            color={isDarkMode ? "#0A0911" : "#F6F8FA"}
          />
        ) : (
          <>
            {fontsLoaded && (
              <Text
                style={
                  isDarkMode ? darkStyles.LeaveText : lightStyles.LeaveText
                }
              >
                Leave Group
              </Text>
            )}
          </>
        )}
      </Pressable>
    </View>
  );
};

export default LeaveGroupSection;
