import {
  View,
  Text,
  ScrollView,
  TextInput,
  Image,
  Pressable,
  Modal,
  Button,
} from "react-native";
import React, { useState } from "react";
import { darkStyles, lightStyles } from "./styles";
import { useRecoilValue } from "recoil";
import { isDarkModeAtom } from "../../atom/isDarkModeAtom";
import { useFonts, Manrope_500Medium } from "@expo-google-fonts/manrope";
import { FiraCode_500Medium } from "@expo-google-fonts/fira-code";
import DocumentPicker, {
  DocumentPickerResponse,
} from "react-native-document-picker";
import { SearchedUserType } from "../../types";
import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { toastMessage } from "../../helpers/toast-message";
import SearchUser from "../SearchUser";
import ModalNavigationHeader from "../ModalNavigationHeader";
import ModalTriggerButton from "../ModalTriggerButton/ModalTriggerButton";
import TitleHeader from "../TitleHeader";
import ImageThumbnailPreview from "../ImageThumbnailPreview/ImageThumbnailPreview";

//TODO: Extract modals into their own components

const CreateGroup = () => {
  const [fontsLoaded] = useFonts({
    Manrope_500Medium,
    FiraCode_500Medium,
  });

  const isDarkMode = useRecoilValue<boolean>(isDarkModeAtom);

  const [groupName, setGroupName] = useState<string>("");
  const [searchResult, setSearchResult] = useState<Array<SearchedUserType>>([]);
  const [currentImage, setCurrentImage] =
    useState<DocumentPickerResponse | null>(null);
  const [selectUserModalVisible, setSelectUserModalVisible] =
    useState<boolean>(false);
  const [selectImageModalVisible, setSelectImageModalVisible] =
    useState<boolean>(false);

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
    <View
      style={isDarkMode ? darkStyles.FormContainer : lightStyles.FormContainer}
    >
      {fontsLoaded && (
        <Text style={isDarkMode ? darkStyles.LabelText : lightStyles.LabelText}>
          Group Name
        </Text>
      )}

      {fontsLoaded && (
        <TextInput
          style={
            isDarkMode ? darkStyles.NameInputText : lightStyles.NameInputText
          }
          placeholderTextColor="#7E7D80"
          placeholder="Enter Group Name"
          onChangeText={(text) => setGroupName(text)}
          value={groupName}
        />
      )}

      <ModalTriggerButton
        title="Add more friends"
        setModalVisibility={setSelectUserModalVisible}
      />

      {currentImage === null ? (
        <>
          <ImageThumbnailPreview type="non-editable" image={currentImage} />
          <ModalTriggerButton
            title="Select an image"
            setModalVisibility={setSelectImageModalVisible}
          />
        </>
      ) : (
        <ImageThumbnailPreview
          type="editable-modal"
          image={currentImage}
          setModalVisibility={setSelectImageModalVisible}
        />
      )}

      <Modal
        animationType="slide"
        transparent={false}
        visible={selectImageModalVisible}
        onRequestClose={() => setSelectImageModalVisible(false)}
      >
        <View style={isDarkMode ? darkStyles.Modal : lightStyles.Modal}>
          <ModalNavigationHeader
            setModalVisibility={setSelectImageModalVisible}
          />
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

      <Modal
        animationType="slide"
        transparent={false}
        visible={selectUserModalVisible}
        onRequestClose={() => setSelectUserModalVisible(false)}
      >
        <View style={isDarkMode ? darkStyles.Modal : lightStyles.Modal}>
          <ModalNavigationHeader
            setModalVisibility={setSelectUserModalVisible}
          />
          <TitleHeader title="Select Users" />
          <View
            style={
              isDarkMode
                ? darkStyles.SearchUserModalContainer
                : lightStyles.SearchUserModalContainer
            }
          >
            <SearchUser
              type="group"
              searchResult={searchResult}
              setSearchResult={setSearchResult}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CreateGroup;
