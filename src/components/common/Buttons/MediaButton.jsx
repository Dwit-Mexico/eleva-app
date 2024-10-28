import {View, Image, TouchableOpacity} from "react-native";
import {Feather} from "@expo/vector-icons";
import emptyImage from "../../../../assets/picture.jpg";
import emptyVideo from "../../../../assets/video1.jpeg";

export default function MediaButton({item, onOpen}) {
  const isVideo = item.type === "video";

  return (
    <View>
      <TouchableOpacity
        style={{width: 170, height: 140, padding: 10}}
        onPress={onOpen}
      >
        <Image
          source={
            item.media ? {uri: item.media} : isVideo ? emptyVideo : emptyImage
          }
          style={{width: "100%", height: "100%"}}
          resizeMode="cover"
        />
        {isVideo && item.media && (
          <View
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Feather name="play-circle" size={32} color="#fff" />
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
}
