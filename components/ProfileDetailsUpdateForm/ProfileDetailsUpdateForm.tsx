import {
  View,
  Text,
  ScrollView,
  TextInput,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { darkStyles, lightStyles } from "./styles";
import { useRecoilValue, useRecoilState } from "recoil";
import { isDarkModeAtom } from "../../atom";
import { userAtom } from "../../atom";
import {
  useFonts,
  Manrope_500Medium,
  Manrope_700Bold,
} from "@expo-google-fonts/manrope";
import { FiraCode_500Medium } from "@expo-google-fonts/fira-code";
import { updateUsername } from "../../helpers/update-username";
import { toastMessage } from "../../helpers/toast-message";
import { useNavigation } from "@react-navigation/core";

import type { UserType } from "../../types";
import { updateTagline } from "../../helpers/update-tagline";

interface Props {
  type: "username" | "tagline";
  updating: boolean;
  setUpdating: Function;
}

const ProfileDetailsUpdateForm = (props: Props) => {
  const { type, updating, setUpdating } = props;

  const [fontsLoaded] = useFonts({
    Manrope_500Medium,
    FiraCode_500Medium,
    Manrope_700Bold,
  });

  const isDarkMode = useRecoilValue<boolean>(isDarkModeAtom);
  const [user, setUser] = useRecoilState<UserType>(userAtom);
  const [newText, setNewText] = useState<string>("");
  const navigation = useNavigation();

  const onUpdateClick = async() => {
      if(type === "username"){
          const response = await updateUsername(updating, setUpdating, newText, setNewText);

          if(!response?.success){
            toastMessage("error", "Fatal Error", `${response?.error}`);
            return;
          }

          setUser({...user, username: response?.username});
          toastMessage("success", "Username Updated", `New Username ${response?.username}`);
          if (navigation.canGoBack()) navigation.goBack();
      }
      else if(type === "tagline"){
          const response = await updateTagline(updating, setUpdating, newText, setNewText);

          if(!response?.success){
            toastMessage("error", "Fatal Error", `${response?.error}`);
            return;
          }

          setUser({...user, tagline: response?.tagline});
          toastMessage("success", "Username Updated", `New Username ${response?.tagline}`);
          if (navigation.canGoBack()) navigation.goBack();
      }
  }

  return (
    <View
      style={isDarkMode ? darkStyles.FormContainer : lightStyles.FormContainer}
    >
      <ScrollView>
        {fontsLoaded && (
          <Text
            style={
              isDarkMode
                ? darkStyles.FieldLabelText
                : lightStyles.FieldLabelText
            }
          >
            Old {type}
          </Text>
        )}

        {fontsLoaded && (
          <Text
            style={
              isDarkMode ? darkStyles.PreviousText : lightStyles.PreviousText
            }
          >
            {type === "username" && user.username}
            {type === "tagline" && user.tagline}
          </Text>
        )}

        {fontsLoaded && (
          <Text
            style={
              isDarkMode
                ? darkStyles.FieldLabelText
                : lightStyles.FieldLabelText
            }
          >
            New {type}
          </Text>
        )}

        {fontsLoaded && (
          <TextInput
            style={isDarkMode ? darkStyles.NewText : lightStyles.NewText}
            placeholder={
              type === "username" ? "Enter new Username" : "Enter new Tagline"
            }
            onChangeText={setNewText}
            placeholderTextColor="#7E7D80"
            value={newText}
          />
        )}
      </ScrollView>

      <View
        style={
          isDarkMode ? darkStyles.ButtonContainer : lightStyles.ButtonContainer
        }
      >
        <Pressable
          style={
            isDarkMode ? darkStyles.UpdateButton : lightStyles.UpdateButton
          }
          onPress={onUpdateClick}
        >
          {updating ? (
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
                  Update {type}
                </Text>
              )}
            </>
          )}
        </Pressable>
      </View>
    </View>
  );
};

export default ProfileDetailsUpdateForm;
