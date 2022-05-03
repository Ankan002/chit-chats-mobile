import type { SearchedUserType } from "../../types";

export const removeUser = (users: Array<SearchedUserType>, userId: string): Array<SearchedUserType> => {
    return users.filter((user) => user._id !== userId);
}