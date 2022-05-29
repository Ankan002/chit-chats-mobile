import { StyleSheet } from "react-native";

const styles = (isDarkMode: boolean) => {
    return StyleSheet.create({
        HeaderContainer: {
            width: "100%",
            height: "35%",
            justifyContent: "center",
            alignItems: "center"
        },
        GroupImageContainer: {
            //TODO: Might need to change to constant size
            width: "40%",
            height: "50%"
        },
        GroupImageStyles: {
            width: "100%", 
            height: "100%", 
            resizeMode: "contain",
            borderRadius: 200,
        },
        EditImageButton: {
            paddingVertical: 5,
            paddingHorizontal: 15,
            marginTop: 15,
            backgroundColor: (isDarkMode) ? "#08070C" : "#FFFFFF",
            borderWidth: 1,
            borderColor: "#9299A5",
            borderRadius: 30
        },
        EditImageButtonText: {
            fontSize: 13,
            color: (isDarkMode) ? "#FFFFFF" : "#141125",
            fontFamily: "FiraCode_500Medium",
        },
        NonAdminGroupName: {
            fontSize: 16,
            color: (isDarkMode) ? "#FFFFFF" : "#141125",
            textAlign: "center",
            fontFamily: "Manrope_600SemiBold",
            marginTop: 5
        },
        AdminGroupNameSection: {
            width: "100%",
            justifyContent: "center"
        },
        AdminGroupNameLabelText: {
            fontSize: 16,
            fontFamily: "Manrope_600SemiBold",
            color: isDarkMode ? "#F6F8FA" : "#0A0911",
            marginTop: 20
        },
        AdminCurrentGroupNameDisplay: {
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
        },
        AdminGroupNameView: {
            flexShrink: 1,
            padding: 5,
            borderWidth: 1,
            borderColor: isDarkMode ? "#F6F8FA" : "#0A0911",
            paddingHorizontal: 15,
            marginTop: 10,
            borderRadius: 10,
            backgroundColor: isDarkMode ? "#08070C" : "#FFFFFF",
            minWidth: "85%"
        },
        CurrentGroupName: {
            fontFamily: "FiraCode_500Medium",
            fontSize: 18,
            color: "#FD6438",
            flexShrink: 1
        },
        ChangeNameButton: {
            marginLeft: 10,
            padding: 5,
            borderWidth: 1,
            borderColor: isDarkMode ? "#F6F8FA" : "#0A0911",
            borderRadius: 10,
            backgroundColor: isDarkMode ? "#08070C" : "#FFFFFF",
            justifyContent: "center",
            alignItems: "center",
            paddingVertical: 10,
            marginTop: 10
        }
    });
};

export const darkStyles = styles(true);
export const lightStyles = styles(false);

