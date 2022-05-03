import { StyleSheet } from "react-native";

const styles = (isDarkMode: boolean) => {
    return StyleSheet.create({
        Modal: {
            paddingHorizontal: 15,
            paddingVertical: 10,
            backgroundColor: isDarkMode ? "#10111A" : "#F6F8FA",
            flex: 1 
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