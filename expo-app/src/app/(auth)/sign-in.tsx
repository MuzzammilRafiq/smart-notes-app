import { TextInput, StyleSheet, Alert, useColorScheme } from "react-native";
import React, { useState } from "react";
import Button from "../../components/ui/Button";
import { Link } from "expo-router";
import { supabase } from "~/src/supabase/supabase";
import { Colors } from "~/src/constants/Colors";
import { ThemedText } from "~/src/components/ui/ThemedText";
import Logo from "~/src/components/ui/Logo";
import { ThemedView } from "~/src/components/ui/ThemedView";
// import Logo from "../../components/ui/logo.svg"; // Adjust the path as necessary

const SignInScreen = () => {
  const theme = useColorScheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) Alert.alert("Error", error.message);
    setLoading(false);
  }

  return (
    <ThemedView style={styles.container}>
      <Logo width={150} height={150} style={styles.logo} />
      <ThemedText style={styles.heading}>Smart Notes App</ThemedText>
      <ThemedText style={styles.subHeading}>Powered by AI✨</ThemedText>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="mzml@rafiq.com"
        placeholderTextColor="grey"
        style={[styles.input, theme === "dark" && styles.darkInput]}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="password"
        placeholderTextColor="grey"
        style={[styles.input, theme === "dark" && styles.darkInput]}
        secureTextEntry
      />
      <Button
        onPress={signInWithEmail}
        disabled={loading}
        text={loading ? "Signing in..." : "Sign in"}
      />
      <Link href="/sign-up">
        <ThemedText>Create an account</ThemedText>
      </Link>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  logo: {
    marginBottom: 10,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#f15bb5",
    marginBottom: 10,
  },
  subHeading: {
    fontSize: 12,
    color: "gray",
    marginBottom: 30,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: Colors.dark.text,
    alignSelf: "flex-start",
    marginBottom: 5,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    marginBottom: 20,
  },
  darkInput: {
    backgroundColor: "#404045",
    color: "white",
  },
  textButton: {
    marginTop: 15,
    fontSize: 14,
    backgroundColor: "#e15bb5",
    padding: 3,
    paddingHorizontal: 6,
    borderRadius: 5,
    textDecorationLine: "underline",
  },
});

export default SignInScreen;
