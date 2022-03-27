import { StyleSheet } from "react-native";

const styles = (isDarkMode: Boolean) => {
    return StyleSheet.create({
        HeaderContainer: {
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 20
        },
        HeaderText: {
            fontFamily: 'Manrope_400Regular',
            fontSize: 16,
            color: (isDarkMode) ? '#FD6438' : '#FD6438',
            fontWeight: '700',
            textAlign: 'center'
        }
    });
};

export const lightStyles = styles(false);
export const darkStyles = styles(true);