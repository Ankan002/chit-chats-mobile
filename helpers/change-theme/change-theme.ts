import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const changeTheme = async (
  isDarkMode: boolean,
  setIsDarkMode: Function
) => {
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
