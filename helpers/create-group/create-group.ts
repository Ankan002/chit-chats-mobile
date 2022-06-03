import AsyncStorage from "@react-native-async-storage/async-storage";
import { DocumentPickerResponse } from "react-native-document-picker";
import Constants from "expo-constants";

export const createGroup = async (
  isCreating: boolean,
  setIsCreating: Function,
  currentImage: DocumentPickerResponse | null,
  groupName: string,
  selectedUserIds: Array<string>
) => {
  if (isCreating)
    return {
      success: false,
      error: "Already creating a group... hold on for sometime...",
    };

  if (!currentImage)
    return {
      success: false,
      error: "No image has ben selected...",
    };

  if (groupName.length < 3 || groupName.length > 30)
    return {
      success: false,
      error:
        "The group name should be at least 3 characters long or at most 30 characters long",
    };

  if (selectedUserIds.length < 2 || selectedUserIds.length > 5)
    return {
      success: false,
      error:
        "There should be at least two more users other than you and at most 5 more users other than you in the group",
    };

  setIsCreating(true);

  try {
    const groupImageToBeUploaded = {
      uri: currentImage.uri,
      type: currentImage.type,
      name: currentImage.name,
    };

    const groupFormData = new FormData();

    groupFormData.append(
      "groupImage",
      groupImageToBeUploaded as unknown as Blob
    );
    groupFormData.append("users", JSON.stringify(selectedUserIds));
    groupFormData.append("chatName", groupName);

    const token = await AsyncStorage.getItem("auth-token");

    const response = await fetch(
      `${Constants?.manifest?.extra?.apiEndpoint}/chat/group`,
      {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
          "auth-token": token ?? "",
        },
        body: groupFormData,
      }
    );

    const data = await response.json();

    setIsCreating(false);

    if (data.success === false)
      return {
        success: data.success,
        error: data.error,
      };

    return {
      success: true,
      group: data.data.group
    };
  } catch (error) {
    console.log(error);
    setIsCreating(false);

    return {
      success: false,
      error: "Failed to create a group",
    };
  }
};
