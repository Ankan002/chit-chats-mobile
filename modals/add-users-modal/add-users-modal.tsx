import { View, Text, Modal } from 'react-native'
import React, {useState} from 'react'
import { useRecoilValue } from "recoil";
import { isDarkModeAtom } from "../../atom/isDarkModeAtom";
import { GroupChatType } from "../../types";
import { toastMessage } from "../../helpers/toast-message";
import Toast from 'react-native-toast-message';
import AsyncModalNavigationHeader from '../../components/AsyncModalNavigationHeader';
import TitleHeader from '../../components/TitleHeader';
import AddUsersModalBody from "../../components/AddUsersModalBody";
import { lightStyles, darkStyles } from "./styles";

interface Props{
    isAddUsersModalVisible: boolean;
    setIsAddUsersModalVisible: Function;
    groupChat: GroupChatType;
    setGroupChat: Function
}

const AddUsersModal = (props: Props) => {
  const {isAddUsersModalVisible, setIsAddUsersModalVisible, groupChat, setGroupChat} = props;

  const isDarkMode = useRecoilValue<boolean>(isDarkModeAtom);
  const [isAddingUsers, setIsAddingUsers] = useState<boolean>(false);

  const onModalCloseRequest = () => {
      if(isAddingUsers){
          toastMessage("error", "Adding Users", "Hold on we are adding the users");
          return;
      }

      setIsAddUsersModalVisible(!isAddUsersModalVisible);
  }

  return (
    <Modal
     visible={isAddUsersModalVisible}
     animationType="slide"
     transparent={false}
     onRequestClose={onModalCloseRequest}
    >
      <View style={isDarkMode ? darkStyles.ModalContainer : lightStyles.ModalContainer}>
        <AsyncModalNavigationHeader isModalActive={isAddUsersModalVisible} setIsModalActive={setIsAddUsersModalVisible} isUpdating={isAddingUsers} updateStatement="Hold on we are adding the users" />
        <TitleHeader title="Add Users" />
        <AddUsersModalBody isAddUserModalVisible={isAddUsersModalVisible} setIsAddUserModalVisible={setIsAddUsersModalVisible} isAddingUsers={isAddingUsers} setIsAddingUsers={setIsAddingUsers} groupChat={groupChat} setGroupChat={setGroupChat} />
      </View>
      <Toast />
    </Modal>
  )
}

export default AddUsersModal