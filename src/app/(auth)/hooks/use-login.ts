import { supabase } from "@/src/utils/supabase";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import * as Google from "expo-auth-session/providers/google";

const useLogin = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async () => {
    if (email === "" || pass === "") return;
    setIsLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password: pass,
    });

    setIsLoading(false);
    if (error) {
      Alert.alert(error.message);
    } else {
      router.replace("/(tabs)");
    }
  };

  const [_, response, promptAsync] = Google.useAuthRequest({
    iosClientId: process.env.EXPO_PUBLIC_GOOGLE_AUTH_IOS_CLIENT_ID,
    androidClientId: process.env.EXPO_PUBLIC_GOOGLE_AUTH_ANDROID_CLIENT_ID,
    webClientId: process.env.EXPO_PUBLIC_GOOGLE_AUTH_WEB_CLIENT_ID,
  });

  const onLoginGoogle = async () => {
    if (response?.type !== "success") return;
    const token = response.authentication?.idToken;
    const { data, error } = await supabase.auth.signInWithIdToken({
      provider: "google",
      token: token!,
    });
    if (!error) {
      router.replace("/(tabs)");
    } else {
      Alert.alert(error.message);
    }
  };

  useEffect(() => {
    onLoginGoogle();
  }, [response?.type]);

  return {
    setEmail,
    setPass,
    isLoading,
    onSubmit,
    promptAsync,
  };
};

export default useLogin;
