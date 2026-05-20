import {View, Modal, TouchableOpacity, StyleSheet} from "react-native";
import ImageZoom from "react-native-image-zoom-viewer";
import {Feather} from "@expo/vector-icons";
import ExpoVideoPlayer from "../ExpoVideoPlayer";

export default function ModalViewMedia({
  isVisible,
  onClose,
  type,
  media,
  onEditMedia,
}) {
  return (
    <Modal
      visible={isVisible}
      transparent={true}
      onRequestClose={onClose}
      animationType="fade"
    >
      <View style={styles.container}>
        <View style={styles.closeButtonContainer}>
          <TouchableOpacity
            onPress={onClose}
            accessible
            accessibilityLabel="Cerrar"
          >
            <Feather name="x" size={32} color="#fff" />
          </TouchableOpacity>
        </View>
        {type === "image" ? (
          <ImageZoom
            imageUrls={[{url: media}]}
            renderIndicator={() => null}
            saveToLocalByLongPress={false}
          />
        ) : (
          <ExpoVideoPlayer
            style={styles.video}
            source={media}
            shouldPlay={isVisible}
            isLooping={true}
          />
        )}
        <View style={styles.editButtonContainer}>
          <TouchableOpacity
            onPress={onEditMedia}
            accessible
            accessibilityLabel="Editar"
          >
            <Feather name="edit" size={32} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  closeButtonContainer: {
    flex: 0.1,
    padding: 10,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  video: {
    flex: 1,
  },
  editButtonContainer: {
    paddingBottom: 24,
    justifyContent: "center",
    alignItems: "center",
  },
});
