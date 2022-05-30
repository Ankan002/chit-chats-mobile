import { StyleSheet } from "react-native";

const styles = (isDarkMode: boolean) => {
    return StyleSheet.create({
        ModalContainer: {
            paddingHorizontal: 15,
            paddingVertical: 10,
            backgroundColor: isDarkMode ? "#10111A" : "#F6F8FA",
            flex: 1
        },
    });
};

export const darkStyles = styles(true);
export const lightStyles = styles(false);