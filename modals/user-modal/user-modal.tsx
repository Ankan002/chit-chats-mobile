import { View, Text, Modal } from 'react-native'
import React from 'react'
import { useRecoilValue } from 'recoil'
import { isDarkModeAtom } from '../../atom'
import { lightStyles, darkStyles } from "./styles";
import { SearchedUserType } from "../../types";
import ProfileHeader from '../../components/ProfileHeader';
import SimpleModalNavigationHeader from '../../components/SimpleModalNavigationHeader';
import ProfileModalBody from '../../components/ProfileModalBody/ProfileModalBody';
import Toast from "react-native-toast-message";
import { toastConfig } from "../../config";

interface Props{
  user: SearchedUserType;
  isModalVisible: boolean; 
  setIsModalVisible: Function;
}

const UserModal = (props: Props) => {
  const {user, isModalVisible, setIsModalVisible} = props;
  const isDarkMode = useRecoilValue<boolean>(isDarkModeAtom);

  return (
    <Modal
      visible={isModalVisible}
      animationType="slide"
      transparent={false}
      onRequestClose={() => setIsModalVisible(false)}
    >
      <View style={isDarkMode ? darkStyles.ModalContainer : lightStyles.ModalContainer}>
        <SimpleModalNavigationHeader setModalVisibility={setIsModalVisible} />
        <ProfileHeader image={user.image ?? ""} username={user.username ?? ""} name={user.name ?? ""} />
        <ProfileModalBody email={user.email ?? ""} tagline={user.tagline ?? ""} />
      </View>

      <Toast config={toastConfig} />
    </Modal>
  )
}

export default UserModal