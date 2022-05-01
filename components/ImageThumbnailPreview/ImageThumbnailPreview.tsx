import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import { useRecoilValue } from "recoil";
import { isDarkModeAtom } from "../../atom/isDarkModeAtom";
import { darkStyles, lightStyles } from "./styles";
import { DocumentPickerResponse } from "react-native-document-picker";
import { FiraCode_400Regular } from "@expo-google-fonts/fira-code";
import { useFonts, Manrope_500Medium } from "@expo-google-fonts/manrope";

type Props =
  | {
      type: "editable-modal";
      image: DocumentPickerResponse | null;
      setModalVisibility: Function;
    }
  | {
      type: "non-editable";
      image: DocumentPickerResponse | null;
    };

const ImageThumbnailPreview = (props: Props) => {
  const isDarkMode = useRecoilValue<boolean>(isDarkModeAtom);

  const [fontLoaded] = useFonts({ Manrope_500Medium, FiraCode_400Regular });

  const onChangeClick = () => {
    if (props.type === "editable-modal") {
      props.setModalVisibility(true);
    }
  };

  return (
    <View
      style={isDarkMode ? darkStyles.MainContainer : lightStyles.MainContainer}
    >
      {props.image === null && (
        <View
          style={
            isDarkMode ? darkStyles.EmptyContainer : lightStyles.EmptyContainer
          }
        >
          {fontLoaded && (
            <Text
              style={isDarkMode ? darkStyles.EmptyText : lightStyles.EmptyText}
            >
              Please Select an Image to see the preview here
            </Text>
          )}
        </View>
      )}

      {props.type === "editable-modal" && props.image !== null && (
        <Pressable
          style={
            isDarkMode
              ? darkStyles.ThumbnailContainer
              : lightStyles.ThumbnailContainer
          }
          onPress={onChangeClick}
        >
          <View
            style={
              isDarkMode
                ? darkStyles.ImageContainer
                : lightStyles.ImageContainer
            }
          >
            <Image
              source={{ uri: props.image.uri }}
              style={
                isDarkMode ? darkStyles.ImageStyle : lightStyles.ImageContainer
              }
            />
          </View>

          <View
            style={
              isDarkMode
                ? darkStyles.DetailsContainer
                : lightStyles.DetailsContainer
            }
          >
            {fontLoaded && (
              <Text
                style={
                  isDarkMode
                    ? darkStyles.AssertiveText
                    : lightStyles.AssertiveText
                }
              >
                Thumbnail Preview
              </Text>
            )}

            {fontLoaded && (
              <Text
                style={isDarkMode ? darkStyles.InfoText : lightStyles.InfoText}
              >
                Click here to change image
              </Text>
            )}
          </View>
        </Pressable>
      )}

      {props.type === "non-editable" && props.image !== null && (
        <View
          style={
            isDarkMode
              ? darkStyles.ThumbnailContainer
              : lightStyles.ThumbnailContainer
          }
        >
          <View
            style={
              isDarkMode
                ? darkStyles.ImageContainer
                : lightStyles.ImageContainer
            }
          >
            <Image
              source={{ uri: props.image.uri }}
              style={
                isDarkMode ? darkStyles.ImageStyle : lightStyles.ImageContainer
              }
            />
          </View>

          <View
            style={
              isDarkMode
                ? darkStyles.DetailsContainer
                : lightStyles.DetailsContainer
            }
          >
            {fontLoaded && (
              <Text
                style={
                  isDarkMode
                    ? darkStyles.AssertiveText
                    : lightStyles.AssertiveText
                }
              >
                Thumbnail Preview
              </Text>
            )}
          </View>
        </View>
      )}
    </View>
  );
};

export default ImageThumbnailPreview;
