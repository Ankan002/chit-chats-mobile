import { StyleSheet } from "react-native";

const styles = (isDarkMode: boolean) => {
    return StyleSheet.create({
        SearchUserContainer: {
            flex: 1,
            // backgroundColor: "yellow",
            // paddingHorizontal: 15,
            paddingVertical: 10
        },
        SearchBoxContainer: {
            width: "100%",
            flexDirection: "row"
        },
        SearchTextBox: {
            fontFamily: "FiraCode_500Medium",
            flexGrow: 1,
            fontSize: 18,
            padding: 0,
            paddingVertical: 10,
            borderWidth: 1,
            borderColor: isDarkMode ? "#F6F8FA" : "#0A0911",
            color: "#FD6438",
            paddingHorizontal: 15,
            borderRadius: 10,
            backgroundColor: isDarkMode ? "#08070C" : "#FFFFFF",
        },
        SearchButton: {
            paddingVertical: 10,
            paddingHorizontal: 10,
            backgroundColor: "#FD6438",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 10,
            marginLeft: 10,
            minWidth: 24
        },
        UserList: {
            flexShrink: 1,
            width: "100%",
            marginTop: 10
        },
        EmptySearchResultBox: {
            flexGrow: 1,
            width: "100%",
            marginTop: 10,
            alignItems: "center",
            justifyContent: "center"
        },
        EmptySearchResultImage: {
            height: "30%",
            width: "100%",
            resizeMode: "contain"
        },
        EmptyText: {
            width: "100%",
            textAlign: "center",
            fontSize: 16,
            color: isDarkMode ? "#F6F8FA" : "#0A0911",
            fontFamily: "FiraCode_500Medium"
        }
    });
}

export const darkStyles = styles(true);
export const lightStyles = styles(false);