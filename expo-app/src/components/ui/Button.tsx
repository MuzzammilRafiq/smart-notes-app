import { Pressable, StyleSheet, Text, View } from "react-native";
import { forwardRef } from "react";
import { Colors } from "../../constants/Colors";

type ButtonProps = {
  text: string;
} & React.ComponentPropsWithoutRef<typeof Pressable>;

const Button = forwardRef<View | null, ButtonProps>(
  ({ text, ...pressableProps }, ref) => {
    return (
      <Pressable ref={ref} {...pressableProps} style={styles.container}>
        <Text style={styles.text}>{text}</Text>
      </Pressable>
    );
  }
);

Button.displayName = "Button";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#e15bb5",
    padding: 8,
    paddingHorizontal: 15,
    alignItems: "center",
    borderRadius: 5,
    marginVertical: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
  },
});

export default Button;
