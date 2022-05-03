import { StyleSheet } from "react-native";

const styles = (isDarkMode: boolean) => {
    return StyleSheet.create({
        Modal: {
            paddingHorizontal: 15,
            paddingVertical: 10,
            backgroundColor: isDarkMode ? "#10111A" : "#F6F8FA",
            flex: 1 
        },
        SearchUserModalContainer: {
            width: "100%",
            flexGrow: 1,
            marginTop: 10
        },
    });
};

export const darkStyles = styles(true);
export const lightStyles = styles(false);