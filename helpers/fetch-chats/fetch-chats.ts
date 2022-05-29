import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import Constants from 'expo-constants';

export const fetchChats = async(isChatsLoading: boolean, setIsChatsLoading: Function) => {
    if(isChatsLoading) return {
        success: false,
        error: "Hold on loading the chats"
    };

    setIsChatsLoading(true);

    try{
        const token = await AsyncStorage.getItem("auth-token");

        const chats = await axios.get(`${Constants?.manifest?.extra?.apiEndpoint}/chat`, {
            headers: {
                "Content-Type": "application/json",
                "auth-token": token ?? ""
            }
        });

        // console.log(chats.data);

        setIsChatsLoading(false);

        return {
            success: chats.data.success,
            chats: chats.data.data.chats
        }
    }
    catch(error: any){
        console.log(JSON.stringify(error?.response?.data?.error));
        setIsChatsLoading(false);

        return {
            success: false,
            error: JSON.stringify(error?.response?.data?.error)
        }
    }
}
