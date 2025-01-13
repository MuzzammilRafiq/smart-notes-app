import { View, type ViewProps } from "react-native";

import { useThemeColor } from "~/src/hooks/useThemeColor";

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedView({
  style,
  lightColor,
  darkColor,
  ...otherProps
}: ThemedViewProps) {
  const backgroundColor = useThemeColor(
    { light: "#ffffff", dark: "#161b21" },
    "background"
  );

  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}
