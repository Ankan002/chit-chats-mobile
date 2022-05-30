import { SearchedUserType } from "../../types";

export const serializeAddSearchedUser = (
    groupUsers: Array<SearchedUserType>,
    searchedUsers: Array<SearchedUserType>,
) => {
    let startingPoint = 0;
    let endingPoint = groupUsers.length - 1

    const groupUsersIdSet: Set<string> = new Set();

    while(startingPoint <= endingPoint){
        groupUsersIdSet.add(groupUsers[startingPoint]._id ?? "");

        if(startingPoint === endingPoint){
            startingPoint++;
            endingPoint--;
            continue;
        }

        groupUsersIdSet.add(groupUsers[endingPoint]._id ?? "");

        startingPoint++;
        endingPoint--;
    }

    const updatedSearchedUsers = searchedUsers.filter((searchedUser) => !groupUsersIdSet.has(searchedUser._id ?? ""));

    return updatedSearchedUsers;
}