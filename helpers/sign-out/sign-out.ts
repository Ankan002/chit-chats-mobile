import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import Constants from "expo-constants";

export const signOut = async (
    setIsAuthenticated: Function,
    setUser: Function,
    setGroupChats: Function,
    setSingleChats: Function,
    setNotificationChats: Function
) => {
    try{
        GoogleSignin.configure({
            webClientId: Constants.manifest?.extra?.webClientId,
        });

        await GoogleSignin.signOut();
        await AsyncStorage.removeItem("auth-token");
        setGroupChats([]);
        setSingleChats([]);
        setNotificationChats(new Set());
        setUser({});
        setIsAuthenticated(false);
    }
    catch(error){
        console.log(error);
        Alert.alert(JSON.stringify(error));
    }
};