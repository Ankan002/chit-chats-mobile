import type { SingleChatType } from "../../types";

export const isUserConnected = (
    singleChats: Array<SingleChatType>,
    currentChatId: string
): boolean => {
    if(singleChats.length === 0) return false;
    if(singleChats.length === 1) return singleChats[0]._id === currentChatId;

    let startingPoint = 0;
    let endingPoint = singleChats.length - 1;

    while(startingPoint <= endingPoint){
        if(singleChats[startingPoint]._id === currentChatId) return true;

        if(startingPoint === endingPoint){
            startingPoint++;
            endingPoint--;
            continue;
        }

        if(singleChats[endingPoint]._id === currentChatId) return true;

        startingPoint++;
        endingPoint--;
    }

    return false
}