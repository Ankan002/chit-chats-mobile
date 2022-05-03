import { StyleSheet } from "react-native";

const styles = (isDarkMode: boolean) => {
    return StyleSheet.create({
        UserContainer: {
            minHeight: 80,
            width: "100%",
            backgroundColor: isDarkMode ? "#08070C" : "#FFFFFF",
            borderRadius: 10,
            padding: 10,
            marginTop: 15,
            flexDirection: "row",
            alignItems: "center",
            borderWidth: 1,
            borderColor: isDarkMode ? "rgba(255, 255, 255, 0.3)" : "rgba(0, 0, 0, 0.3)",
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
        UsernameText: {
            color: isDarkMode ? "#F6F8FA" : "#0A0911",
            fontSize: 16,
            fontFamily: "Manrope_700Bold"
        },
        NameText: {
            color: isDarkMode ? "#F6F8FA" : "#0A0911",
            fontSize: 14,
            fontFamily: "FiraCode_400Regular",
            marginTop: 4
        },
        SelectedBorder: {
            borderColor: "rgba(8, 205, 146, 0.5)"
        },
        SelectedText: {
            color: "#08CD92"
        }
    });
}

export const darkStyles = styles(true);
export const lightStyles = styles(false);