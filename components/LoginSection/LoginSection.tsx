import { View, Text, Pressable, Alert, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { isDarkModeAtom } from "../../atom";
import { darkStyles, lightStyles } from "./styles";
import { FontAwesome } from "@expo/vector-icons";
import { Roboto_400Regular, useFonts } from "@expo-google-fonts/roboto";
import { SignIn } from "../../helpers/sign-in";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { isAuthenticatedAtom } from "../../atom";

const LoginSection = () => {
  const isDarkMode = useRecoilValue<boolean>(isDarkModeAtom);
  const [fontsLoaded] = useFonts({ Roboto_400Regular });
  const [isAuthenticated, setIsAuthenticated] =
    useRecoilState<boolean>(isAuthenticatedAtom);

  const [isAuthenticating, setIsAuthenticating] = useState<boolean>(false);

  const onSignInClick = async () => {
    if (isAuthenticating) return;

    setIsAuthenticating(true);
    const response = await SignIn();

    if(!response.success && !response.error){
      setIsAuthenticating(false);
      return;
    }

    if (!response.success) {
      Alert.alert(response.error ?? "");
      setIsAuthenticating(false);
      return;
    }

    await AsyncStorage.setItem("auth-token", response.token ?? "");
    setIsAuthenticated(true);

    setIsAuthenticating(false);
  };

  return (
    <View
      style={isDarkMode ? darkStyles.LoginSection : lightStyles.LoginSection}
    >
      <Pressable
        style={isDarkMode ? darkStyles.LoginButton : lightStyles.LoginButton}
        onPress={onSignInClick}
      >
        <FontAwesome
          name="google"
          size={24}
          color={isDarkMode ? "#000000" : "#FAFAFC"}
        />
        {fontsLoaded && (
          <Text
            style={isDarkMode ? darkStyles.LoginText : lightStyles.LoginText}
          >
            Login With Google
          </Text>
        )}
      </Pressable>
      {isAuthenticating && (
        <ActivityIndicator
          size="large"
          color="#FD6438"
          style={
            isDarkMode ? darkStyles.LoadingStyle : lightStyles.LoadingStyle
          }
        />
      )}
    </View>
  );
};

export default LoginSection;
