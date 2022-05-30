import { View, Text, FlatList, Pressable, ActivityIndicator } from 'react-native'
import React, {useState} from 'react'
import { useRecoilValue, useRecoilState } from "recoil";
import { isDarkModeAtom } from "../../atom/isDarkModeAtom"; 
import { groupChatsAtom } from "../../atom/groupChatsAtom";
import { GroupChatType, SearchedUserType } from "../../types";
import { useFonts, Manrope_500Medium, Manrope_700Bold } from '@expo-google-fonts/manrope';
import { lightStyles, darkStyles } from './styles';
import SearchUser from '../SearchUser';
import SelectedGroupUser from "../SelectedGroupUser";
import { addGroupMembers, addGroupMembersInState } from "../../helpers/add-group-members"
import { toastMessage } from '../../helpers/toast-message';

interface Props{
    isAddingUsers: boolean;
    setIsAddingUsers: Function;
    isAddUserModalVisible: boolean;
    setIsAddUserModalVisible: Function;
    groupChat: GroupChatType;
    setGroupChat: Function;
}

interface FlatListProps{
    index: number;
    item: SearchedUserType;
}

const AddUsersModalBody = (props: Props) => {

  const { isAddingUsers, setIsAddingUsers, isAddUserModalVisible, setIsAddUserModalVisible, groupChat, setGroupChat } = props;

  const isDarkMode = useRecoilValue<boolean>(isDarkModeAtom);
  const [selectedUsers, setSelectedUsers] = useState<Array<SearchedUserType>>([]);
  const [selectedUsersIdSet, setSelectedUsersIdSet] = useState<Set<string>>(new Set());
  const [groupChats, setGroupChats] = useRecoilState<Array<GroupChatType>>(groupChatsAtom);
  const [searchResult, setSearchResult] = useState<Array<SearchedUserType>>([]);

  const [fontsLoaded] = useFonts({
      Manrope_500Medium,
      Manrope_700Bold
  })

  const onAddUsersClick = async() => {
    if((selectedUsers.length + groupChat.users.length) > 6) {
      toastMessage("error", "Too many users", "A group cannot have more than 6 users");
    }

    const response = await addGroupMembers(isAddingUsers, setIsAddingUsers, groupChat._id, [...selectedUsersIdSet]);

    if(!response.success){
      toastMessage("error", "Oops", `${response.error}`);
      return;
    }

    addGroupMembersInState(groupChat._id, selectedUsers, groupChats, setGroupChats);

    setGroupChat({
      ...groupChat,
      users: [...selectedUsers, ...groupChat.users]
    });

    toastMessage("success", "Yeah...", "Added members successfully");

    setSelectedUsers([]);
    setSelectedUsersIdSet(new Set());
    setSearchResult([]);

    setIsAddUserModalVisible(false);
  }

  return (
    <View style={isDarkMode ? darkStyles.MainContainer : lightStyles.MainContainer}>
      <View
        style={
          isDarkMode
            ? darkStyles.SelectedUsersContainer
            : lightStyles.SelectedUsersContainer
        }
      >
        {selectedUsers.length <= 0 ? (
          <View
            style={
              isDarkMode
                ? darkStyles.EmptySelectedUsersContainer
                : lightStyles.EmptySelectedUsersContainer
            }
          >
            {fontsLoaded && (
              <Text
                style={
                  isDarkMode
                    ? darkStyles.EmptySelectedUsersText
                    : lightStyles.EmptySelectedUsersText
                }
              >
                No users selected
              </Text>
            )}
          </View>
        ) : (
          <FlatList
            data={selectedUsers}
            renderItem={({ item }: FlatListProps) => (
              <SelectedGroupUser
                user={item}
                selectedUsers={selectedUsers}
                setSelectedUsers={setSelectedUsers}
                selectedUserIdSet={selectedUsersIdSet}
                setSelectedUserIdSet={setSelectedUsersIdSet}
              />
            )}
            keyExtractor={(item: SearchedUserType) => item._id ?? ""}
            horizontal={true}
            disableScrollViewPanResponder={true}
            showsHorizontalScrollIndicator={false}
            style={
              isDarkMode
                ? darkStyles.SelectedUsersFlatList
                : lightStyles.SelectedUsersFlatList
            }
          />
        )}
      </View>
      <SearchUser type="group" action="update" groupUsers={groupChat.users} searchResult={searchResult} setSearchResult={setSearchResult} selectedUsers={selectedUsers} setSelectedUsers={setSelectedUsers} selectedUserIdSet={selectedUsersIdSet} setSelectedUserIdSet={setSelectedUsersIdSet} />
      <View style={isDarkMode ? darkStyles.AddUsersButtonContainer : lightStyles.AddUsersButtonContainer}>
          <Pressable style={isDarkMode ? darkStyles.AddUsersButton : lightStyles.AddUsersButton} onPress={onAddUsersClick}>
              {
                  isAddingUsers ? (
                      <ActivityIndicator size="large" color={isDarkMode ? "#0A0911" : "#F6F8FA"} />
                  ) : (
                      <>
                      {
                          fontsLoaded && (
                            <Text style={isDarkMode ? darkStyles.AddUsersText : lightStyles.AddUsersText}>
                                Add Users
                            </Text>
                          )
                      }
                      </>
                  )
              }
          </Pressable>
      </View>
    </View>
  )
}

export default AddUsersModalBody