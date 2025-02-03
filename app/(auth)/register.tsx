import { router } from "expo-router";
import { Button, Input, SizableText, XStack, YStack } from "tamagui";
import { useRegister } from "./hooks/use-register";

export default function RegisterScreen() {
  const {
    setEmail,
    setPass,
    setConfirmPass,
    isValid,
    onSubmit
  } = useRegister();
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
        Register
      </SizableText>

      <YStack gap="$2">
        <Input
          placeholder="Email..."
          autoCapitalize="none"
          onChangeText={(e) => setEmail(e)}
        />
        <Input
          placeholder="Password..."
          secureTextEntry
          autoCapitalize="none"
          onChangeText={(e) => setPass(e)}
        />
        <Input
          placeholder="Confirm password..."
          secureTextEntry
          autoCapitalize="none"
          onChangeText={(e) => setConfirmPass(e)}
        />

        <Button
          theme="black"
          {...(!isValid && {
            disabled: true,
            opacity: 0.5,
          })}
          onPress={onSubmit}
        >
          Register
        </Button>
      </YStack>

      <XStack gap="$2">
        <SizableText>Already have an account?</SizableText>
        <SizableText
          textDecorationLine="underline"
          color="$blue10"
          onPress={() => {
            router.dismissTo("/(auth)");
          }}
          pressStyle={{
            color: "blueviolet",
          }}
        >
          Login
        </SizableText>
      </XStack>
    </YStack>
  );
}
