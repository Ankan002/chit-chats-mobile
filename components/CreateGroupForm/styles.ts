import { StyleSheet } from "react-native";

const styles = (isDarkMode: boolean) => {
    return StyleSheet.create({
        FormContainer: {
            flexShrink: 1,
            width: "100%",
            paddingHorizontal: 10
        },
        LabelText: {
            fontSize: 16,
            fontFamily: "Manrope_500Medium",
            color: isDarkMode ? "#F6F8FA" : "#0A0911",
            marginTop: 20
        },
        NameInputText: {
            fontFamily: "FiraCode_500Medium",
            fontSize: 18,
            padding: 0,
            paddingVertical: 10,
            borderWidth: 1,
            borderColor: isDarkMode ? "#F6F8FA" : "#0A0911",
            color: "#FD6438",
            paddingHorizontal: 15,
            marginTop: 10,
            borderRadius: 10,
            backgroundColor: isDarkMode ? "#08070C" : "#FFFFFF"
        },
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
        MainImageContainer: {
            width: "100%",
            height: 300,
            marginTop: 30
        },
        EmptyImageContainer: {
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            borderWidth: 3,
            borderStyle: "dashed",
            borderColor: isDarkMode ? "#F6F8FA" : "#0A0911",
            borderRadius: 20,
            backgroundColor: isDarkMode ? "#08070C" : "#FFFFFF"
        },
        EmptyImageContainerText: {
            color: isDarkMode ? "#F6F8FA" : "#0A0911",
            fontSize: 18,
            fontFamily: "Manrope_600SemiBold",
            marginTop: 10
        },
        ImageContainer: {
            width: "100%",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
            borderWidth: 2,
            borderColor: isDarkMode ? "#F6F8FA" : "#0A0911",
            borderRadius: 20,
            backgroundColor: isDarkMode ? "#08070C" : "#FFFFFF"
        },
        GroupImage: { 
            width: "100%",
            height: "100%", 
            resizeMode: "contain",
            borderRadius: 200,
        },
        DeleteImageButtonContainer: {
            width: "100%",
            flexDirection: "row",
            justifyContent: "flex-end"
        },
        DeleteImageButton: {
            marginTop: 10,
            marginRight: 10
        },
    });
};

export const darkStyles = styles(true);
export const lightStyles = styles(false);