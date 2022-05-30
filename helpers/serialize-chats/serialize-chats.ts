import { SingleChatType, GroupChatType } from "../../types";

export const serializeChats = (
    chats: Array<GroupChatType | SingleChatType>,
    setSingleChats: Function,
    setGroupChats: Function,
    isChatsLoading: boolean,
    setIsChatsLoading: Function
) => {
    if(isChatsLoading || chats.length === 0) return;

    setIsChatsLoading(true);

    const singleChats: Array<SingleChatType> = [];
    const groupChats: Array<GroupChatType> = [];

    chats.map((chat) => {
        if(chat.isGroupChat === true) groupChats.push(chat as GroupChatType);
        else if(chat.isGroupChat === false) singleChats.push(chat);
    });

    setSingleChats(singleChats);
    setGroupChats(groupChats);

    setIsChatsLoading(false);
}