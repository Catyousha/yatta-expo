import { ImageSource, Image } from "expo-image";
import { View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

type Props = {
  imageSize: number;
  stickerSource: ImageSource;
  containerWidth: number;
  containerHeight: number;
};

export default function (props: Props) {
  const scaleImage = useSharedValue(props.imageSize);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .onStart(() => {
      if (scaleImage.value !== props.imageSize * 2) {
        scaleImage.value = scaleImage.value * 2;
      } else {
        scaleImage.value = Math.round(scaleImage.value / 2);
      }
    });

  const imageStyle = useAnimatedStyle(() => {
    return {
      width: withSpring(scaleImage.value),
      height: withSpring(scaleImage.value),
    };
  });

  const drag = Gesture.Pan()
    .onChange((e) => {
      const newX = translateX.value + e.changeX;
      const newY = translateY.value + e.changeY;
      
      const maxX = props.containerWidth - props.imageSize;
      const maxY = props.containerHeight - props.imageSize;
      
      translateX.value = Math.min(Math.max(newX, 0), maxX);
      translateY.value = Math.min(Math.max(newY, 0), maxY);
    });

  const containerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value,
        },
        {
          translateY: translateY.value,
        }
      ]
    }
  })

  return (
    <GestureDetector gesture={drag}>
      <Animated.View
        style={[containerStyle, { position: 'absolute' }]}
      >
        <GestureDetector gesture={doubleTap}>
          <Animated.Image
            source={props.stickerSource}
            resizeMode="contain"
            style={imageStyle}
          />
        </GestureDetector>
      </Animated.View>
    </GestureDetector>
  );
}
