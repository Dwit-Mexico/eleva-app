import {View, Text, Modal, TouchableOpacity, StyleSheet} from "react-native";
import {useLanguageContext} from "../../context/lang";

export default function BottomSheet({options, isVisible, onClose}) {
  const {i18n} = useLanguageContext();

  return (
    <Modal
      visible={isVisible}
      onRequestClose={onClose}
      animationType="fade"
      transparent
    >
      <View style={styles.container}>
        <View style={styles.bottomSheet}>
          <Text style={styles.title}>{i18n.t("media.title")}</Text>
          {options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={styles.option}
              onPress={option.onPress}
            >
              <Text style={styles.optionText}>{option.label}</Text>
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
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  bottomSheet: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 16,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: {width: 0, height: -2},
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
    paddingBottom: 30,
  },
  title: {
    paddingVertical: 12,
    fontSize: 14,
    fontWeight: "600",
    color: "#7B7F8E",
  },
  option: {
    paddingVertical: 10,
  },
  optionText: {
    fontSize: 14,
    color: "#333",
  },
});
