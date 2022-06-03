import { StyleSheet } from "react-native";

const styles = (isDarkMode: boolean) => {
    return StyleSheet.create({
        FormContainer: {
            flex: 1,
            width: "100%",
            // paddingHorizontal: 15,
            paddingVertical: 20
        },
        EmptyMediaContainer: {
            width: "100%",
            height: "50%",
            justifyContent: "center",
            alignItems: "center",
            borderWidth: 3,
            borderStyle: "dashed",
            borderColor: isDarkMode ? "#F6F8FA" : "#0A0911",
            borderRadius: 20,
            backgroundColor: isDarkMode ? "#08070C" : "#FFFFFF"
        },
        EmptyMediaContainerText: {
            color: isDarkMode ? "#F6F8FA" : "#0A0911",
            fontSize: 18,
            fontFamily: "Manrope_600SemiBold",
            marginTop: 10
        },
        MediaContainer: {
            width: "100%",
            height: "40%",
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
            borderWidth: 2,
            borderColor: isDarkMode ? "#F6F8FA" : "#0A0911",
            borderRadius: 20,
            backgroundColor: isDarkMode ? "#08070C" : "#FFFFFF"
        },
        Media: { 
            width: "100%",
            height: "100%", 
            resizeMode: "contain",
        },
        DeleteButtonContainer: {
            width: "100%",
            flexDirection: "row",
            justifyContent: "flex-end"
        },
        DeleteButton: {
            marginTop: 10,
            marginRight: 10
        },
        SendMessageContainer: {
            flexGrow: 1,
            width: "100%",
            justifyContent: 'flex-end'
        },
        SendMessageSection: {
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between"
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
            maxWidth: "85%"
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
            marginHorizontal: 5,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 20,
            minWidth: 40
        },
    });
};

export const darkStyles = styles(true);
export const lightStyles = styles(false);