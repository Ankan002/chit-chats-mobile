import Toast, { SuccessToast, ErrorToast, ToastProps } from 'react-native-toast-message';
import { useRecoilValue } from "recoil";
import { isDarkModeAtom } from "../atom";
import { useFonts, Manrope_500Medium, Manrope_400Regular } from "@expo-google-fonts/manrope";

/*
  1. Create the config
*/
export const toastConfig = {
  success: (props: ToastProps) => {
    const [fontsLoaded] = useFonts({Manrope_500Medium, Manrope_400Regular});
    const isDarkMode = useRecoilValue<boolean>(isDarkModeAtom);
    return (
      <>
        {
          fontsLoaded && (
            <SuccessToast
              {...props}
              style={{
                backgroundColor: isDarkMode ? "#08070C" : "#FFFFFF",
                borderColor: "#08CD92",
                borderWidth: 1,
                borderRadius: 10
              }}
              contentContainerStyle={{
                paddingHorizontal: 15,
              }}
              text1Style={{
                fontSize: 16,
                fontWeight: '500',
                fontFamily: "Manrope_500Medium",
                color: "#08CD92"
              }}
              text2Style={{
                fontSize: 14,
                fontWeight: '500',
                fontFamily: "Manrope_400Regular",
                color: isDarkMode ? "#F6F8FA" : "#0A0911"
              }}
            />
          )
        }
      </>
    )
  },
  error: (props: ToastProps) => {
    const [fontsLoaded] = useFonts({Manrope_500Medium, Manrope_400Regular});
    const isDarkMode = useRecoilValue<boolean>(isDarkModeAtom);
    return (
      <>
        {
          fontsLoaded && (
            <ErrorToast
              {...props}
              style={{
                backgroundColor: isDarkMode ? "#08070C" : "#FFFFFF",
                borderColor: "#D61C4E",
                borderWidth: 1,
                borderRadius: 10
              }}
              contentContainerStyle={{
                paddingHorizontal: 15,
              }}
              text1Style={{
                fontSize: 16,
                fontWeight: '500',
                fontFamily: "Manrope_500Medium",
                color: "#D61C4E"
              }}
              text2Style={{
                fontSize: 14,
                fontWeight: '500',
                fontFamily: "Manrope_400Regular",
                color: isDarkMode ? "#F6F8FA" : "#0A0911"
              }}
            />
          )
        }
      </>
    )
  },

};