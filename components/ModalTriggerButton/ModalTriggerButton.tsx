import { View, Text, Pressable } from "react-native";
import React from "react";
import { useRecoilValue } from "recoil";
import { isDarkModeAtom } from "../../atom/isDarkModeAtom";
import { useFonts, Manrope_500Medium } from "@expo-google-fonts/manrope";
import { darkStyles, lightStyles } from "./styles";

interface Props {
  title: string;
  setModalVisibility: Function;
}

const ModalTriggerButton = (props: Props) => {
  const { title, setModalVisibility } = props;
  const isDarkMode = useRecoilValue<boolean>(isDarkModeAtom);
  const [fontsLoaded] = useFonts({ Manrope_500Medium });

  const onActivateModalClick = () => {
    setModalVisibility(true);
  };

  return (
    <Pressable
      style={isDarkMode ? darkStyles.Button : lightStyles.Button}
      onPress={onActivateModalClick}
    >
      {fontsLoaded && (
        <Text
          style={isDarkMode ? darkStyles.ButtonText : darkStyles.ButtonText}
        >
          {title}
        </Text>
      )}
    </Pressable>
  );
};

export default ModalTriggerButton;
