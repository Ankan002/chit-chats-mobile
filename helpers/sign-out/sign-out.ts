import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import Constants from "expo-constants";

export const signOut = async (
    setIsAuthenticated: Function,
    setUser: Function,
) => {
    try{
        GoogleSignin.configure({
            webClientId: Constants.manifest?.extra?.webClientId,
        });

        await GoogleSignin.signOut();
        await AsyncStorage.removeItem("auth-token");
        setUser({});
        setIsAuthenticated(false);
    }
    catch(error){
        console.log(error);
        Alert.alert(JSON.stringify(error));
    }
};