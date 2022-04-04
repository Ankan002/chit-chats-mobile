import {
  View,
  Text,
  Button,
  Alert,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { lightStyles, darkStyles } from "./styles";

import { useRecoilValue } from "recoil";
import { isDarkModeAtom } from "../../atom";
import { StatusBar } from "expo-status-bar";
import SettingsHeader from "../../components/SettingsHeader";
import SettingsBody from "../../components/SettingsBody";
import { userAtom } from "../../atom/userAtom";
import { UserType } from "../../types";
import LogoutSection from "../../components/LogoutSection";
import { userLoadingAtom } from "../../atom";

const Settings = () => {
  const isDarkMode = useRecoilValue<boolean>(isDarkModeAtom);
  const user = useRecoilValue<UserType>(userAtom);
  const isUserLoading = useRecoilValue<boolean>(userLoadingAtom);

  //Used for testing purposes
  // const loading = true;

  return (
    <SafeAreaView
      style={
        isDarkMode ? darkStyles.AndroidSafeArea : lightStyles.AndroidSafeArea
      }
    >
      {isUserLoading ? (
        <View
          style={isDarkMode ? darkStyles.LoadingView : lightStyles.LoadingView}
        >
          <ActivityIndicator size="large" color="#FD6438" />
        </View>
      ) : (
        <>
          <StatusBar style={isDarkMode ? "light" : "dark"} />
          <SettingsHeader
            image={user?.image ?? ""}
            name={user?.name ?? ""}
            username={user.username ?? ""}
          />
          <SettingsBody />
          <View
            style={
              isDarkMode ? darkStyles.LoginSection : lightStyles.LoginSection
            }
          >
            <LogoutSection />
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

export default Settings;
