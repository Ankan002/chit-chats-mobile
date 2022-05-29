import { StyleSheet } from "react-native";

const styles = (isDarkMode: boolean) => {
    return StyleSheet.create({
        BodyContainer: {
            flexShrink: 1,
            width: "100%",
            paddingVertical: 2
        },
        LabelText: {
            fontSize: 16,
            fontFamily: "Manrope_500Medium",
            color: isDarkMode ? "#F6F8FA" : "#0A0911",
            marginTop: 20
        },
        DetailsText: {
            fontFamily: "FiraCode_500Medium",
            fontSize: 18,
            padding: 5,
            borderWidth: 1,
            borderColor: isDarkMode ? "#F6F8FA" : "#0A0911",
            color: "#FD6438",
            paddingHorizontal: 10,
            marginTop: 10,
            borderRadius: 10,
            backgroundColor: isDarkMode ? "#08070C" : "#FFFFFF"
        },
    });
};

export const darkStyles = styles(true);
export const lightStyles = styles(false);