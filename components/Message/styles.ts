import { StyleSheet } from "react-native";

const styles = (isDarkMode: boolean) => {
    return StyleSheet.create({
        MessageContainer: {
            width: "100%",
            flexDirection: "row",
        },
        MessageContainerSelf: {
            width: "100%",
            flexDirection: "row-reverse",
        },
        MessageText: {
            fontFamily: "Manrope_400Regular",
            fontSize: 16,
            color: isDarkMode ? "#0A0911" : "#F6F8FA",
            marginTop: 10,
            paddingVertical: 5,
            paddingHorizontal: 10,
            maxWidth: "70%",
            borderRadius: 10
        },
        OtherMessageBackground: {
            backgroundColor :"#08CD92"
        },
        MyMessageBackground: {
            backgroundColor: "#FC5A31"
        },
        ProfileImageContainer: {
            justifyContent: "flex-end"
        },
        ProfileImage: {
            height: 25,
            width: 25,
            resizeMode: "cover",
            borderRadius: 15,
            marginHorizontal: 5
        },
        ImageContainer: {
            width: "70%",
            alignItems: "flex-end"
        },
        Media: {
            width: "100%",
            height: 150,
            resizeMode: "contain",
            marginTop: 10,
            alignSelf: "flex-end"
        }
    });
};


export const darkStyles = styles(true);
export const lightStyles = styles(false);