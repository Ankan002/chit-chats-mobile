import {
  View,
  Text,
  TextInput,
  Pressable,
  FlatList,
  Image,
  ActivityIndicator,
  SectionList
} from "react-native";
import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { isDarkModeAtom } from "../../atom/isDarkModeAtom";
import { darkStyles, lightStyles } from "./styles";
import { useFonts, FiraCode_500Medium } from "@expo-google-fonts/fira-code";
import UserSearchResult from "../UserSearchResult";
import { Feather } from "@expo/vector-icons";
import { SearchedUserType } from "../../types";
import { toastMessage } from "../../helpers/toast-message";
import { searchUser } from "../../helpers/search-users";
import { FakeUsers } from "../../constants/FakeUsers";

const EmptyImage = require("../../assets/images/empty_search.png");

type Props = {
  type: "personal";
  searchResult: Array<SearchedUserType>;
  setSearchResult: Function;
} | {
  type: "group";
  searchResult: Array<SearchedUserType>;
  setSearchResult: Function;
}

interface FlatListProps {
  index: number;
  item: SearchedUserType;
}

const SearchUser = (props: Props) => {
  const [fontsLoaded] = useFonts({ FiraCode_500Medium });

  const isDarkMode = useRecoilValue<boolean>(isDarkModeAtom);
  const [keyword, setKeyword] = useState<string>("");
  const [emptyStatement, setEmptyStatement] = useState<string>(
    "Please search with email or username to get a result"
  );
  const [isSearching, setIsSearching] = useState<boolean>(false);

  const onSearchClick = async() => {
    if(keyword.length < 1){
      toastMessage("error", "Length Error", "Please Enter a valid keyword to search for");
      return;
    }

    const response = await searchUser(isSearching, setIsSearching, keyword);

    console.log(response)

    if(response?.success === false){
      toastMessage("error", "Oops!!", response.error);
      return;
    }

    if(props.type === "personal"){
      props.setSearchResult(response?.users);

      if(response?.users.length < 1){
        setEmptyStatement("No users found with that keyword");
      }
    }

    if(props.type === "group"){
      props.setSearchResult(response?.users);

      if(response?.users.length < 1){
        setEmptyStatement("No users found with that keyword");
      }
    }
  } 

  return (
    <View
      style={
        isDarkMode
          ? darkStyles.SearchUserContainer
          : lightStyles.SearchUserContainer
      }
    >
      <View
        style={
          isDarkMode
            ? darkStyles.SearchBoxContainer
            : lightStyles.SearchBoxContainer
        }
      >
        {fontsLoaded && (
          <TextInput
            style={
              isDarkMode ? darkStyles.SearchTextBox : lightStyles.SearchTextBox
            }
            placeholder="Enter name or username"
            placeholderTextColor="#7E7D80"
            onChangeText={(text) => setKeyword(text)}
            value={keyword}
            numberOfLines={1}
            scrollEnabled = {false}
          />
        )}

        <Pressable
          style={
            isDarkMode ? darkStyles.SearchButton : lightStyles.SearchButton
          }
          onPress={onSearchClick}
        >
          {isSearching ? (
            <ActivityIndicator
              color={isDarkMode ? "#0A0911" : "#F6F8FA"}
              size="small"
            />
          ) : (
            <Feather
              name="search"
              size={24}
              color={isDarkMode ? "#0A0911" : "#F6F8FA"}
            />
          )}
        </Pressable>
      </View>

      {props.searchResult.length > 0 ? (
        <FlatList
          data={props.searchResult}
          renderItem={({ item }: FlatListProps) => (
            <UserSearchResult type="personal" user={item} />
          )}
          keyExtractor={(item: SearchedUserType) => item?._id ?? ""}
          style={isDarkMode ? darkStyles.UserList : lightStyles.UserList}
        />
      ) : (
        <View
          style={
            isDarkMode
              ? darkStyles.EmptySearchResultBox
              : lightStyles.EmptySearchResultBox
          }
        >
          <Image
            source={EmptyImage}
            style={
              isDarkMode
                ? darkStyles.EmptySearchResultImage
                : lightStyles.EmptySearchResultImage
            }
          />

          {fontsLoaded && (
            <Text
              style={isDarkMode ? darkStyles.EmptyText : lightStyles.EmptyText}
            >
              {emptyStatement}
            </Text>
          )}
        </View>
      )}
    </View>
  );
};

export default SearchUser;
