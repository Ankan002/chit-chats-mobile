import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";
import { Alert } from "react-native";

export const fetchUser = async(
    userLoading: boolean,
    setUserLoading: Function
) => {
    if(userLoading) return;
    setUserLoading(true);

    try{
        const token = await AsyncStorage.getItem("auth-token");

        const response = await axios.get(`${Constants.manifest?.extra?.apiEndpoint}/user`, {
            headers: {
                "Content-Type": "application/json",
                "auth-token": token ?? ""
            }
        });

        setUserLoading(false);

        console.log(response.data?.user);

        return {
            success: response.data?.success,
            user: response.data?.user
        };
    }
    catch(error: any){
        setUserLoading(false);
        Alert.alert("Fatal Error", JSON.stringify(error?.response?.data?.error));
        await AsyncStorage.removeItem("auth-token");
        return {
            success: false,
            error: JSON.stringify(error?.response?.data?.error)
        };
    };
};