import { View, Text, Pressable, Image, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import { lightStyles, darkStyles } from "./styles";
import { useRecoilValue, useRecoilState } from "recoil";
import { isDarkModeAtom } from "../../atom/isDarkModeAtom";
import DocumentPicker, {
  DocumentPickerResponse,
} from "react-native-document-picker";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { Manrope_500Medium, useFonts, Manrope_700Bold } from "@expo-google-fonts/manrope";
import { toastMessage } from "../../helpers/toast-message";
import { GroupChatType } from "../../types";
import ImageThumbnailPreview from "../ImageThumbnailPreview";
import { updateGroupImage, updateGroupImageInState } from "../../helpers/update-group-image";
import { groupChatsAtom } from "../../atom/groupChatsAtom";

interface Props {
  currentGroupChat: GroupChatType;
  setCurrentGroupChat: Function;
  isUpdating: boolean;
  setIsUpdating: Function;
  isModalVisible: boolean;
  setIsModalVisible: Function;
}

const GroupImageUpdateForm = (props: Props) => {
  const { currentGroupChat, setCurrentGroupChat, isUpdating, setIsUpdating, isModalVisible, setIsModalVisible } =
    props;

  const [fontsLoaded] = useFonts({
    Manrope_500Medium,
    Manrope_700Bold
  });

  const isDarkMode = useRecoilValue<boolean>(isDarkModeAtom);
  const [currentImage, setCurrentImage] =
    useState<DocumentPickerResponse | null>(null);
  const [groupChats, setGroupChats] =
    useRecoilState<Array<GroupChatType>>(groupChatsAtom);

  const onImageSelect = async () => {
    try {
      const image = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.images],
      });

      setCurrentImage(image);
    } catch (error) {
      if (DocumentPicker.isCancel(error)) return;
      toastMessage("error", "Fatal Error", `${error}`);
      return;
    }
  };

  const onRemoveImageClick = () => {
    setCurrentImage(null);
  };

  const onUpdateGroupImageClick = async() => {
    const response = await updateGroupImage(isUpdating, setIsUpdating, currentImage, currentGroupChat._id);

    if(!response.success){
      toastMessage("error", "Update Failed", response.error);
      return;
    }

    const updatedImage = response.image;

    updateGroupImageInState(updatedImage, currentGroupChat._id, groupChats, setGroupChats);

    setCurrentGroupChat({
      ...currentGroupChat,
      groupImage: updatedImage
    });

    setCurrentImage(null);

    toastMessage("success", "Yeah...", "Group Image Updated...");

    setIsModalVisible(!isModalVisible);
  }

  return (
    <View
      style={isDarkMode ? darkStyles.FormContainer : lightStyles.FormContainer}
    >
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
                isDarkMode
                  ? darkStyles.NewGroupImage
                  : lightStyles.NewGroupImage
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
                Pick New Group Image
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
      {currentImage && (
        <ImageThumbnailPreview type="non-editable" image={currentImage} />
      )}

      <View style={isDarkMode ? darkStyles.UpdateButtonContainer : lightStyles.UpdateButtonContainer}>
          <Pressable style={isDarkMode ? darkStyles.UpdateButton : lightStyles.UpdateButton} onPress={onUpdateGroupImageClick}>
              {
                  isUpdating ? (
                      <ActivityIndicator size="large" color={isDarkMode ? "#0A0911" : "#F6F8FA"} />
                  ) : (
                      <>
                      {
                          fontsLoaded && (
                            <Text style={isDarkMode ? darkStyles.UpdateText : lightStyles.UpdateText}>
                                Update Group Image
                            </Text>
                          )
                      }
                      </>
                  )
              }
          </Pressable>
      </View>
    </View>
  );
};

export default GroupImageUpdateForm;
