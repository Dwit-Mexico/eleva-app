import React from "react";
import {StyleSheet, View} from "react-native";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import {ImageZoom} from "@likashefqet/react-native-image-zoom";

export default function ZoomableImage({uri, style}) {
  if (!uri) {
    return <View style={[styles.container, style]} />;
  }

  return (
    <GestureHandlerRootView style={[styles.container, style]}>
      <ImageZoom
        uri={uri}
        style={styles.image}
        resizeMode="contain"
        minScale={1}
        maxScale={5}
        doubleTapScale={3}
        isDoubleTapEnabled
      />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
});
