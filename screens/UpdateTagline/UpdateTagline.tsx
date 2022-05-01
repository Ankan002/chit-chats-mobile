import { View, Text, SafeAreaView } from 'react-native';
import React, {useState} from 'react';
import { darkStyles, lightStyles } from "./styles";
import { useRecoilValue } from 'recoil';
import { isDarkModeAtom } from '../../atom';
import NavigationHeader from '../../components/NavigationHeader';
import TitleHeader from '../../components/TitleHeader';
import ProfileDetailsUpdateForm from '../../components/ProfileDetailsUpdateForm';

const UpdateTagline = () => {

  const isDarkMode = useRecoilValue<boolean>(isDarkModeAtom); 
  const [ isUpdating, setIsUpdating ] = useState<boolean>(false);

  return (
    <SafeAreaView style={isDarkMode ? darkStyles.AndroidSafeArea : lightStyles.AndroidSafeArea}>
      <NavigationHeader loading={isUpdating} />
      <TitleHeader title="Update Tagline" />
      <View style={isDarkMode ? darkStyles.FormSection : lightStyles.FormSection}>
        <ProfileDetailsUpdateForm type="tagline" updating={isUpdating} setUpdating={setIsUpdating} />
      </View>
    </SafeAreaView>
  );
};

export default UpdateTagline;