import { SafeAreaView, Text, View } from 'react-native';
import React, { useState } from 'react';
import { darkStyles, lightStyles } from "./styles";
import { useRecoilValue } from 'recoil';
import { isDarkModeAtom } from '../../atom';
import NavigationHeader from '../../components/NavigationHeader';
import TitleHeader from '../../components/TitleHeader';
import ProfileDetailsUpdateForm from '../../components/ProfileDetailsUpdateForm';

const UpdateUsername = () => {

  const isDarkMode = useRecoilValue<boolean>(isDarkModeAtom);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  return (
    <SafeAreaView style={isDarkMode ? darkStyles.AndroidSafeArea : lightStyles.AndroidSafeArea}>
      <NavigationHeader loading={isUpdating} />
      <TitleHeader title="Update Username" />
      <View style={isDarkMode ? darkStyles.FormSection : lightStyles.FormSection}>
        <ProfileDetailsUpdateForm type="username" updating={isUpdating} setUpdating={setIsUpdating} />
      </View>
    </SafeAreaView>
  );
};

export default UpdateUsername;