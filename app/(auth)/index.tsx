import { router } from "expo-router";
import { Button, Input, SizableText, Text, XStack, YStack } from "tamagui";

export default function Index() {
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

      <YStack gap="$2">
        <Input placeholder="Email..." autoCapitalize="none" />
        <Input
          placeholder="Password..."
          secureTextEntry
          autoCapitalize="none"
        />
        <Button theme='black'>Login</Button>
      </YStack>

      <XStack gap="$2">
        <SizableText>Don't have any account?</SizableText>
        <SizableText
          textDecorationLine="underline"
          color="$blue10"
          onPress={() => router.push('/register')}
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
