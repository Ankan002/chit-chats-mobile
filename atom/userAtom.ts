import { atom } from "recoil";
import { UserType } from "../types";

export const userAtom = atom<UserType>({
    key: "user",
    default: {}
});