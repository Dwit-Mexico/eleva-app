import {View, TouchableOpacity, StyleSheet} from "react-native";
import {Image} from "expo-image";
import {Feather} from "@expo/vector-icons";

export default function MediaButton({item, thumbnail, onOpen}) {
  const isVideo = item.type === "video";

  return (
    <View>
      <TouchableOpacity style={styles.button} onPress={onOpen}>
        {item.media ? (
          <Image
            source={isVideo && thumbnail ? thumbnail : {uri: item.media}}
            style={styles.image}
            contentFit="cover"
          />
        ) : item.type === "video" ? (
          <Feather name="video" size={32} color="#333138" />
        ) : (
          <Feather name="image" size={32} color="#333138" />
        )}
        {isVideo && item.media && (
          <View style={styles.overlay}>
            <Feather name="play-circle" size={32} color="#fff" />
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 160,
    height: 160,
    marginRight: 10,
    marginBottom: 10,
    backgroundColor: "#FCFAFA",
    borderRadius: 8,
    borderWidth: 3,
    borderColor: "#333138",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  overlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
