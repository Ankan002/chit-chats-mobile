import { StyleSheet } from "react-native";

const styles = (isDarkMode: boolean) => {
    return StyleSheet.create({
        MainContainer: {
            width: "100%",
            flexGrow: 1
        },
        SelectedUsersContainer: {
            width: "100%",
            height: 60,
            padding: 10,
            backgroundColor: isDarkMode ? "#08070C" : "#FFFFFF",
            borderWidth: 1,
            borderColor: isDarkMode ? "#F6F8FA" : "#0A0911",
            borderRadius: 10,
            justifyContent: "center",
            marginTop: 5
        },
        EmptySelectedUsersContainer: {
            width: "100%",
            height: "100%",
            flexDirection: "row",
            alignItems: "center"
        },
        EmptySelectedUsersText: {
            fontSize: 16,
            fontFamily: "Manrope_500Medium",
            color: isDarkMode ? "#F6F8FA" : "#0A0911",
            textAlign: "center",
            width: "100%"
        },
        SelectedUsersFlatList: {
            height: "100%",
            flexShrink: 1
        },
        AddUsersButtonContainer: {
            flexShrink: 1,
            width: "100%",
            justifyContent: "flex-end",
            alignItems: "center",
            paddingBottom: 20
        },
        AddUsersButton: {
            minWidth: "70%",
            borderRadius: 10,
            paddingHorizontal: 25,
            paddingVertical: 10,
            backgroundColor: '#FD6438',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center'
        },
        AddUsersText: {
            fontFamily: "Manrope_700Bold",
            color: isDarkMode ? "#0A0911" : "#F6F8FA",
            fontSize: 20
        },
    });
};

export const darkStyles = styles(true);
export const lightStyles = styles(false);