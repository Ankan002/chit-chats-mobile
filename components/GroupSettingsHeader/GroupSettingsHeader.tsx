import { View, Text, Image, Pressable } from "react-native";
import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { lightStyles, darkStyles } from "./styles";
import { isDarkModeAtom } from "../../atom/isDarkModeAtom";
import { useFonts, FiraCode_500Medium } from "@expo-google-fonts/fira-code";
import { Manrope_600SemiBold } from "@expo-google-fonts/manrope";
import { EvilIcons } from "@expo/vector-icons";
import UpdateGroupNameModal from "../../modals/update-group-name-modal";
import { GroupChatType } from "../../types";

interface Props {
  image: string;
  groupName: string;
  isAdmin: boolean;
  groupChat: GroupChatType;
  setGroupChat: Function
}

const GroupSettingsHeader = (props: Props) => {
  const { image, groupName, isAdmin, groupChat, setGroupChat } = props;

  const [fontsLoaded] = useFonts({ FiraCode_500Medium, Manrope_600SemiBold });
  const isDarkMode = useRecoilValue<boolean>(isDarkModeAtom);

  const [isUpdateGroupNameModalVisible, setIsUpdateGroupNameModalVisible] =
    useState<boolean>(false);

  const onUpdateGroupNameButtonClick = () => {
    setIsUpdateGroupNameModalVisible(true);
  };

  return (
    <View
      style={
        isDarkMode ? darkStyles.HeaderContainer : lightStyles.HeaderContainer
      }
    >
      <View
        style={
          isDarkMode
            ? darkStyles.GroupImageContainer
            : lightStyles.GroupImageContainer
        }
      >
        <Image
          source={{ uri: image }}
          style={
            isDarkMode
              ? darkStyles.GroupImageStyles
              : lightStyles.GroupImageContainer
          }
        />
      </View>

      {isAdmin && (
        <Pressable
          style={
            isDarkMode
              ? darkStyles.EditImageButton
              : lightStyles.EditImageButton
          }
        >
          {fontsLoaded && (
            <Text
              style={
                isDarkMode
                  ? darkStyles.EditImageButtonText
                  : lightStyles.EditImageButtonText
              }
            >
              Edit Group Image
            </Text>
          )}
        </Pressable>
      )}

      {!isAdmin && (
        <Text
          style={
            isDarkMode
              ? darkStyles.NonAdminGroupName
              : lightStyles.NonAdminGroupName
          }
        >
          {groupName}
        </Text>
      )}

      {isAdmin && fontsLoaded && (
        <View
          style={
            isDarkMode
              ? darkStyles.AdminGroupNameSection
              : lightStyles.AdminGroupNameSection
          }
        >
          <Text
            style={
              isDarkMode
                ? darkStyles.AdminGroupNameLabelText
                : lightStyles.AdminGroupNameLabelText
            }
          >
            Group Name
          </Text>
          <View
            style={
              isDarkMode
                ? darkStyles.AdminCurrentGroupNameDisplay
                : lightStyles.AdminCurrentGroupNameDisplay
            }
          >
            <View
              style={
                isDarkMode
                  ? darkStyles.AdminGroupNameView
                  : lightStyles.AdminGroupNameView
              }
            >
              <Text
                style={
                  isDarkMode
                    ? darkStyles.CurrentGroupName
                    : lightStyles.CurrentGroupName
                }
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {groupName}
              </Text>
            </View>
            <Pressable
              style={
                isDarkMode
                  ? darkStyles.ChangeNameButton
                  : lightStyles.ChangeNameButton
              }
              onPress={onUpdateGroupNameButtonClick}
            >
              <EvilIcons
                name="pencil"
                size={30}
                color={isDarkMode ? "#FDFEFF" : "#171725"}
              />
            </Pressable>
          </View>
          <UpdateGroupNameModal
            currentName={groupName}
            isModalVisible={isUpdateGroupNameModalVisible}
            setIsModalVisible={setIsUpdateGroupNameModalVisible}
            groupChat={groupChat}
            setGroupChat={setGroupChat}
          />
        </View>
      )}
    </View>
  );
};

export default GroupSettingsHeader;
