import { View, Text, Pressable } from "react-native";
import React from "react";
import { darkStyles, lightStyles } from "./styles";
import { useRecoilValue, useRecoilState } from "recoil";
import { isDarkModeAtom } from "../../atom";
import { userAtom } from "../../atom";
import { isAuthenticatedAtom } from "../../atom";
import type { UserType } from "../../types";
import { useFonts, Manrope_700Bold } from "@expo-google-fonts/manrope";
import { signOut } from "../../helpers/sign-out";

const LogoutSection = () => {
  const isDarkMode = useRecoilValue<boolean>(isDarkModeAtom);

  const [user, setUser] = useRecoilState<UserType>(userAtom);
  const [isAuthenticated, setIsAuthenticated] = useRecoilState<boolean>(isAuthenticatedAtom);

  const [fontsLoaded] = useFonts({ Manrope_700Bold });

  const onSignOutPressed = async () => {
      await signOut(
          setIsAuthenticated,
          setUser
      );
  };

  return (
    <View
      style={
        isDarkMode ? darkStyles.LogoutContainer : lightStyles.LogoutContainer
      }
    >
      <Pressable
        style={isDarkMode ? darkStyles.LogoutButton : lightStyles.LogoutButton}
        onPress={onSignOutPressed}
      >
        {fontsLoaded && (
          <Text
            style={isDarkMode ? darkStyles.LogoutText : lightStyles.LogoutText}
          >
            Logout
          </Text>
        )}
      </Pressable>
    </View>
  );
};

export default LogoutSection;
