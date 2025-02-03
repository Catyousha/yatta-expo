import { ImageSource, Image } from "expo-image";
import { StyleSheet } from "react-native";

type Props = {
  imgSource: ImageSource;
  onLayout?: (width: number, height: number) => void;
};

export default function ImageViewer(props: Props) {
  return (
    <Image 
      source={props.imgSource} 
      style={styles.image} 
      onLayout={(event) => {
        const { width, height } = event.nativeEvent.layout;
        props.onLayout?.(width, height);
      }}
    />
  );
}

const styles = StyleSheet.create({
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
});
