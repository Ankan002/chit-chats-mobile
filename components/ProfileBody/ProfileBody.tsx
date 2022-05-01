import { View, Text, ScrollView, Pressable } from "react-native";
import React from "react";
import { useRecoilValue } from "recoil";
import { isDarkModeAtom } from "../../atom";
import { darkStyles, lightStyles } from "./styles";
import {
  useFonts,
  Manrope_500Medium,
  Manrope_700Bold,
} from "@expo-google-fonts/manrope";
import { FiraCode_500Medium } from "@expo-google-fonts/fira-code";

interface Props {
  email: string;
  tagline: string;
  loggedInUserId: string;
  idQueried: string;
}

const ProfileBody = (props: Props) => {
  const { email, tagline, loggedInUserId, idQueried } = props;

  const [fontsLoaded] = useFonts({
    Manrope_500Medium,
    Manrope_700Bold,
    FiraCode_500Medium,
  });
  const isDarkMode = useRecoilValue<boolean>(isDarkModeAtom);

  return (
    <ScrollView
      style={isDarkMode ? darkStyles.BodyContainer : lightStyles.BodyContainer}
    >
      {fontsLoaded && (
        <Text style={isDarkMode ? darkStyles.LabelText : lightStyles.LabelText}>
          Email
        </Text>
      )}

      {fontsLoaded && (
        <Text
          style={isDarkMode ? darkStyles.DetailsText : lightStyles.DetailsText}
        >
          {email}
        </Text>
      )}

      {fontsLoaded && (
        <Text style={isDarkMode ? darkStyles.LabelText : lightStyles.LabelText}>
          Tagline
        </Text>
      )}

      {fontsLoaded && (
        <Text
          style={isDarkMode ? darkStyles.DetailsText : lightStyles.DetailsText}
        >
          {tagline}
        </Text>
      )}

      {loggedInUserId !== idQueried && (
        <View
          style={
            isDarkMode
              ? darkStyles.ButtonContainer
              : lightStyles.ButtonContainer
          }
        >
          <Pressable
            style={
              isDarkMode ? darkStyles.ConnectButton : lightStyles.ConnectButton
            }
          >
            {fontsLoaded && (
              <Text
                style={
                  isDarkMode ? darkStyles.ConnectText : lightStyles.ConnectText
                }
              >
                Connect Now
              </Text>
            )}
          </Pressable>
        </View>
      )}
    </ScrollView>
  );
};

export default ProfileBody;
