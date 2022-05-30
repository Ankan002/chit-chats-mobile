import { StyleSheet } from "react-native";

const styles = (isDarkMode: boolean) => {
    return StyleSheet.create({
        Container: {
            width: "100%",
            marginVertical: 10,
            flex: 1
        },
        FlatListStyle: {
            flexShrink: 1,
            width: "100%"
        }
    });
};

export const darkStyles = styles(true);
export const lightStyles = styles(false);