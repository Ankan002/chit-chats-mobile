import { StyleSheet } from "react-native";

const styles = (isDarkMode: boolean) => {
    return StyleSheet.create({
        Container: {
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 15,
            paddingRight: 5
        },
        SettingName: {
            fontFamily: "Manrope_500Medium",
            fontSize: 17,
            color: isDarkMode ? "#FAFAFC" : "#131517",
            fontWeight: "600"
        }
    });
};

export const darkStyles = styles(true);
export const lightStyles = styles(false);