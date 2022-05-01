import { DefaultTheme } from "@react-navigation/native";

const DarkNavigatorTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        card: "#0C0D16",
        border: "transparent",
    }
}

export default DarkNavigatorTheme