import { StyleSheet } from "react-native";

const styles = (isDarkMode: boolean) => {
    return StyleSheet.create({
        LogoutContainer: {
            width: "100%",
            flexGrow: 1,
            padding: 20,
            alignItems: "center",
            justifyContent: "flex-end"
        },
        LogoutButton: {
            width: "70%",
            paddingVertical: 10,
            paddingHorizontal: 5,
            maxWidth: 300,
            backgroundColor: "#FD6438",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 10
        },
        LogoutText: {
            fontFamily: "Manrope_700Bold",
            fontSize: 19,
            color: isDarkMode ? "#10111A" : "#F6F8FA"
        }
    });
};

export const lightStyles = styles(false);
export const darkStyles = styles(true);