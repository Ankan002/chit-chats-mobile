import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";

export const searchUser = async (
    searching: boolean,
    setSearching: Function,
    keyword: string
) => {
    if(searching) return;

    try{
        setSearching(true);

        const authToken = await AsyncStorage.getItem("auth-token");

        const response = await axios.get(`${Constants?.manifest?.extra?.apiEndpoint ?? ""}/user/search?keyword=${keyword}`, {
            headers: {
                "Content-Type": "application/json",
                "auth-token": authToken ?? ""
            }
        });

        setSearching(false);

        console.log(response.data.data.users);

        return {
            success: response.data.success,
            users: response.data.data.users
        }
    }
    catch(error: any){
        setSearching(false);
        return {
            success: false,
            error: JSON.stringify(error?.response?.data?.error)
        };
    }
}