import Toast from "react-native-toast-message";

//TODO: If possible create a customized Toast for all

export const toastMessage = (
    type: "success" | "error" | "info",
    heading: string,
    body: string | undefined
): void => {
    Toast.show({
        type,
        text1: heading,
        text2: (body) ? body : "",
        visibilityTime: (type === "error") ? 4000 : 1500
    });
};