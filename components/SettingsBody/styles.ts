import { StyleSheet } from "react-native";

const styles = (isDarkMode: boolean) => {
    return StyleSheet.create({
        BodyContainer: {
            width: "100%",
            paddingHorizontal: 15
        }
    });
};

export const lightStyles = styles(false);
export const darkStyles = styles(true);