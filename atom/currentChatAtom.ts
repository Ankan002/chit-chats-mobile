import { atom } from "recoil";

export const currentChatAtom = atom<string | null>({
    key: "currentChatAtom",
    default: null
});