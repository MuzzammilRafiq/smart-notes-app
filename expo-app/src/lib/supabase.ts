import { createClient } from "@supabase/supabase-js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
import * as aesjs from "aes-js";
import "react-native-get-random-values";

class LargeSecureStore {
  private async _encrypt(key: string, value: string) {
    const encryptionKey = crypto.getRandomValues(new Uint8Array(256 / 8));

    const cipher = new aesjs.ModeOfOperation.ctr(
      encryptionKey,
      new aesjs.Counter(1)
    );
    const encryptedBytes = cipher.encrypt(aesjs.utils.utf8.toBytes(value));

    await SecureStore.setItemAsync(
      key,
      aesjs.utils.hex.fromBytes(encryptionKey)
    );

    return aesjs.utils.hex.fromBytes(encryptedBytes);
  }

  private async _decrypt(key: string, value: string) {
    const encryptionKeyHex = await SecureStore.getItemAsync(key);
    if (!encryptionKeyHex) {
      return encryptionKeyHex;
    }

    const cipher = new aesjs.ModeOfOperation.ctr(
      aesjs.utils.hex.toBytes(encryptionKeyHex),
      new aesjs.Counter(1)
    );
    const decryptedBytes = cipher.decrypt(aesjs.utils.hex.toBytes(value));

    return aesjs.utils.utf8.fromBytes(decryptedBytes);
  }

  async getItem(key: string) {
    const encrypted = await AsyncStorage.getItem(key);
    if (!encrypted) {
      return encrypted;
    }

    return await this._decrypt(key, encrypted);
  }

  async removeItem(key: string) {
    await AsyncStorage.removeItem(key);
    await SecureStore.deleteItemAsync(key);
  }

  async setItem(key: string, value: string) {
    const encrypted = await this._encrypt(key, value);

    await AsyncStorage.setItem(key, encrypted);
  }
}

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: new LargeSecureStore(),
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

/**
 * !EXPLANATION
 * Let me explain this Supabase authentication setup code step by step:

Key Components:

* *Creates a Supabase client with secure storage in a React Native app
Uses encryption for secure data storage
Combines AsyncStorage and SecureStore for handling large encrypted data
LargeSecureStore Class:

Implements a custom storage solution compatible with Supabase auth
Has three main methods: getItem, setItem, and removeItem
Uses AES encryption in CTR mode
Encryption Process (_encrypt):

Generates random 256-bit encryption key
Encrypts data using AES-CTR mode
Stores encryption key in SecureStore
Stores encrypted data in AsyncStorage
Decryption Process (_decrypt):

Retrieves encryption key from SecureStore
Decrypts data using same AES-CTR mode
Returns decrypted UTF-8 string
Supabase Client Setup:

Uses environment variables for Supabase URL and anon key
Configures auth with custom storage solution
Enables auto token refresh and session persistence
The code solves a common problem in React Native where SecureStore has size limitations by:

Storing large encrypted data in AsyncStorage
Keeping small encryption keys in SecureStore
Providing transparent encryption/decryption
 */
