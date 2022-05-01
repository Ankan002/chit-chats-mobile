import { View, Text, Image } from "react-native";
import React from "react";
import { darkStyles, lightStyles } from "./styles";
import { useFonts, Manrope_600SemiBold } from "@expo-google-fonts/manrope";
import { useRecoilValue } from "recoil";
import { isDarkModeAtom } from "../../atom";
import {
  FiraCode_500Medium,
  FiraCode_400Regular,
} from "@expo-google-fonts/fira-code";

interface Props {
  image: string;
  name: string;
  username: string;
}

const ProfileHeader = (props: Props) => {
  const { image, name, username } = props;
  const isDarkMode = useRecoilValue<boolean>(isDarkModeAtom);
  const [fontsLoaded] = useFonts({
    Manrope_600SemiBold,
    FiraCode_500Medium,
    FiraCode_400Regular,
  });
  return (
    <View
      style={
        isDarkMode ? darkStyles.HeaderContainer : lightStyles.HeaderContainer
      }
    >
      <View style={isDarkMode ? darkStyles.ProfilePictureContainer : lightStyles.ProfilePictureContainer}>
        <Image
          source={{ uri: image }}
          style={
            isDarkMode ? darkStyles.ProfilePicture : lightStyles.ProfilePicture
          }
        />
      </View>

      {fontsLoaded && (
        <Text
          style={isDarkMode ? darkStyles.ProfileName : lightStyles.ProfileName}
        >
          {name}
        </Text>
      )}

      {fontsLoaded && (
        <Text
          style={
            isDarkMode
              ? darkStyles.ProfileUsername
              : lightStyles.ProfileUsername
          }
        >
          {username}
        </Text>
      )}
    </View>
  );
};

export default ProfileHeader;
