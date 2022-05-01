import Constants from "expo-constants";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const updateUsername = async (
    updating: boolean,
    setUpdating: Function,
    newUsername: string,
    setNewUsername: Function
) => {
    if(updating) return;

    if(newUsername.trim().length < 3){
        return{
            success: false,
            error: "Your username should be at least 3 characters long"
        };
    }

    if(newUsername.trim().length > 40){
        return{
            success: false,
            error: "Your username should be at most 40 characters long"
        };
    }

    try{
        setUpdating(true);

        const token = await AsyncStorage.getItem("auth-token");

        const response = await axios({
            method: "PUT",
            url: `${Constants.manifest?.extra?.apiEndpoint}/user/username`,
            data: {
                username: newUsername
            },
            headers: {
                "Content-Type": "application/json",
                "auth-token": token ?? ""
            }
        });

        setUpdating(false);

        setNewUsername("");

        return {
            success: response?.data?.success,
            username: response?.data?.username
        };
    }
    catch(error: any){
        setUpdating(false);
        return {
            success: false,
            error: JSON.stringify(error?.response?.data?.error)
        };
    }
};