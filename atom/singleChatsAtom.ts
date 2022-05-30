import { atom } from "recoil";
import { SingleChatType } from "../types";

export const singleChatsAtom = atom<Array<SingleChatType>>({
    key: "singleChatsAtom",
    default: []
});