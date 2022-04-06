import { StyleSheet } from "react-native";

const styles = (isDarkMode: boolean) => {
    return StyleSheet.create({
        Container: {
            width: "100%",
            paddingHorizontal: 20,
            paddingVertical: 5,
            justifyContent: "center"
        },
        BackButton: {
            width: 40,
            height: 40,
            borderRadius: 25,
            alignItems: "center",
            justifyContent: "center",
            borderWidth: 1,
            borderColor: "#767578",
            backgroundColor: (isDarkMode) ? "#09080F" : "#FFFFFF"
        }
    });
};

export const darkStyles = styles(true);
export const lightStyles = styles(false);