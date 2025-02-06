import { AuthContext } from "@/src/providers/AuthProvider";
import { router } from "expo-router";
import { useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, Image } from "tamagui";
import { useImageData } from "./hooks/use-image-data";

export default function Index() {
  const authContext = useContext(AuthContext);
  const { data } = useImageData();

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
          borderStyle="dotted"
          justify="center"
          style={{
            alignItems: "center",
          }}
          onPress={() => router.push("/(tabs)")}
        >
          <Text color="white" fontSize="$8">
            +
          </Text>
        </View>

        {data.map((e) => {
          return (
            <Image
              borderWidth={2}
              borderColor="$white1"
              src={`${process.env.EXPO_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${e["image_src"]}`}
              height="$8"
              width="$8"
            />
          );
        })}
      </View>
    </SafeAreaView>
  );
}
