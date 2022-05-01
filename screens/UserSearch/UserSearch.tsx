import { View, Text, SafeAreaView } from "react-native";
import React, {useState} from "react";
import { darkStyles, lightStyles } from "./styles";
import { isDarkModeAtom } from "../../atom";
import { useRecoilValue } from "recoil";
import NavigationHeader from "../../components/NavigationHeader";
import TitleHeader from "../../components/TitleHeader";
import SearchUser from "../../components/SearchUser";
import { SearchedUserType } from "../../types";

const UserSearch = () => {
  const isDarkMode = useRecoilValue<boolean>(isDarkModeAtom);

  const [searchResult, setSearchResult] = useState<Array<SearchedUserType>>([]);
  return (
    <SafeAreaView
      style={
        isDarkMode ? darkStyles.AndroidSafeArea : lightStyles.AndroidSafeArea
      }
    >
      <NavigationHeader loading={false} />
      <TitleHeader title="Find Friends" />
      <View style={isDarkMode ? darkStyles.SearchUserContainer : lightStyles.SearchUserContainer}>
        <SearchUser type="personal" searchResult={searchResult} setSearchResult={setSearchResult} />
      </View>
    </SafeAreaView>
  );
};

export default UserSearch;
