import { View, Text, Pressable } from "react-native";
import React from "react";
import { darkStyles, lightStyles } from "./styles";
import { useRecoilValue } from "recoil";
import { isDarkModeAtom } from "../../atom";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import { toastMessage } from "../../helpers/toast-message";

interface Props {
  loading: boolean;
}

const NavigationHeader = (props: Props) => {
  const { loading } = props;
  const isDarkMode = useRecoilValue<boolean>(isDarkModeAtom);
  const navigation = useNavigation();

  const onBackButtonClick = () => {
    if (loading) {
      toastMessage(
        "error",
        "Hold On ✋",
        "We are performing the action that you requested!!"
      );
      return;
    }
    if (navigation.canGoBack()) navigation.goBack();
  };

  return (
    <View style={isDarkMode ? darkStyles.Container : lightStyles.Container}>
      <Pressable
        style={isDarkMode ? darkStyles.BackButton : lightStyles.BackButton}
        onPress={onBackButtonClick}
      >
        <Entypo
          name="chevron-left"
          size={24}
          color={isDarkMode ? "#FDFEFF" : "#171725"}
        />
      </Pressable>
    </View>
  );
};

export default NavigationHeader;
