import {
  View,
  Text,
  Pressable,
  ActivityIndicator,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { isDarkModeAtom } from "../../atom/isDarkModeAtom";
import { groupChatsAtom } from "../../atom/groupChatsAtom";
import { darkStyles, lightStyles } from "./styles";
import { GroupChatType } from "../../types";
import {
  Manrope_500Medium,
  useFonts,
  Manrope_700Bold,
} from "@expo-google-fonts/manrope";
import { FiraCode_500Medium } from "@expo-google-fonts/fira-code";
import {
  updateGroupName,
  updateGroupNameInState,
} from "../../helpers/update-group-name/update-group-name";
import { toastMessage } from "../../helpers/toast-message/toast-message";

interface Props {
  previousName: string;
  isUpdating: boolean;
  setIsUpdating: Function;
  isModalVisible: boolean;
  setIsModalVisible: Function;
  currentGroupChat: GroupChatType;
  setCurrentGroupChat: Function;
}

const GroupNameUpdateForm = (props: Props) => {
  const {
    previousName,
    isUpdating,
    setIsUpdating,
    isModalVisible,
    setIsModalVisible,
    currentGroupChat,
    setCurrentGroupChat,
  } = props;

  const isDarkMode = useRecoilValue<boolean>(isDarkModeAtom);
  const [groupChats, setGroupChats] =
    useRecoilState<Array<GroupChatType>>(groupChatsAtom);
  const [newGroupName, setNewGroupName] = useState<string>("");

  const [fontsLoaded] = useFonts({
    Manrope_500Medium,
    Manrope_700Bold,
    FiraCode_500Medium,
  });

  const onUpdateGroupNameClick = async () => {
    const response = await updateGroupName(
      isUpdating,
      setIsUpdating,
      newGroupName,
      currentGroupChat._id
    );

    if (!response.success) {
      toastMessage("error", "Error Occurred", response.error);

      return;
    }

    console.log(newGroupName);

    updateGroupNameInState(
      currentGroupChat._id,
      newGroupName,
      setGroupChats,
      groupChats
    );

    setCurrentGroupChat({
      ...currentGroupChat,
      chatName: newGroupName,
    });

    setNewGroupName("");

    setIsModalVisible(!isModalVisible);
  };

  return (
    <View
      style={isDarkMode ? darkStyles.FormContainer : lightStyles.FormContainer}
    >
      {fontsLoaded && (
        <Text
          style={
            isDarkMode ? darkStyles.FieldLabelText : lightStyles.FieldLabelText
          }
        >
          Old Group Name
        </Text>
      )}

      {fontsLoaded && (
        <Text
          style={
            isDarkMode
              ? darkStyles.PreviousGroupName
              : lightStyles.PreviousGroupName
          }
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {previousName}
        </Text>
      )}

      {fontsLoaded && (
        <Text
          style={
            isDarkMode ? darkStyles.FieldLabelText : lightStyles.FieldLabelText
          }
        >
          New Group Name
        </Text>
      )}

      {fontsLoaded && (
        <TextInput
          style={
            isDarkMode ? darkStyles.NewGroupName : lightStyles.NewGroupName
          }
          placeholder="New group name"
          placeholderTextColor="#7E7D80"
          value={newGroupName}
          onChangeText={setNewGroupName}
        />
      )}

      <View
        style={
          isDarkMode ? darkStyles.ButtonContainer : lightStyles.ButtonContainer
        }
      >
        <Pressable
          style={
            isDarkMode ? darkStyles.UpdateButton : lightStyles.UpdateButton
          }
          onPress={onUpdateGroupNameClick}
        >
          {isUpdating ? (
            <ActivityIndicator
              size="large"
              color={isDarkMode ? "#0A0911" : "#F6F8FA"}
            />
          ) : (
            <>
              {fontsLoaded && (
                <Text
                  style={
                    isDarkMode ? darkStyles.UpdateText : lightStyles.UpdateText
                  }
                >
                  Update Group Name
                </Text>
              )}
            </>
          )}
        </Pressable>
      </View>
    </View>
  );
};

export default GroupNameUpdateForm;
