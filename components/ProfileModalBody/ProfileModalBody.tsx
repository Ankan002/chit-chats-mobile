import { Text, ScrollView } from "react-native";
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
}

const ProfileModalBody = (props: Props) => {
  const { email, tagline } = props;

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
    </ScrollView>
  );
};

export default ProfileModalBody;
