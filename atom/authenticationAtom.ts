import { atom } from "recoil";

export const isAuthenticatedAtom = atom({
    default: false,
    key: "isAuthenticatedAtom"
});