import { StyleSheet } from "react-native";

const styles = (isDarkMode: boolean) => {
    return StyleSheet.create({
        FormContainer: {
            flexGrow: 1,
            width: "100%",
            paddingHorizontal: 15,
            paddingVertical: 20
        },
        EmptyImageContainer: {
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
        EmptyImageContainerText: {
            color: isDarkMode ? "#F6F8FA" : "#0A0911",
            fontSize: 18,
            fontFamily: "Manrope_600SemiBold",
            marginTop: 10
        },
        ImageContainer: {
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
        ProfileImage: { 
            width: "100%",
            height: "100%", 
            resizeMode: "contain",
            borderRadius: 200,
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