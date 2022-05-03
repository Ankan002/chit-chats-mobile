import { View, Text, Modal, Image, Pressable } from "react-native";
import React from "react";
import { useRecoilValue } from "recoil";
import { isDarkModeAtom } from "../../atom/isDarkModeAtom";
import { darkStyles, lightStyles } from "./styles";
import DocumentPicker, {
  DocumentPickerResponse,
} from "react-native-document-picker";
import ModalNavigationHeader from "../ModalNavigationHeader/ModalNavigationHeader";
import TitleHeader from "../TitleHeader/TitleHeader";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { Manrope_500Medium, useFonts } from "@expo-google-fonts/manrope";
import { toastMessage } from "../../helpers/toast-message";

interface Props {
  isModalVisible: boolean;
  setModalVisibility: Function;
  currentImage: DocumentPickerResponse | null;
  setCurrentImage: Function;
}

const ImagePickerModal = (props: Props) => {
  const { isModalVisible, setModalVisibility, currentImage, setCurrentImage } =
    props;

  const isDarkMode = useRecoilValue<boolean>(isDarkModeAtom);
  const [fontsLoaded] = useFonts({
    Manrope_500Medium,
  });

  const onImageSelect = async () => {
    try {
      const file = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.images],
      });

      setCurrentImage(file);
    } catch (error) {
      if (DocumentPicker.isCancel(error)) return;
      toastMessage("error", "Fatal Error", `${error}`);
      return;
    }
  };

  const onRemoveImageClick = () => {
    setCurrentImage(null);
  };

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={isModalVisible}
      onRequestClose={() => setModalVisibility(false)}
    >
      <View style={isDarkMode ? darkStyles.Modal : lightStyles.Modal}>
        <ModalNavigationHeader setModalVisibility={setModalVisibility} />
        <TitleHeader title="Select Image" />
        <View
          style={
            isDarkMode
              ? darkStyles.MainImageContainer
              : lightStyles.MainImageContainer
          }
        >
          {currentImage ? (
            <Pressable
              style={
                isDarkMode
                  ? darkStyles.ImageContainer
                  : lightStyles.ImageContainer
              }
              onPress={onImageSelect}
            >
              <Image
                source={{ uri: currentImage.uri }}
                style={
                  isDarkMode ? darkStyles.GroupImage : lightStyles.GroupImage
                }
              />
            </Pressable>
          ) : (
            <Pressable
              style={
                isDarkMode
                  ? darkStyles.EmptyImageContainer
                  : lightStyles.EmptyImageContainer
              }
              onPress={onImageSelect}
            >
              <FontAwesome
                name="image"
                size={90}
                color={isDarkMode ? "#F6F8FA" : "#0A0911"}
              />
              {fontsLoaded && (
                <Text
                  style={
                    isDarkMode
                      ? darkStyles.EmptyImageContainerText
                      : lightStyles.EmptyImageContainerText
                  }
                >
                  Pick New Group Picture
                </Text>
              )}
            </Pressable>
          )}
        </View>

        <View
          style={
            isDarkMode
              ? darkStyles.DeleteImageButtonContainer
              : lightStyles.DeleteImageButtonContainer
          }
        >
          {currentImage && (
            <Pressable
              style={
                isDarkMode
                  ? darkStyles.DeleteImageButton
                  : lightStyles.DeleteImageButton
              }
              onPress={onRemoveImageClick}
            >
              <Feather name="trash-2" size={26} color="#FD6438" />
            </Pressable>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default ImagePickerModal;
