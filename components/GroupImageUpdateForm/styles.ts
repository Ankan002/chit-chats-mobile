import { StyleSheet } from "react-native";

const styles = (isDarkMode: boolean) => {
    return StyleSheet.create({
        FormContainer: {
            width: "100%",
            flexGrow: 1
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
        NewGroupImage: { 
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
        UpdateButtonContainer: {
            flexGrow: 1,
            width: "100%",
            justifyContent: "flex-end",
            alignItems: "center",
            paddingBottom: 30
        },
        UpdateButton: {
            minWidth: "70%",
            borderRadius: 10,
            paddingHorizontal: 25,
            paddingVertical: 10,
            backgroundColor: '#FD6438',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center'
        },
        UpdateText: {
            fontFamily: "Manrope_700Bold",
            color: isDarkMode ? "#0A0911" : "#F6F8FA",
            fontSize: 20
        },
    });
};

export const darkStyles = styles(true);
export const lightStyles = styles(false);