import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DocumentPickerResponse } from 'react-native-document-picker';
import { GroupChatType } from '../../types';

export const updateGroupImage = async(
    isUpdating: boolean,
    setIsUpdating: Function,
    groupImage: DocumentPickerResponse | null,
    groupId: string
) => {
    if(isUpdating) return {
        success: false,
        error: "Hold on... Let us update the image"
    };

    if(!groupImage) return{
        success: false,
        error: "Please give us an image to update you fool..."
    };

    setIsUpdating(true);

    try{
        const token = await AsyncStorage.getItem("auth-token");

        const newGroupImage = {
            uri: groupImage.uri,
            type: groupImage.type,
            name: groupImage.name
        };

        const formData = new FormData();

        formData.append("groupId", groupId);
        formData.append("groupImage", newGroupImage as unknown as Blob);

        const response = await fetch(`${Constants?.manifest?.extra?.apiEndpoint}/chat/group/update-image`, {
            method: "PUT",
            headers: {
                "Content-Type": "multipart/form-data",
                "auth-token": token ?? ""
            },
            body: formData
        });

        const data = await response.json();

        setIsUpdating(false);

        return {
            success: true,
            image: data.data.image
        };
    }
    catch(error: any){
        console.log(error);
        setIsUpdating(false);

        return{
            success: false,
            error: JSON.stringify(error?.response?.data?.error)
        }
    }
}


export const updateGroupImageInState = (
    newGroupImage: string,
    groupId: string,
    groupChats: Array<GroupChatType>,
    setGroupChats: Function
) => {
    const newGroupChats = groupChats.map((groupChat) => {
        if(groupChat._id !== groupId) return groupChat;

        return {
            ...groupChat,
            groupImage: newGroupImage
        };
    });

    setGroupChats(newGroupChats);
}
