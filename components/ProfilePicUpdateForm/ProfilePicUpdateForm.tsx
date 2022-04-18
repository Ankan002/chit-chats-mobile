import { View, Text, Pressable, Image, ActivityIndicator } from "react-native";
import React, { useState } from "react";

import { useRecoilValue, useRecoilState } from "recoil";
import { isDarkModeAtom } from "../../atom";
import { userAtom } from "../../atom";
import { FontAwesome, Feather } from "@expo/vector-icons";
import { updateProfilePic } from "../../helpers/update-profile-pic";
import {
  useFonts,
  Manrope_600SemiBold,
  Manrope_700Bold,
} from "@expo-google-fonts/manrope";
import DocumentPicker, {
  DocumentPickerResponse,
} from "react-native-document-picker";
import { toastMessage } from "../../helpers/toast-message";
import { darkStyles, lightStyles } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { UserType } from "../../types";

interface Props {
  isUpdating: boolean;
  setIsUpdating: Function;
}

const ProfilePicUpdateForm = (props: Props) => {
  const { isUpdating, setIsUpdating } = props;

  const [fontsLoaded] = useFonts({ Manrope_600SemiBold, Manrope_700Bold });
  const isDarkMode = useRecoilValue<boolean>(isDarkModeAtom);
  const [user, setUser] = useRecoilState<UserType>(userAtom);
  const [currentImage, setCurrentImage] =
    useState<DocumentPickerResponse | null>(null);

  const navigator = useNavigation();

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

  const onUpdateClick = async() => {
    const response = await updateProfilePic(isUpdating, setIsUpdating, currentImage, user.image ?? "");

    if(!response?.success){
        toastMessage("error", "Fatal Error", response?.error);
        setCurrentImage(null);
        return;
    }

    setUser({
        ...user,
        image: response?.image
    });

    setCurrentImage(null);
    toastMessage("success", "Updated", "Profile picture updated successfully");
    if(navigator.canGoBack()) navigator.goBack();
  }

  return (
    <View
      style={isDarkMode ? darkStyles.FormContainer : lightStyles.FormContainer}
    >
      {currentImage ? (
        <Pressable
          style={
            isDarkMode ? darkStyles.ImageContainer : lightStyles.ImageContainer
          }
          onPress={onImageSelect}
        >
          <Image
            source={{ uri: currentImage.uri }}
            style={
              isDarkMode ? darkStyles.ProfileImage : lightStyles.ProfileImage
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
              Pick New Profile Picture
            </Text>
          )}
        </Pressable>
      )}

      {currentImage && (
        <View
          style={
            isDarkMode
              ? darkStyles.DeleteButtonContainer
              : lightStyles.DeleteButtonContainer
          }
        >
          <Pressable
            style={
              isDarkMode ? darkStyles.DeleteButton : lightStyles.DeleteButton
            }
            onPress={onRemoveImageClick}
          >
            <Feather name="trash-2" size={26} color="#FD6438" />
          </Pressable>
        </View>
      )}

      <View
        style={
          isDarkMode
            ? darkStyles.UpdateButtonContainer
            : lightStyles.UpdateButtonContainer
        }
      >
        <Pressable
          style={
            isDarkMode ? darkStyles.UpdateButton : lightStyles.UpdateButton
          }
          onPress={onUpdateClick}
        >
          {isUpdating ? (
            <ActivityIndicator
              size="large"
              color={isDarkMode ? "#0A0911" : "#F6F8FA"}
            />
          ) : (
            <>
              {fontsLoaded && (
                <Text
                  style={
                    isDarkMode ? darkStyles.UpdateText : lightStyles.UpdateText
                  }
                >
                  Update Picture
                </Text>
              )}
            </>
          )}
        </Pressable>
      </View>
    </View>
  );
};

export default ProfilePicUpdateForm;
