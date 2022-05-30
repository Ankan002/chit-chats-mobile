import { View, Pressable } from "react-native";
import React from "react";
import { useRecoilValue } from "recoil";
import { isDarkModeAtom } from "../../atom/isDarkModeAtom";
import { darkStyles, lightStyles } from "./styles";
import { Entypo } from "@expo/vector-icons";

interface Props {
  setModalVisibility: Function;
}

const SimpleModalNavigationHeader = (props: Props) => {
  const { setModalVisibility } = props;

  const isDarkMode = useRecoilValue<boolean>(isDarkModeAtom);

  const onBackButtonClick = () => {
    setModalVisibility(false);
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

export default SimpleModalNavigationHeader;
