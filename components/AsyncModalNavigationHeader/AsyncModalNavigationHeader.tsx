import { View, Text, Pressable, ToastAndroid } from "react-native";
import React from "react";
import { useRecoilValue } from "recoil";
import { Entypo } from "@expo/vector-icons";
import { isDarkModeAtom } from "../../atom/isDarkModeAtom";
import { lightStyles, darkStyles } from "./styles";
import { toastMessage } from "../../helpers/toast-message/toast-message";

interface Props {
  isUpdating: boolean;
  updateStatement: string;
  isModalActive: boolean;
  setIsModalActive: Function;
}

const AsyncModalNavigationHeader = (props: Props) => {
  const { isUpdating, updateStatement, isModalActive, setIsModalActive } = props;

  const isDarkMode = useRecoilValue<boolean>(isDarkModeAtom);

  const onBackButtonClick = () => {
    if (isUpdating) {
      toastMessage("error", "Updating...", updateStatement);
      return;
    }
    setIsModalActive(!isModalActive);
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

export default AsyncModalNavigationHeader;
