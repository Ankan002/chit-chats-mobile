import { StyleSheet } from "react-native";

const styles = (isDarkMode: boolean) => {
    return StyleSheet.create({
        Button: {
            width: "100%",
            marginVertical: 10,
            borderWidth: 1,
            paddingHorizontal: 5,
            paddingVertical: 5,
            borderColor: "#FD6438",
            borderRadius: 10,
            justifyContent: "center"
        },
        ButtonText: {
            fontFamily: "FiraCode_500Medium",
            fontSize: 16,
            color: "#FD6438",
            textAlign: "center"
        }
    });
};

export const darkStyles = styles(true);
export const lightStyles = styles(false);