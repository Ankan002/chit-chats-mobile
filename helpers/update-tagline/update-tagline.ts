import Constants from "expo-constants";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const updateTagline = async (
    updating: boolean,
    setUpdating: Function,
    newTagline: string,
    setNewTagline: Function
) => {
    if(updating) return;

    if(newTagline.trim().length < 20){
        return{
            success: false,
            error: "Your tagline should be at least 20 characters long"
        };
    }

    if(newTagline.trim().length > 150){
        return{
            success: false,
            error: "Your tagline should be at most 150 characters long"
        };
    }

    try{
        setUpdating(true);

        const token = await AsyncStorage.getItem("auth-token");

        const response = await axios({
            method: "PUT",
            url: `${Constants.manifest?.extra?.apiEndpoint}/user/tagline`,
            data: {
                tagline: newTagline
            },
            headers: {
                "Content-Type": "application/json",
                "auth-token": token ?? ""
            }
        });

        setUpdating(false);

        setNewTagline("");

        return {
            success: response?.data?.success,
            tagline: response?.data?.tagline
        }
    }
    catch(error: any){
        setUpdating(false);
        return {
            success: false,
            error: JSON.stringify(error?.response?.data?.error)
        };
    }
};