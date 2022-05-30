import axios from "axios";
import AsyncStoage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";
import { GroupChatType } from "../../types";

export const removeGroupMember = async(
    isRemovingUser: boolean,
    setIsRemovingUser: Function,
    groupId: string,
    userId: string
) => {
    if(isRemovingUser) return {
        success: false,
        error: "Hold on we are kicking the user..."
    };

    setIsRemovingUser(true);

    try{
        const token = await AsyncStoage.getItem("auth-token");

        const response = await axios.put(`${Constants?.manifest?.extra?.apiEndpoint}/chat/group/remove-user`, {
            groupId,
            targetUserId: userId
        }, {
            headers: {
                "Content-Type": "application/json",
                "auth-token": token ?? ""
            }
        });

        setIsRemovingUser(false);

        return {
            success: response.data.success
        };
    }
    catch(error: any){
        console.log(error);
        setIsRemovingUser(false);

        return {
            success: false,
            error: JSON.stringify(error?.response?.data?.error)
        };
    }
};

export const removeGroupMemberInState = (
    chatGroups: Array<GroupChatType>,
    setChatGroups: Function,
    userIdToBeRemoved: string,
    targetGroupId: string
) => {
    const updatedGroupChats = chatGroups.map((group) => {
        if(targetGroupId !== group._id) return group;

        return {
            ...group,
            users: group.users.filter((user) => user._id !== userIdToBeRemoved)
        };
    });

    setChatGroups(updatedGroupChats);
};