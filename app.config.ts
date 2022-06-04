import "dotenv/config";

export default {
    expo: {
        name: "Chit Chats",
        slug: "chit-chats-mobile",
        version: "1.0.0",
        orientation: "portrait",
        icon: "./assets/images/icon.png",
        scheme: "myapp",
        userInterfaceStyle: "automatic",
        splash: {
            image: "./assets/images/splash.png",
            resizeMode: "contain",
            backgroundColor: "#10111A"
        },
        updates: {
            fallbackToCacheTimeout: 0,
        },
        assetBundlePatterns: ["**/*"],
        ios: {
            supportsTablet: true,
            bundleIdentifier: "com.exponents.chitChats",
            googleServicesFile: "./GoogleService-Info.plist",
        },
        android: {
            adaptiveIcon: {
                foregroundImage: "./assets/images/adaptive-icon.png",
                backgroundColor: "#ffffff",
            },
            package: "com.exponents.chitChats",
            googleServicesFile: "./GoogleService-Info.json",
        },
        plugins: [
            "@react-native-firebase/app",
            "@react-native-google-signin/google-signin",
            [
                "expo-notifications",
                {
                    icon: "./assets/images/icon.png",
                    color: "#ffffff",
                },
            ],
        ],
        web: {
            favicon: "./assets/images/favicon.png",
        },
        extra: {
            webClientId: process.env.WEB_CLIENT_ID,
            apiEndpoint: process.env.API_ENDPOINT,
            socketEndpoint: process.env.SOCKET_ENDPOINT
        },
        androidStatusBar: {
            barStyle: "light-content",
            backgroundColor: "#10111A"
        }
    },
};
