import { View, Text, TextInput, FlatList, Pressable, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import { darkStyles, lightStyles } from "./styles";
import { useRecoilValue, useRecoilState } from "recoil";
import { isDarkModeAtom } from "../../atom/isDarkModeAtom";
import { useFonts, Manrope_500Medium, Manrope_700Bold } from "@expo-google-fonts/manrope";
import { FiraCode_500Medium } from "@expo-google-fonts/fira-code";
import { DocumentPickerResponse } from "react-native-document-picker";
import { SearchedUserType, UserType, GroupChatType } from "../../types";
import ModalTriggerButton from "../ModalTriggerButton/ModalTriggerButton";
import ImageThumbnailPreview from "../ImageThumbnailPreview/ImageThumbnailPreview";
import ImagePickerModal from "../ImagePickerModal/ImagePickerModal";
import PickGroupUserModal from "../PickGroupUserModal/PickGroupUserModal";
import SelectedGroupUser from "../SelectedGroupUser";
import { createGroup } from "../../helpers/create-group";
import { toastMessage } from "../../helpers/toast-message";
import { userAtom } from "../../atom/userAtom";
import { groupChatsAtom } from "../../atom/groupChatsAtom";

interface FlatListProps {
  index: number;
  item: SearchedUserType;
}

const CreateGroup = () => {
  const [fontsLoaded] = useFonts({
    Manrope_500Medium,
    FiraCode_500Medium,
    Manrope_700Bold
  });

  const isDarkMode = useRecoilValue<boolean>(isDarkModeAtom);

  const [groupName, setGroupName] = useState<string>("");
  const [searchResult, setSearchResult] = useState<Array<SearchedUserType>>([]);
  const [currentImage, setCurrentImage] =
    useState<DocumentPickerResponse | null>(null);
  const [selectUserModalVisible, setSelectUserModalVisible] =
    useState<boolean>(false);
  const [selectImageModalVisible, setSelectImageModalVisible] =
    useState<boolean>(false);
  const [selectedUserIdSet, setSelectedUserIdSet] = useState<Set<string>>(
    new Set()
  );
  const [selectedUsers, setSelectedUsers] = useState<Array<SearchedUserType>>(
    []
  );
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const loggedInUser = useRecoilValue<UserType>(userAtom);
  const [groupChats, setGroupChats] = useRecoilState<Array<GroupChatType>>(groupChatsAtom);

  const onCreateClick = async() => {
    const response = await createGroup(isCreating, setIsCreating, currentImage, groupName, [...selectedUserIdSet]);

    console.log(response);

    if(!response.success){
      toastMessage("error", "Error Occurred", response.error);
      return;
    }

    const group = response.group;

    let updatedGroup = {
      ...group,
      users: [{
        __v: loggedInUser.__v,
        _id: loggedInUser._id,
        name: loggedInUser.name,
        email: loggedInUser.email,
        username: loggedInUser.username,
        image: loggedInUser.image,
        tagline: loggedInUser.tagline,
        updatedAt: loggedInUser.updatedAt,
        createdAt: loggedInUser.createdAt
      }, ...selectedUsers],
      groupAdmin: {
        __v: loggedInUser.__v,
        _id: loggedInUser._id,
        name: loggedInUser.name,
        email: loggedInUser.email,
        username: loggedInUser.username,
        image: loggedInUser.image,
        tagline: loggedInUser.tagline,
        updatedAt: loggedInUser.updatedAt,
        createdAt: loggedInUser.createdAt
      }
    };

    setGroupChats([updatedGroup, ...groupChats]);


    //TODO: CleanUp here and also redirect to the chat screen
    setGroupName("");
    setCurrentImage(null);
    setSelectedUsers([]);
    setSelectedUserIdSet(new Set());
  }

  return (
    <View
      style={isDarkMode ? darkStyles.FormContainer : lightStyles.FormContainer}
    >
      {fontsLoaded && (
        <Text style={isDarkMode ? darkStyles.LabelText : lightStyles.LabelText}>
          Group Name
        </Text>
      )}

      {fontsLoaded && (
        <TextInput
          style={
            isDarkMode ? darkStyles.NameInputText : lightStyles.NameInputText
          }
          placeholderTextColor="#7E7D80"
          placeholder="Enter Group Name"
          onChangeText={(text) => setGroupName(text)}
          value={groupName}
        />
      )}

      {fontsLoaded && (
        <Text style={isDarkMode ? darkStyles.LabelText : lightStyles.LabelText}>
          Selected Users
        </Text>
      )}

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
                selectedUserIdSet={selectedUserIdSet}
                setSelectedUserIdSet={setSelectedUserIdSet}
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

      <ModalTriggerButton
        title="Add more friends"
        setModalVisibility={setSelectUserModalVisible}
      />

      {currentImage === null ? (
        <>
          <ImageThumbnailPreview type="non-editable" image={currentImage} />
          <ModalTriggerButton
            title="Select an image"
            setModalVisibility={setSelectImageModalVisible}
          />
        </>
      ) : (
        <ImageThumbnailPreview
          type="editable-modal"
          image={currentImage}
          setModalVisibility={setSelectImageModalVisible}
        />
      )}

      <View
        style={
          isDarkMode
            ? darkStyles.CreateGroupButtonContainer
            : lightStyles.CreateGroupButtonContainer
        }
      >
        <Pressable
          style={
            isDarkMode ? darkStyles.CreateGroupButton : lightStyles.CreateGroupButton
          }
          onPress={onCreateClick}
        >
          {isCreating ? (
            <ActivityIndicator
              size="large"
              color={isDarkMode ? "#0A0911" : "#F6F8FA"}
            />
          ) : (
            <>
              {fontsLoaded && (
                <Text
                  style={
                    isDarkMode ? darkStyles.CreateGroupText : lightStyles.CreateGroupText
                  }
                >
                  Create Group
                </Text>
              )}
            </>
          )}
        </Pressable>
      </View>

      <ImagePickerModal
        isModalVisible={selectImageModalVisible}
        setModalVisibility={setSelectImageModalVisible}
        currentImage={currentImage}
        setCurrentImage={setCurrentImage}
      />

      <PickGroupUserModal
        action="create"
        setSearchResult={setSearchResult}
        searchResult={searchResult}
        isModalVisible={selectUserModalVisible}
        setIsModalVisible={setSelectUserModalVisible}
        selectedUserIdSet={selectedUserIdSet}
        setSelectedUserIdSet={setSelectedUserIdSet}
        setSelectedUsers={setSelectedUsers}
        selectedUsers={selectedUsers}
      />
    </View>
  );
};

export default CreateGroup;
