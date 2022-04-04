import {StyleSheet} from 'react-native';

const styles = (isDarkMode: Boolean) => {
    return StyleSheet.create({
        LoginSection: {
            height: '100%',
            width: '100%',
            alignItems: 'center',
            paddingTop: '15%'
        },
        LoginButton: {
            width: '70%',
            height: '7%',
            borderRadius: 10,
            padding: 10,
            backgroundColor: (isDarkMode) ? '#FD6438' : '#FD6438',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center'
        },
        LoginText: {
            fontFamily: 'Roboto_400Regular',
            color: (isDarkMode) ? '#000000' : '#FAFAFC',
            fontSize: 18,
            marginLeft: 10
        },
        LoadingStyle: {
            marginTop: 15
        }
    });
};

export const darkStyles = styles(true);
export const lightStyles = styles(false);