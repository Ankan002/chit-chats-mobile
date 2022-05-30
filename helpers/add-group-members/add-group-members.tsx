import axios from "axios";
import AsyncStoage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";
import { GroupChatType, SearchedUserType } from "../../types";

export const addGroupMembers = async(
    isAddingUsers: boolean,
    setIsAddingUsers: Function,
    groupId: string,
    targetUsers: Array<string>
) => {
    if(isAddingUsers) return{
        success: false,
        error: "Hold on.. we are adding your friend to the group"
    };

    setIsAddingUsers(true);

    try{
        const token = await AsyncStoage.getItem("auth-token");

        const response = await axios.put(`${Constants?.manifest?.extra?.apiEndpoint}/chat/group/add-users`, {
            groupId,
            targetUsers
        }, {
            headers: {
                "Content-Type": "application/json",
                "auth-token": token ?? ""
            }
        });

        console.log(response);

        setIsAddingUsers(false);

        return{
            success: response.data.success
        };
    }
    catch(error: any){
        console.log(error);
        setIsAddingUsers(false);

        return{
            success: false,
            error: JSON.stringify(error?.response?.data?.error)
        };
    }
};


export const addGroupMembersInState = (
    groupId: string,
    users: Array<SearchedUserType>,
    groupChats: Array<GroupChatType>,
    setGroupChats: Function
) => {
    const updatedGroupChats = groupChats.map((groupChat) => {
        if(groupChat._id !== groupId) return groupChat;

        return {
            ...groupChat,
            users: [...users, ...groupChat.users]
        };
    });

    setGroupChats(updatedGroupChats);
}