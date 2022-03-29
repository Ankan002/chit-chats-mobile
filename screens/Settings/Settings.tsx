import { View, Text, Button, Alert } from "react-native";
import React from "react";
import { lightStyles, darkStyles } from "./styles";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { RecoilState, useRecoilState } from "recoil";
import { isAuthenticatedAtom } from "../../atom";
import Constants from "expo-constants";
import { isDarkModeAtom } from "../../atom";
import { StatusBar } from "expo-status-bar";
import SettingsHeader from "../../components/SettingsHeader";
import { userAtom } from "../../atom/userAtom";
import { UserType } from "../../types";

const Settings = () => {
  GoogleSignin.configure({
    webClientId: Constants.manifest?.extra?.webClientId,
  });

  const [isAuthenticated, setIsAuthenticated] =
    useRecoilState<boolean>(isAuthenticatedAtom);
  const [isDarkMode, setIsDarkMode] = useRecoilState<boolean>(isDarkModeAtom);
  const [user, setUser] = useRecoilState<any>(userAtom);

  const onSignOutClick = async () => {
    try {
      await GoogleSignin.signOut();
      await AsyncStorage.removeItem("auth-token");
      setIsAuthenticated(false);
    } catch (error) {
      console.log(error);
      Alert.alert(JSON.stringify(error));
    }
  };

  const onThemeChangeClick = async () => {
    try {
      if (isDarkMode) {
        setIsDarkMode(false);
        await AsyncStorage.setItem("dark-mode", JSON.stringify(false));
        return;
      }

      setIsDarkMode(true);
      await AsyncStorage.setItem("dark-mode", JSON.stringify(true));
    } catch (error) {
      console.log(error);
      Alert.alert(JSON.stringify(error));
    }
  };

  return (
    <View
      style={
        isDarkMode ? darkStyles.AndroidSafeArea : lightStyles.AndroidSafeArea
      }
    >
      <StatusBar style={isDarkMode ? "light" : "dark"} />
      <SettingsHeader
        isDarkMode={isDarkMode}
        image={user?.id}
        name={user.name}
        username={user.username}
      />
      <Button title="SignOut" onPress={onSignOutClick} />
      <Button
        title={isDarkMode ? "Change to Light Mode" : "Change to Dark Mode"}
        onPress={onThemeChangeClick}
      />
    </View>
  );
};

export default Settings;
