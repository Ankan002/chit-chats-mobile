import { atom } from "recoil";

export const chatsLoadingAtom = atom<boolean>({
    key: "chatsLoadingAtom",
    default: false
});