import {
  View,
  Text,
  ScrollView,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { isDarkModeAtom } from "../../atom";
import { darkStyles, lightStyles } from "./styles";
import { accessSingleChat } from "../../helpers/access-single-chat";
import {
  useFonts,
  Manrope_500Medium,
  Manrope_700Bold,
} from "@expo-google-fonts/manrope";
import { singleChatsAtom } from "../../atom/singleChatsAtom"
import { FiraCode_500Medium } from "@expo-google-fonts/fira-code";
import { SingleChatType } from "../../types";
import { toastMessage } from '../../helpers/toast-message/toast-message';
import { useNavigation } from "@react-navigation/core";
import { isUserConnected } from '../../helpers/is-user-connected/is-user-connected';

interface Props {
  email: string;
  tagline: string;
  loggedInUserId: string;
  idQueried: string;
  isConnecting: boolean;
  setIsConnecting: Function;
}

const ProfileBody = (props: Props) => {
  const {
    email,
    tagline,
    loggedInUserId,
    idQueried,
    isConnecting,
    setIsConnecting,
  } = props;

  const [fontsLoaded] = useFonts({
    Manrope_500Medium,
    Manrope_700Bold,
    FiraCode_500Medium,
  });
  const isDarkMode = useRecoilValue<boolean>(isDarkModeAtom);
  const [singleChats, setSingleChats] = useRecoilState<Array<SingleChatType>>(singleChatsAtom);
  const navigation = useNavigation<any>();

  const onConnectClick = async() => {
    const response = await accessSingleChat(props.idQueried, isConnecting, setIsConnecting);

    if(response.success === false){
      toastMessage("error", "Error", `${response.error}`);
      return;
    }

    const isUserAlreadyConnected = isUserConnected(singleChats, response.chat._id);

    if(isUserAlreadyConnected){
      navigation.navigate("SingleChat", {chat: response.chat});
      return;
    }

    setSingleChats([response.chat, ...singleChats]);

    navigation.navigate("SingleChat", {chat: response.chat});
  };

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

      {loggedInUserId !== idQueried && (
        <View
          style={
            isDarkMode
              ? darkStyles.ButtonContainer
              : lightStyles.ButtonContainer
          }
        >
          <Pressable
            style={
              isDarkMode ? darkStyles.ConnectButton : lightStyles.ConnectButton
            }
            onPress={onConnectClick}
          >
            {fontsLoaded && (
              <>
                {isConnecting ? (
                  <ActivityIndicator
                    size="large"
                    color={isDarkMode ? "#0A0911" : "#F6F8FA"}
                  />
                ) : (
                  <Text
                    style={
                      isDarkMode
                        ? darkStyles.ConnectText
                        : lightStyles.ConnectText
                    }
                  >
                    Connect Now
                  </Text>
                )}
              </>
            )}
          </Pressable>
        </View>
      )}
    </ScrollView>
  );
};

export default ProfileBody;
