import { View, Text, Modal } from "react-native";
import React from "react";
import { useRecoilValue } from "recoil";
import { darkStyles, lightStyles } from "./styles";
import { SearchedUserType } from "../../types";
import { isDarkModeAtom } from "../../atom/isDarkModeAtom";
import TitleHeader from "../TitleHeader";
import ModalNavigationHeader from "../ModalNavigationHeader";
import SearchUser from '../SearchUser';

interface Props {
  searchResult: Array<SearchedUserType>;
  setSearchResult: Function;
  action: "create" | "update" | "search";
  isModalVisible: boolean;
  setIsModalVisible: Function;
  selectedUserIdSet: Set<string>;
  setSelectedUserIdSet: Function;
  setSelectedUsers: Function;
  selectedUsers: Array<SearchedUserType>;
}

const PickGroupUserModal = (props: Props) => {
  const { searchResult, setSearchResult, action, isModalVisible, setIsModalVisible, selectedUserIdSet, setSelectedUserIdSet, setSelectedUsers, selectedUsers } = props;

  const isDarkMode = useRecoilValue(isDarkModeAtom);

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={isModalVisible}
      onRequestClose={() => setIsModalVisible(false)}
    >
      <View style={isDarkMode ? darkStyles.Modal : lightStyles.Modal}>
        <ModalNavigationHeader setModalVisibility={setIsModalVisible} />
        <TitleHeader title="Select Users" />
        <View
          style={
            isDarkMode
              ? darkStyles.SearchUserModalContainer
              : lightStyles.SearchUserModalContainer
          }
        >
          <SearchUser
            type="group"
            searchResult={searchResult}
            setSearchResult={setSearchResult}
            action={action}
            selectedUserIdSet={selectedUserIdSet}
            setSelectedUserIdSet={setSelectedUserIdSet}
            setSelectedUsers={setSelectedUsers}
            selectedUsers={selectedUsers}
          />
        </View>
      </View>
    </Modal>
  );
};

export default PickGroupUserModal;
