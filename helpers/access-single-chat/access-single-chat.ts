import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from 'expo-constants';

export const accessSingleChat = async(userId: string, isConnecting: boolean, setIsConnecting: Function) => {
    if(isConnecting) return {
        success: false,
        error: "Connecting... hold on..."
    };

    setIsConnecting(true);
    try{
        const token = await AsyncStorage.getItem("auth-token");

        const chat = await axios.post(`${Constants?.manifest?.extra?.apiEndpoint}/chat`, {
            user: userId
        }, {
            headers: {
                "Content-Type": "application/json",
                "auth-token": token ?? "",
            }
        })

        setIsConnecting(false);

        return {
            success: chat.data.success,
            chat: chat.data.data.chat
        }
    }
    catch(error: any){
        setIsConnecting(false);
        return {
            success: false,
            error: JSON.stringify(error?.response?.data?.error)
        };
    }
}
