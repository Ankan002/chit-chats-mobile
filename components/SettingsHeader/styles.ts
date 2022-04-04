import { StyleSheet } from "react-native";

const styles = (isDarkMode: boolean) => {
    return StyleSheet.create({
        HeaderContainer: {
            width: "100%",
            height: "35%",
            justifyContent: "center",
            alignItems: "center"
        },
        ProfilePicture: {
            width: "40%", 
            height: "50%", 
            resizeMode: "contain",
            borderRadius: 200,
        },
        ProfileName: {
            fontSize: 16,
            color: (isDarkMode) ? "#FFFFFF" : "#141125",
            textAlign: "center",
            fontFamily: "Manrope_600SemiBold",
            marginTop: 5
        },
        ProfileUsername: {
            fontSize: 13,
            color: (isDarkMode) ? "#FFFFFF" : "#141125",
            paddingVertical: 5,
            paddingHorizontal: 15,
            fontFamily: "FiraCode_500Medium",
            marginTop: 5,
            backgroundColor: (isDarkMode) ? "#08070C" : "#FFFFFF",
            borderWidth: 1,
            borderColor: "#9299A5",
            borderRadius: 30
        }
    });
};

export const darkStyles = styles(true);
export const lightStyles = styles(false);