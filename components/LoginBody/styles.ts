import {StyleSheet} from 'react-native';

const styles = (isDarkMode: Boolean) => {
    return StyleSheet.create({
        BodyContainer: {
            width: '100%',
            alignItems: 'center',
            height: '60%',
            justifyContent: 'center',
        },
        LoginImage: {
            width: '70%',
            height: '50%',
            resizeMode: 'contain'
        },
        TextContainer: {
            width: '100%',
            marginTop: '10%',
            alignItems: 'center'
        },
        TagLine: {
            color: (isDarkMode) ? '#FD6438' : '#FD6438',
            maxWidth: '70%',
            fontFamily: 'Manrope_500Medium',
            fontSize: 25,
            fontWeight: '700',
            textAlign: 'center' 
        },
        TagDescription: {
            color: (isDarkMode) ? '#DE834D' : '#DE834D',
            maxWidth: '70%',
            fontFamily: 'Manrope_400Regular',
            fontSize: 12,
            textAlign: 'center',
            fontWeight: '300',
            marginTop: 10,
        }
    });
};

export const lightStyles = styles(false);
export const darkStyles = styles(true);