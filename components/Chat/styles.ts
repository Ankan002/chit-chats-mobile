import { StyleSheet } from "react-native";

const styles = (isDarkMode: boolean) => {
    return StyleSheet.create({
        ChatContainer: {
            minHeight: 80,
            width: "100%",
            backgroundColor: isDarkMode ? "#08070C" : "#FFFFFF",
            borderRadius: 10,
            padding: 10,
            marginTop: 15,
            flexDirection: "row",
            alignItems: "center",
        },
        ImageContainer: {
            width: 60,
            height: 60
        },
        ImageStyle: {
            width: "100%",
            height: "100%",
            resizeMode: "cover",
            borderRadius: 200,
        },
        DetailsContainer: {
            flexShrink: 1,
            height: 60,
            justifyContent: "center",
            marginLeft: 10
        },
        ChatName: {
            color: isDarkMode ? "#F6F8FA" : "#0A0911",
            fontSize: 16,
            fontFamily: "Manrope_700Bold"
        },
        ChatText: {
            color: isDarkMode ? "#F6F8FA" : "#0A0911",
            fontSize: 14,
            fontFamily: "Manrope_400Regular",
            marginTop: 4
        }
    });
};

export const darkStyles = styles(true);
export const lightStyles = styles(false);