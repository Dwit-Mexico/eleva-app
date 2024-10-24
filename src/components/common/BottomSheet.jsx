import {View, Text, Modal, TouchableOpacity, StyleSheet} from "react-native";
import {useLanguageContext} from "../../context/lang";

export default function BottomSheet({options, isVisible}) {
  const {i18n} = useLanguageContext();
  return (
    <Modal visible={isVisible} animationType="slide" transparent>
      <View style={styles.container}>
        <View style={styles.bottomSheet}>
          <Text style={{padding: 10, color: "#7B7F8E"}}>
            {i18n.t("media.title")}
          </Text>
          {options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={styles.option}
              onPress={option.onPress}
            >
              <Text>{option.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  bottomSheet: {
    backgroundColor: "white",
    height: "auto",
    position: "absolute",
    bottom: 0,
    width: "100%",
    paddingHorizontal: 8,
    paddingBottom: 30,
  },
  option: {
    padding: 10,
  },
});
