import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Stack } from "expo-router";

export default function TabLayout() {
  return (
    <Stack screenOptions={{headerShown: false}}>
      <Stack.Screen name="(tabs)"/>
    </Stack>
  );
}
