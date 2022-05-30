import { atom } from "recoil";
import { GroupChatType } from "../types";

export const groupChatsAtom = atom<Array<GroupChatType>>({
    key: "groupChatsAtom",
    default: []
});