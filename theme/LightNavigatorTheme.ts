import { DefaultTheme } from "@react-navigation/native";

const LightNavigatorTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        card: "#F3F5F9",
        border: "transparent",
    }
}

export default LightNavigatorTheme;