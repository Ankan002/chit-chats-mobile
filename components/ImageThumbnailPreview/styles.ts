import { StyleSheet } from "react-native";

const styles = (isDarkMode: boolean) => {
    return StyleSheet.create({
        MainContainer: {
            width: "100%",
            height: 80,
            flexDirection: "row",
            marginTop: 25,
            marginBottom: 10,
            alignItems: "center"
        },
        EmptyContainer: {
            height: "100%",
            width: "100%",
            padding: 10,
            flexDirection: "row",
            alignItems: "center",
            borderWidth: 1,
            borderColor: isDarkMode ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0.7)",
            borderStyle: "dashed",
            justifyContent: "center",
            borderRadius: 20
        },
        ThumbnailContainer: {
            height: "100%",
            width: "100%",
            padding: 10,
            marginTop: 10,
            flexDirection: "row",
            alignItems: "center",
            borderWidth: 1,
            borderColor: isDarkMode ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0.7)",
            borderRadius: 20
        },
        EmptyText: {
            fontSize: 16,
            fontFamily: "Manrope_500Medium",
            color: isDarkMode ? "#F6F8FA" : "#0A0911",
            textAlign: "center"
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
        AssertiveText: {
            color: isDarkMode ? "#F6F8FA" : "#0A0911",
            fontSize: 16,
            fontFamily: "Manrope_500Medium"
        },
        InfoText: {
            color: isDarkMode ? "#F6F8FA" : "#0A0911",
            fontSize: 13,
            fontFamily: "FiraCode_400Regular",
            marginTop: 4
        }
    });
};

export const darkStyles = styles(true);
export const lightStyles = styles(false);