import {GoogleSignin, statusCodes} from "@react-native-google-signin/google-signin";
import Constants from "expo-constants";

import axios from "axios";
import {getUsername} from "../get-username";

export const SignIn = async () => {
    GoogleSignin.configure({
        webClientId: Constants.manifest?.extra?.webClientId
    });

    try{
        const {user} = await GoogleSignin.signIn();

        const response = await axios.post(`${Constants.manifest?.extra?.apiEndpoint}/auth/login`, {
            email: user.email,
            name: user.name,
            username: getUsername(user.email),
            providerId: user.id,
            image: user.photo
        });

        return {
            success: response.data.success,
            token: response.headers.authtoken
        };
    }
    catch(error: any){
        if(statusCodes.SIGN_IN_CANCELLED){
            return {
                success: false
            }
        }
        return {
            success: false,
            error: JSON.stringify(error?.response?.data)
        };
    }    
};