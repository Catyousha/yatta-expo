import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import { View, StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useRef, useState } from "react";
import { captureRef } from "react-native-view-shot";

import ImageViewer from "@/src/components/ImageViewer";
import IconButton from "@/src/components/IconButton";
import CircleButton from "@/src/components/CircleButton";
import EmojiPicker from "@/src/components/EmojiPicker";
import { ImageSource } from "expo-image";
import EmojiList from "@/src/components/EmojiList";
import EmojiSticker from "@/src/components/EmojiSticker";
import { YStack, Button } from "tamagui";
import { Image } from '@tamagui/lucide-icons'

const PlaceholderImage = require("@/assets/images/background-image.png");

export default function Index() {
  const [status, requestPermission] = MediaLibrary.usePermissions();

  const [selectedImage, setSelectedImage] = useState<string | undefined>(
    undefined
  );
  const [isShowAppOptions, setIsShowAppOptions] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [pickedEmoji, setPickedEmoji] = useState<ImageSource | undefined>(
    undefined
  );
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const imageRef = useRef<View>(null);

  if (status === null) {
    requestPermission();
  }

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setIsShowAppOptions(true);
    } else {
      alert("canceled");
    }
  };

  const onReset = () => {
    setIsShowAppOptions(false);
  };

  const onAddSticker = () => {
    setIsModalVisible(true);
  };

  const onModalClose = () => {
    setIsModalVisible(false);
  };

  const onSaveImageAsync = async () => {
    try {
      const localUri = await captureRef(imageRef, {
        height: 440,
        quality: 1,
      });

      await MediaLibrary.saveToLibraryAsync(localUri);
      if (localUri) {
        alert("Saved!");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.imageContainer}>
        <View ref={imageRef} collapsable={false}>
          <ImageViewer
            imgSource={selectedImage ?? PlaceholderImage}
            onLayout={(width, height) => setImageSize({ width, height })}
          />
          {pickedEmoji && (
            <EmojiSticker
              imageSize={40}
              stickerSource={pickedEmoji}
              containerWidth={imageSize.width}
              containerHeight={imageSize.height}
            />
          )}
        </View>
      </View>
      {isShowAppOptions ? (
        <View style={styles.optionsContainer}>
          <View style={styles.optionsRow}>
            <IconButton icon="refresh" label="Reset" onPress={onReset} />
            <CircleButton onPress={onAddSticker} />
            <IconButton
              icon="save-alt"
              label="Save"
              onPress={onSaveImageAsync}
            />
          </View>
        </View>
      ) : (
        <YStack gap="$2" style={styles.optionsContainer}>
          <Button size='$5' icon={Image} onPress={pickImageAsync}>Choose a photo</Button>
          <Button size='$5' variant='outlined' color='white'>Use this photo </Button>
        </YStack>
      )}
      <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
        <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose} />
      </EmojiPicker>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    flex: 1,
  },
  optionsContainer: {
    position: "absolute",
    bottom: 60,
  },
  optionsRow: {
    alignItems: "center",
    flexDirection: "row",
  },
});
