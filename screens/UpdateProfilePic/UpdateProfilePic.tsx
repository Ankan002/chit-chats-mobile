import { View, Text, SafeAreaView } from "react-native";
import React, { useState } from "react";

import { useRecoilValue } from "recoil";
import { isDarkModeAtom } from "../../atom";
import { lightStyles, darkStyles } from "./styles";
import NavigationHeader from "../../components/NavigationHeader";
import TitleHeader from "../../components/TitleHeader";
import ProfilePicUpdateForm from "../../components/ProfilePicUpdateForm";

const UpdateProfilePic = () => {
  const isDarkMode = useRecoilValue<boolean>(isDarkModeAtom);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  return (
    <SafeAreaView
      style={
        isDarkMode ? darkStyles.AndroidSafeArea : lightStyles.AndroidSafeArea
      }
    >
      <NavigationHeader loading={isUpdating} />
      <TitleHeader title="Update Profile Picture" />
      <View style={isDarkMode ? darkStyles.FormSection : lightStyles.FormSection}>
          <ProfilePicUpdateForm isUpdating={isUpdating} setIsUpdating={setIsUpdating} />
      </View>
    </SafeAreaView>
  );
};

export default UpdateProfilePic;
