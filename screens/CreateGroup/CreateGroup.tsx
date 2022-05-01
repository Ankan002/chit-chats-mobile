import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import { darkStyles, lightStyles } from "./styles";
import { isDarkModeAtom } from "../../atom";
import { useRecoilValue } from "recoil";
import NavigationHeader from "../../components/NavigationHeader";
import TitleHeader from "../../components/TitleHeader";
import CreateGroupForm from "../../components/CreateGroupForm";

const CreateGroup = () => {
  const isDarkMode = useRecoilValue<boolean>(isDarkModeAtom);

  return (
    <SafeAreaView
      style={
        isDarkMode ? darkStyles.AndroidSafeArea : lightStyles.AndroidSafeArea
      }
    >
      <NavigationHeader loading={false} />
      <TitleHeader title="Create A Group" />
      <View style={isDarkMode ? darkStyles.FormContainer : lightStyles.FormContainer}>
        <CreateGroupForm />
      </View>
    </SafeAreaView>
  );
};

export default CreateGroup;