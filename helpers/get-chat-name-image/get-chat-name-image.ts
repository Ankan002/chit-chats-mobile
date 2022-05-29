import type { SearchedUserType } from "../../types";

export const getChatNameAndImage = (users: Array<SearchedUserType>, loggedInUserId: string) => {
    for(let user of users){
        if(user._id !== loggedInUserId){
            return {
                chatName: user.username,
                chatImage: user.image
            };
        }
    }
};

export const getSingleChatDisplayUser = (users: Array<SearchedUserType>, loggedInUserId: string) => {
    for(let user of users){
        if(user._id !== loggedInUserId){
            return user;
        }
    }
};