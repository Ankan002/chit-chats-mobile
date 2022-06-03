import { atom } from "recoil";

export const notificationChatsAtom = atom<Set<string>>({
    key: "notificationChatsAtom",
    default: new Set()
});