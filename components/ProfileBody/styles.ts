import { StyleSheet } from "react-native";

const styles = (isDarkMode: boolean) => {
    return StyleSheet.create({
        BodyContainer: {
            flex: 1,
            width: "100%",
            paddingHorizontal: 15,
            paddingVertical: 2
        },
        LabelText: {
            fontSize: 16,
            fontFamily: "Manrope_500Medium",
            color: isDarkMode ? "#F6F8FA" : "#0A0911",
            marginTop: 20
        },
        DetailsText: {
            fontFamily: "FiraCode_500Medium",
            fontSize: 18,
            padding: 5,
            borderWidth: 1,
            borderColor: isDarkMode ? "#F6F8FA" : "#0A0911",
            color: "#FD6438",
            paddingHorizontal: 15,
            marginTop: 10,
            borderRadius: 10,
            backgroundColor: isDarkMode ? "#08070C" : "#FFFFFF"
        },
        ButtonContainer: {
            flex: 1,
            width: "100%",
            justifyContent: "flex-end",
            alignItems: "center",
            paddingBottom: 30,
            marginTop: 40
        },
        ConnectButton: {
            minWidth: "70%",
            borderRadius: 10,
            paddingHorizontal: 25,
            paddingVertical: 10,
            backgroundColor: '#FD6438',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center'
        },
        ConnectText: {
            fontFamily: "Manrope_700Bold",
            color: isDarkMode ? "#0A0911" : "#F6F8FA",
            fontSize: 20
        },
    });
};

export const darkStyles = styles(true);
export const lightStyles = styles(false);