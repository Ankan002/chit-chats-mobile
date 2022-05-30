import { StyleSheet } from "react-native";

const styles = (isDarkMode: boolean) => {
    return StyleSheet.create({
        LeaveButtonContainer: {
            flexShrink: 1,
            width: "100%",
            justifyContent: "flex-end",
            alignItems: "center",
            paddingBottom: 20
        },
        LeaveButton: {
            minWidth: "70%",
            borderRadius: 10,
            paddingHorizontal: 25,
            paddingVertical: 10,
            backgroundColor: '#FD6438',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center'
        },
        LeaveText: {
            fontFamily: "Manrope_700Bold",
            color: isDarkMode ? "#0A0911" : "#F6F8FA",
            fontSize: 20
        },
    });
};

export const darkStyles = styles(true);
export const lightStyles = styles(false);