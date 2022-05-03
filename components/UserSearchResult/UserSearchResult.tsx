import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import { lightStyles, darkStyles } from "./styles";
import { useRecoilValue } from "recoil";
import { isDarkModeAtom } from "../../atom";
import { useFonts, Manrope_700Bold } from "@expo-google-fonts/manrope";
import { FiraCode_400Regular } from "@expo-google-fonts/fira-code";
import { useNavigation } from "@react-navigation/core";
import { removeUser } from "../../helpers/remove-user";
import { SearchedUserType } from "../../types";

type Props =
  | {
      type: "personal";
      user: SearchedUserType;
    }
  | {
      type: "group";
      user: SearchedUserType;
      selectedUserIdSet: Set<string>;
      setSelectedUserIdSet: Function;
      setSelectedUsers: Function;
      selectedUsers: Array<SearchedUserType>;
    };

const UserSearchResult = (props: Props) => {
  const isDarkMode = useRecoilValue<boolean>(isDarkModeAtom);
  const [fontsLoaded] = useFonts({
    Manrope_700Bold,
    FiraCode_400Regular,
  });

  const navigation = useNavigation<any>();

  const onResultClick = () => {
    if (props.type === "personal") {
      navigation.navigate("Profile", { user: props.user });
    }

    if (props.type === "group") {
      if (!props.selectedUserIdSet.has(props.user._id ?? "")) {
        props.setSelectedUserIdSet(
          new Set([...props.selectedUserIdSet, props.user._id])
        );
        props.setSelectedUsers([props.user, ...props.selectedUsers]);
      } else {
        const newUsers = removeUser(props.selectedUsers, props.user._id ?? "");
        props.setSelectedUsers(newUsers);
        props.setSelectedUserIdSet(
          new Set(
            [...props.selectedUserIdSet].filter((id) => id !== props.user._id)
          )
        );
      }
    }
  };

  return (
    <>
      {props.type === "personal" ? (
        <Pressable
          style={
            isDarkMode ? darkStyles.UserContainer : lightStyles.UserContainer
          }
          onPress={onResultClick}
        >
          <View
            style={
              isDarkMode
                ? darkStyles.ImageContainer
                : lightStyles.ImageContainer
            }
          >
            <Image
              source={{ uri: props.user.image }}
              style={
                isDarkMode ? darkStyles.ImageStyle : lightStyles.ImageStyle
              }
            />
          </View>
          <View
            style={
              isDarkMode
                ? darkStyles.DetailsContainer
                : lightStyles.DetailsContainer
            }
          >
            {fontsLoaded && (
              <Text
                numberOfLines={1}
                style={
                  isDarkMode
                    ? darkStyles.UsernameText
                    : lightStyles.UsernameText
                }
                ellipsizeMode="tail"
              >
                {props.user.username}
              </Text>
            )}

            {fontsLoaded && (
              <Text
                numberOfLines={1}
                style={isDarkMode ? darkStyles.NameText : lightStyles.NameText}
                ellipsizeMode="tail"
              >
                {props.user.name}
              </Text>
            )}
          </View>
        </Pressable>
      ) : (
        <Pressable
          style={
            props.selectedUserIdSet.has(props.user._id ?? "")
              ? isDarkMode
                ? [darkStyles.UserContainer, darkStyles.SelectedBorder]
                : [lightStyles.UserContainer, lightStyles.SelectedBorder]
              : isDarkMode
              ? darkStyles.UserContainer
              : lightStyles.UserContainer
          }
          onPress={onResultClick}
        >
          <View
            style={
              isDarkMode
                ? darkStyles.ImageContainer
                : lightStyles.ImageContainer
            }
          >
            <Image
              source={{ uri: props.user.image }}
              style={
                isDarkMode ? darkStyles.ImageStyle : lightStyles.ImageStyle
              }
            />
          </View>
          <View
            style={
              isDarkMode
                ? darkStyles.DetailsContainer
                : lightStyles.DetailsContainer
            }
          >
            {fontsLoaded && (
              <Text
                numberOfLines={1}
                style={
                  props.selectedUserIdSet.has(props.user._id ?? "") ? (
                    isDarkMode ? [darkStyles.UsernameText, darkStyles.SelectedText] : [lightStyles.UsernameText, lightStyles.SelectedText]
                  ) : (
                    isDarkMode ? darkStyles.UsernameText : lightStyles.UsernameText
                  )
                }
                ellipsizeMode="tail"
              >
                {props.user.username}
              </Text>
            )}

            {fontsLoaded && (
              <Text
                numberOfLines={1}
                style={
                  props.selectedUserIdSet.has(props.user._id ?? "") ? (
                    isDarkMode ? [darkStyles.NameText, darkStyles.SelectedText] : [lightStyles.NameText, lightStyles.SelectedText]
                  ) : (
                    isDarkMode ? darkStyles.NameText : lightStyles.NameText
                  )
                }
                ellipsizeMode="tail"
              >
                {props.user.name}
              </Text>
            )}
          </View>
        </Pressable>
      )}
    </>
  );
};

export default UserSearchResult;
