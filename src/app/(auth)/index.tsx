import { router } from "expo-router";
import { Button, Input, SizableText, Spinner, XStack, YStack } from "tamagui";
import useLogin from "./hooks/use-login";
import { useEffect } from "react";
import { supabase } from "@/src/utils/supabase";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function Index() {
  const { setEmail, setPass, isLoading, onSubmit, promptAsync } = useLogin();
  useEffect(() => {
    const checkSession = async () => {
      const session = await supabase.auth.getSession();
      if (session.data?.session) {
        router.replace("/(tabs)");
      }
    };

    // checkSession();
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
