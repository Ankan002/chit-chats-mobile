import { StyleSheet } from "react-native";

const styles = (isDarkMode: boolean) => {
    return StyleSheet.create({
        ChatsSectionContainer: {
            flex: 1,
            width: "100%",
            paddingHorizontal: 15,
            paddingVertical: 10
        },
        EmptyContainer: {
            flexGrow: 1,
            width: "100%",
            alignItems: "center",
            justifyContent: "center"
        },
        EmptyImage: {
            width: "40%",
            height: "20%",
            resizeMode: "contain"
        },
        EmptyText: {
            fontFamily: "Manrope_500Medium",
            color: isDarkMode ? "#F6F8FA" : "#0A0911",
            fontSize: 18,
            marginTop: 10,
            textAlign: "center"
        },
        FlatListStyle: {
            flexShrink: 1
        },
        LoadingSection: {
            flexGrow: 1,
            width: "100%",
            alignItems: "center",
            justifyContent: "center"
        }
    });
};

export const darkStyles = styles(true);
export const lightStyles = styles(false);