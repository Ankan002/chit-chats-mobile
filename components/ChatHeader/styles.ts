import {StyleSheet} from "react-native";

const styles = (isDarkMode: boolean) => {
    return StyleSheet.create({
        Header: {
            width: "100%",
            height: "5%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 15
        },
        GreetingSection: {
            height: "100%",
            flexDirection: "row",
            alignItems: "center"
        },
        Emoji: {
            fontSize: 22,
        },
        BoldText: {
            fontWeight: "700",
            fontSize: 22,
            color: isDarkMode ? "#FAFAFC" : "#131517",
            fontFamily: "Manrope_700Bold"
        },
        NormalText: {
            fontWeight: "500",
            fontSize: 22,
            color: "#86888A",
            fontFamily: "Manrope_500Medium"
        }
    });
};

export const darkStyles = styles(true);
export const lightStyles = styles(false);