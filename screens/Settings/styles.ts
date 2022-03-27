import { StyleSheet, Platform, StatusBar } from "react-native";

const styles = (isDarkMode: boolean) => {
  return StyleSheet.create({
    AndroidSafeArea: {
      flex: 1,
      backgroundColor: isDarkMode ? "#0A0911" : "#F6F8FA",
      paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
    WelcomeText: {
      color: isDarkMode ? "#F6F8FA" : "#0A0911"
    }
  });
};

export const lightStyles = styles(false);
export const darkStyles = styles(true);