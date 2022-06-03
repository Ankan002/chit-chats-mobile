import { View, Text, Image } from 'react-native'
import React from 'react'
import { isDarkModeAtom } from "../../atom/isDarkModeAtom";
import { userAtom } from "../../atom/userAtom";
import { useFonts, Manrope_400Regular } from "@expo-google-fonts/manrope";
import { useRecoilValue } from "recoil";
import { FetchedMessageType, UserType } from "../../types";
import { darkStyles, lightStyles } from './styles';

interface Props{
    message: FetchedMessageType;
}

const Message = (props: Props) => {
  const { message } = props;

  const [fontsLoaded] = useFonts({Manrope_400Regular});

  const isDarkMode = useRecoilValue<boolean>(isDarkModeAtom);
  const loggedInUser = useRecoilValue<UserType>(userAtom);

  return (
    <>
    <View style={isDarkMode ? darkStyles.MessageContainer : lightStyles.MessageContainer}>
        {
            (message.sender._id === loggedInUser._id && fontsLoaded) ? (
                <View style={isDarkMode ? darkStyles.MessageContainerSelf : lightStyles.MessageContainerSelf}>
                    <View style={isDarkMode ? darkStyles.ProfileImageContainer : lightStyles.ProfileImageContainer}>
                        <Image source={{uri: message.sender.image}} style={isDarkMode ? darkStyles.ProfileImage : lightStyles.ProfileImage} />
                    </View>
                    <Text style={isDarkMode ? [darkStyles.MessageText, darkStyles.MyMessageBackground] : [lightStyles.MessageText, lightStyles.MyMessageBackground]}>
                        {message.content}
                    </Text>
                </View>
            ) : (
                <>
                    <View style={isDarkMode ? darkStyles.ProfileImageContainer : lightStyles.ProfileImageContainer}>
                        <Image source={{uri: message.sender.image}} style={isDarkMode ? darkStyles.ProfileImage : lightStyles.ProfileImage} />
                    </View>
                    <Text style={isDarkMode ? [darkStyles.MessageText, darkStyles.OtherMessageBackground] : [lightStyles.MessageText, lightStyles.OtherMessageBackground]}>
                        {message.content}
                    </Text>
                </>
            )
        }
    </View>
    {
        message.media && (
            <View style={{
                width: "100%",
                flexDirection: `${message.sender._id === loggedInUser._id ? "row-reverse" : "row"}`
            }}>
                <View style={isDarkMode ? darkStyles.ImageContainer : lightStyles.ImageContainer}>
                    <Image source={{uri: message.media}} style={isDarkMode ? darkStyles.Media : lightStyles.Media} />
                </View>
            </View>
        )
    }
    </>
  )
}

export default Message