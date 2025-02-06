import { AuthContext } from "@/src/providers/AuthProvider";
import { supabase } from "@/src/utils/supabase";
import { router } from "expo-router";
import { useContext } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, View, Text } from "tamagui";

export default function Index() {
  const authContext = useContext(AuthContext);

  return (
    <SafeAreaView style={{ backgroundColor: "#25292e" }}>
      <Text color="white" fontSize="$8" pb="$4">
        Welcome, {authContext.user?.email?.split("@")[0]}!
      </Text>

      <View gap={"$8"} flexDirection="row" flexWrap="wrap" height="100%">
        <View
          height="$8"
          width="$8"
          borderWidth={2}
          borderColor="$white1"
          borderStyle='dotted'
          justify='center'
          style={{
            alignItems: 'center',
          }}
          onPress={() => router.push('/(tabs)')}
        >
          <Text color="white" fontSize="$8">
            +
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
