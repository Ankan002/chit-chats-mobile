import { atom } from "recoil";
import { UserType } from "../types";

export const userAtom = atom({
    key: "user",
    default: {}
});