import Constants from 'expo-constants';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GroupChatType } from '../../types';
import { toastMessage } from '../toast-message/toast-message';

export const updateGroupName = async(
    isUpdating: boolean,
    setIsUpdating: Function,
    newGroupName: string,
    groupId: string
) => {
    if(isUpdating) return{
        success: false,
        error: "Already updating the group name... have some patience"
    };

    if(newGroupName.length < 3 || newGroupName.length > 30) return{
        success: false,
        error: "Group name needs to be at least 3 characters long and at most 30 characters long"
    };

    setIsUpdating(true);

    try{
        const token = await AsyncStorage.getItem("auth-token");

        const response = await axios.put(`${Constants?.manifest?.extra?.apiEndpoint}/chat/group/rename`, {
            chatName: newGroupName,
            groupId,
        }, {
            headers: {
                "Content-Type": "application/json",
                "auth-token": token ?? ""
            }
        });

        setIsUpdating(false);

        return {
            success: response.data.success
        };
    }
    catch(error: any){
        console.log(error);
        setIsUpdating(false);

        return {
            success: false,
            error: JSON.stringify(error?.response?.data?.error)
        };
    }
}

export const updateGroupNameInState = (
    groupId: string,
    name: string,
    setGroupChats: Function,
    groupChats: Array<GroupChatType>
) => {
    const newGroupChats = groupChats.map(groupChat => {
        if(groupChat._id !== groupId) return groupChat;

        return {
            ...groupChat,
            chatName: name
        };
    });

    setGroupChats(newGroupChats);

    toastMessage("success", "Yeah...", "Group Name updated successfully");
}
