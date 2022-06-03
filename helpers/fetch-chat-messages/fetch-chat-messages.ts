import AsyncStoage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";

export const fetchInitialChats = async(
    initialLoading: boolean,
    setInitialLoading: Function,
    chatId: string,
    isMoreMessagesAvailable: boolean,
    setIsMoreMessagesAvailable: Function,
    nextPage: number,
    setNextPage: Function
) => {
    if(initialLoading) return {
        success: false,
        error: "Hold on we are fetching the messages"
    };

    if(!isMoreMessagesAvailable) return {
        success: false,
        error: "You have read all your messages, now let the server sleep..."
    };

    setInitialLoading(true);

    try{
        const token = await AsyncStoage.getItem("auth-token");

        const response = await fetch(`${Constants?.manifest?.extra?.apiEndpoint}/message/${chatId}?page=${nextPage}$messages=15`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": token ?? ""
            }
        });

        const data = await response.json();

        setInitialLoading(false);

        if(!data.success && data.error === "You are not a part of this group") return {
            success: false,
            notGroupMember: true,
            error: "Access Denied"
        };

        if(!data.success) return {
            success: false,
            error: data.error
        };

        if(data.data.chats.length < 15){
            setIsMoreMessagesAvailable(false);
        }

        setNextPage(nextPage + 1);

        return {
            success: true,
            chatMessages: data.data.chats
        };
    }
    catch(error){
        console.log(error);
        setInitialLoading(false);

        return {
            success: false,
            error: `${error}`
        };
    }
}

export const fetchMore = async(
    isMoreLoading: boolean,
    setIsMoreLoading: Function,
    chatId: string,
    isMoreAvailable: boolean,
    setIsMoreAvailable: Function,
    nextPage: number,
    setNextPage: Function
) => {
    if(isMoreLoading) return {
        success: false,
        error: "We are loading more chats now hold on..."
    };

    if(!isMoreAvailable) return {
        success: false,
        error: "No more messages to load..."
    };

    setIsMoreLoading(true);

    try{
        const token = await AsyncStoage.getItem("auth-token");

        const response = await fetch(`${Constants?.manifest?.extra?.apiEndpoint}/message/${chatId}?page=${nextPage}$messages=15`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": token ?? ""
            }
        });

        const data = await response.json();

        setIsMoreLoading(false);

        if(!data.success && data.error === "You are not a part of this group") return {
            success: false,
            notGroupMember: true,
            error: "Access Denied"
        };

        if(!data.success) return {
            success: false,
            error: data.error
        };

        if(data.data.chats.length < 15){
            setIsMoreAvailable(false);
        }

        setNextPage(nextPage + 1);

        return {
            success: true,
            chatMessages: data.data.chats
        };
    }
    catch(error){
        console.log(error);
        setIsMoreLoading(false);

        return {
            success: false,
            error: "Internal Server Error"
        };
    }
}