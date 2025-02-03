import { supabase } from "@/utils/supabase";
import { router } from "expo-router";
import { useState } from "react";
import { Alert } from "react-native";

export const useRegister = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const isValid = confirmPass === pass && email !== "" && pass !== "";

  const onSubmit = async () => {
    const { error } = await supabase.auth.signUp({
      email,
      password: pass,
    });

    if (error) {
      Alert.alert(error.message);
    } else {
      Alert.alert('Successfully registered!');
      router.replace('/(auth)');
    }
  };

  return {
    setEmail,
    setPass,
    setConfirmPass,
    isValid,
    onSubmit,
  };
};
