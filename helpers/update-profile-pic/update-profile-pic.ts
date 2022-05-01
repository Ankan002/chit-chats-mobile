import { DocumentPickerResponse } from "react-native-document-picker";
import { toastMessage } from "../toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";

export const updateProfilePic = async (
  isUpdating: boolean,
  setIsUpdating: Function,
  image: DocumentPickerResponse | null,
  currentProfilePic: string
) => {
  if (isUpdating) return;

  if (!image) {
    toastMessage("error", "No Image Found", "Please select an image to update");
    return;
  }

  try {
    setIsUpdating(true);

    const requestingImage = {
      uri: image.uri,
      type: image.type,
      name: image.name,
    };

    const formData = new FormData();

    formData.append("image", requestingImage as unknown as Blob);
    formData.append("oldProfilePic", currentProfilePic);

    const authToken = await AsyncStorage.getItem("auth-token");

    const Response = await fetch(`${Constants.manifest?.extra?.apiEndpoint}/user/profile-picture`, {
        method: "PUT",
        headers: {
          "Content-Type": "multipart/form-data",
          "auth-token": authToken ?? ""
        },
        body: formData
      });

    const data = await Response.json();

    setIsUpdating(false);

    if(!data?.success){
        return {
            success: false,
            error: data?.error
        }
    }

    return {
        success: true,
        image: data?.data?.image
    }

  } catch (error) {
    console.log(error);
    setIsUpdating(false);

    return {
        success: false,
        error: JSON.stringify(error)
    };
  }
};
