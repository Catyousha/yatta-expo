import { router } from "expo-router";
import { Button, Input, SizableText, Spinner, XStack, YStack } from "tamagui";
import useLogin from "./hooks/use-login";
import { useContext, useEffect } from "react";
import { supabase } from "@/src/utils/supabase";
import AntDesign from "@expo/vector-icons/AntDesign";
import { AuthContext } from "@/src/providers/AuthProvider";

export default function Index() {
  const { setEmail, setPass, isLoading, onSubmit, promptAsync } = useLogin();
  const authContext = useContext(AuthContext);
  useEffect(() => {
    const checkSession = async () => {
      const user = await supabase.auth.getUser();
      if (user) {
        authContext.setUser?.(user.data.user!);
        router.replace("/(home)");
      }
    };

    checkSession();
  }, []);

  return (
    <YStack
      gap="$4"
      flex={1}
      verticalAlign="middle"
      justify="center"
      marginStart="$10"
      marginEnd="$10"
    >
      <SizableText size="$8" text="center" fontWeight="500">
        Login
      </SizableText>

      <Button
        onPress={() => (isLoading ? {} : promptAsync())}
        icon={<AntDesign name="google" />}
      >
        Login With Google
      </Button>

      <YStack gap="$2">
        <Input
          placeholder="Email..."
          autoCapitalize="none"
          onChangeText={setEmail}
        />
        <Input
          placeholder="Password..."
          secureTextEntry
          autoCapitalize="none"
          onChangeText={setPass}
        />
        <Button
          theme="black"
          onPress={() => onSubmit()}
          {...(isLoading && {
            disabled: true,
            icon: <Spinner />,
          })}
        >
          Login
        </Button>
      </YStack>

      <XStack gap="$2">
        <SizableText>Don't have any account?</SizableText>
        <SizableText
          textDecorationLine="underline"
          color="$blue10"
          onPress={() => router.push("/register")}
          pressStyle={{
            color: "blueviolet",
          }}
        >
          Register
        </SizableText>
      </XStack>
    </YStack>
  );
}
