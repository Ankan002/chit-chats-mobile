import axios from "axios";
import AsyncStoage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";
import { GroupChatType } from "../../types";

export const leaveGroup = async(
    isLeaving: boolean,
    setIsLeaving: Function,
    group: GroupChatType,
    loggedInUserId: string
) => {
    if(isLeaving) return {
        success: false,
        error: "You are already leaving the group... hold on while I kick you out..."
    };

    if(group.groupAdmin._id === loggedInUserId) return {
        success: false,
        error: "An admin cannot leave the group"
    };

    setIsLeaving(true);

    try{
        const token = await AsyncStoage.getItem("auth-token");

        const response = await axios.put(`${Constants?.manifest?.extra?.apiEndpoint}/chat/group/leave-group`, {
            groupId: group._id
        }, {
            headers: {
                "Content-Type": "application/json",
                "auth-token": token ?? ""
            }
        });

        console.log(response.data);

        setIsLeaving(false);

        return {
            success: response.data.success
        };
    }
    catch(error: any){
        console.log(error);
        setIsLeaving(false);

        return {
            success: false,
            error: JSON.stringify(error?.response?.data?.error)
        };
    }
}