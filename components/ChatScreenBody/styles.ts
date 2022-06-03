import { StyleSheet } from "react-native";

const styles = (isDarkMode: boolean) => {
    return StyleSheet.create({
        BodyContainer: {
            flex: 1,
            width: "100%",
            paddingHorizontal: 15
        },
        MessageFlatListSection: {
            flex: 1,
            width: "100%"
        },
        SendMessageSection: {
            width: "100%",
            flexDirection: "row",
            alignItems: "center"
        },
        SendMessageInputView: {
            flexGrow: 1,
            borderWidth: 1,
            borderColor: isDarkMode ? "#F6F8FA" : "#0A0911",
            color: isDarkMode ? "#F6F8FA" : "#0A0911",
            fontFamily: "Manrope_400Regular",
            fontSize: 16,
            marginTop: 10,
            borderRadius: 20,
            backgroundColor: isDarkMode ? "#08070C" : "#FFFFFF",
            marginBottom: 10,
            maxHeight: 80,
            paddingHorizontal: 15,
            paddingVertical: 10,
            maxWidth: "74%"
        },
        SendMessageInput: {
            fontFamily: "Manrope_400Regular",
            fontSize: 16,
            color: isDarkMode ? "#F6F8FA" : "#0A0911",
            flexShrink: 1,
            maxHeight: 80,
        },
        SendMessageHelperButton: {
            borderWidth: 1,
            borderColor: isDarkMode ? "#F6F8FA" : "#0A0911",
            marginVertical: 10,
            borderRadius: 20,
            backgroundColor: isDarkMode ? "#08070C" : "#FFFFFF",
            padding: 10,
            marginHorizontal: 5,
            alignItems: "center",
            justifyContent: "center",
            minWidth: 40
        },
        SendMessageButton: {
            borderWidth: 1,
            marginVertical: 10,
            padding: 10,
            marginRight: 5,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 20,
            minWidth: 40
        },
        LoadingView: {
            flex: 1,
            width: "100%",
            alignItems: "center",
            justifyContent: "center"
        }
    });
};

//#FD6438

export const darkStyles = styles(true);
export const lightStyles = styles(false);