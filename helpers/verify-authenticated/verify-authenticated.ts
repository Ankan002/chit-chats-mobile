import AsyncStorage from "@react-native-async-storage/async-storage";

export const verifyIfAuthenticated = async (): Promise<boolean> => {
    const token = await AsyncStorage.getItem("auth-token");

    if(!token) return false;

    return true;
}