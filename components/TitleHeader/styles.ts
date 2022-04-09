import { StyleSheet } from "react-native";

const styles = (isDarkMode: boolean) => {
    return StyleSheet.create({
        Container: {
            width: "100%",
            paddingVertical: 10,
            justifyContent: "center",
            alignItems: "center"
        },
        HeadingText: {
            fontFamily: "Manrope_600SemiBold",
            fontSize: 25,
            textAlign: "center",
            color: isDarkMode ? "#FAFAFC" : "#131517",
        }
    });
};

export const darkStyles = styles(true);
export const lightStyles = styles(false);