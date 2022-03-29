import { StyleSheet } from "react-native";

const styles = (isDarkMode: boolean) => {
    return StyleSheet.create({
        HeaderContainer: {
            width: "100%",
            height: "30%",
            backgroundColor: "gray",
            justifyContent: "center",
            alignItems: "center"
        }
    });
};

export const darkStyles = styles(true);
export const lightStyles = styles(false);