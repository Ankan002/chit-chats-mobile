import AsyncStorage from "@react-native-async-storage/async-storage";

export const getLastTheme = async (): Promise<boolean> => {
    const darkMode = await AsyncStorage.getItem("dark-mode");

    if(!darkMode) {
        AsyncStorage.setItem("dark-mode", JSON.stringify(false));
        return false;
    }

    return JSON.parse(darkMode);
}