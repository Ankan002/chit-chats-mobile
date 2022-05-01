import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import { lightStyles, darkStyles } from "./styles";
import { useRecoilValue } from "recoil";
import { isDarkModeAtom } from "../../atom";
import { useFonts, Manrope_700Bold } from "@expo-google-fonts/manrope";
import { FiraCode_400Regular } from "@expo-google-fonts/fira-code";
import { useNavigation } from "@react-navigation/core";
import { SearchedUserType } from "../../types";

type Props = {
  type: "personal";
  user: SearchedUserType; 
} | {
  type: "group";
  user: SearchedUserType;
  updateFunction: Function; 
}

//TODO: Complete the rest component.

const UserSearchResult = (props: Props) => {
  const isDarkMode = useRecoilValue<boolean>(isDarkModeAtom);
  const [fontsLoaded] = useFonts({
    Manrope_700Bold,
    FiraCode_400Regular,
  });

  const navigation = useNavigation<any>();

  const onResultClick = () => {
    if(props.type === "personal") navigation.navigate("Profile", {user: props.user});
  }

  // console.log(user);

  return (
    <Pressable
      style={isDarkMode ? darkStyles.UserContainer : lightStyles.UserContainer}
      onPress={onResultClick}
    >
      <View
        style={
          isDarkMode ? darkStyles.ImageContainer : lightStyles.ImageContainer
        }
      >
        <Image
          source={{ uri: props.user.image }}
          style={isDarkMode ? darkStyles.ImageStyle : lightStyles.ImageStyle}
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
              isDarkMode ? darkStyles.UsernameText : lightStyles.UsernameText
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
  );
};

export default UserSearchResult;
