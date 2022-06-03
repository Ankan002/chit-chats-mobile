import { StyleSheet } from "react-native";

const styles = (isDarkMode: boolean) => {
    return StyleSheet.create({
        MessagesContainer: {
            flex: 1,
            width: "100%" 
        },
        EmptyImageContainer: {
            flexGrow: 1,
            width: "100%",
            alignItems: "center",
            justifyContent: "center"
        },
        EmptyImage: {
            width: "50%",
            height: "40%",
            resizeMode: "contain"
        },
        EmptyText: {
            fontFamily: "Manrope_500Medium",
            color: isDarkMode ? "#F6F8FA" : "#0A0911",
            fontSize: 16,
            marginTop: 10,
            textAlign: "center"
        },
        MessageFlatListStyle: {
            width: "100%",
            flexShrink: 1
        }
    });
};

export const darkStyles = styles(true);
export const lightStyles = styles(false);