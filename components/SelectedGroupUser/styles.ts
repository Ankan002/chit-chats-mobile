import { StyleSheet } from "react-native";

const styles = (isDarkMode: boolean) => {
    return StyleSheet.create({
        UserContainer: {
            height: "100%",
            paddingVertical: 5,
            paddingHorizontal: 10,
            flexDirection: "row",
            alignItems: "center",
            borderRadius: 10,
            backgroundColor: "#FD6438",
            marginHorizontal: 5
        },
        UsernameText: {
            fontSize: 16,
            fontFamily: "Manrope_500Medium",
            color: isDarkMode ? "#0A0911" : "#F6F8FA",
        },
        RemoveBtn: {
            height: 15,
            width: 15,
            marginLeft: 5,
            backgroundColor: isDarkMode ? "#0A0911" : "#F6F8FA",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 10
        }
    });
};

export const darkStyles = styles(true);
export const lightStyles = styles(false);