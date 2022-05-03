import { StyleSheet } from "react-native";

const styles = (isDarkMode: boolean) => {
    return StyleSheet.create({
        FormContainer: {
            flexGrow: 1,
            width: "100%",
            paddingHorizontal: 10
        },
        LabelText: {
            fontSize: 16,
            fontFamily: "Manrope_500Medium",
            color: isDarkMode ? "#F6F8FA" : "#0A0911",
            marginTop: 20
        },
        NameInputText: {
            fontFamily: "FiraCode_500Medium",
            fontSize: 18,
            padding: 0,
            paddingVertical: 10,
            borderWidth: 1,
            borderColor: isDarkMode ? "#F6F8FA" : "#0A0911",
            color: "#FD6438",
            paddingHorizontal: 15,
            marginTop: 10,
            borderRadius: 10,
            backgroundColor: isDarkMode ? "#08070C" : "#FFFFFF"
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
        Modal: {
            paddingHorizontal: 15,
            paddingVertical: 10,
            backgroundColor: isDarkMode ? "#10111A" : "#F6F8FA",
            flex: 1 
        },
        SearchUserModalContainer: {
            width: "100%",
            flexGrow: 1,
            marginTop: 10
        },
        MainImageContainer: {
            width: "100%",
            height: 300,
            marginTop: 30
        },
        EmptyImageContainer: {
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            borderWidth: 3,
            borderStyle: "dashed",
            borderColor: isDarkMode ? "#F6F8FA" : "#0A0911",
            borderRadius: 20,
            backgroundColor: isDarkMode ? "#08070C" : "#FFFFFF"
        },
        EmptyImageContainerText: {
            color: isDarkMode ? "#F6F8FA" : "#0A0911",
            fontSize: 18,
            fontFamily: "Manrope_600SemiBold",
            marginTop: 10
        },
        ImageContainer: {
            width: "100%",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
            borderWidth: 2,
            borderColor: isDarkMode ? "#F6F8FA" : "#0A0911",
            borderRadius: 20,
            backgroundColor: isDarkMode ? "#08070C" : "#FFFFFF"
        },
        GroupImage: { 
            width: "100%",
            height: "100%", 
            resizeMode: "contain",
            borderRadius: 200,
        },
        DeleteImageButtonContainer: {
            width: "100%",
            flexDirection: "row",
            justifyContent: "flex-end"
        },
        DeleteImageButton: {
            marginTop: 10,
            marginRight: 10
        },
        CreateGroupButtonContainer: {
            flexGrow: 1,
            width: "100%",
            justifyContent: "flex-end",
            alignItems: "center",
            paddingBottom: 30
        },
        CreateGroupButton: {
            minWidth: "70%",
            borderRadius: 10,
            paddingHorizontal: 25,
            paddingVertical: 10,
            backgroundColor: '#FD6438',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center'
        },
        CreateGroupText: {
            fontFamily: "Manrope_700Bold",
            color: isDarkMode ? "#0A0911" : "#F6F8FA",
            fontSize: 20
        },
    });
};

export const darkStyles = styles(true);
export const lightStyles = styles(false);