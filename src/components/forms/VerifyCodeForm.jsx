import {
  View,
  ScrollView,
  Text,
  TextInput,
  Image,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import {useLanguageContext} from "../../context/lang";
import styles from "../../styles/screens/RecoverPassword";

export default function VerifyCodeForm({
  code,
  onCodeChange,
  onSubmit,
  isLoading,
  inputRefs,
  navigation,
}) {
  const {i18n} = useLanguageContext();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>
          <Image
            source={require("../../../assets/logo2.png")}
            style={styles.logo}
          />
          <Text style={styles.text}>{i18n.t("verifyCode.description")}</Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            {code.map((digit, index) => (
              <TextInput
                key={index}
                placeholder="0"
                value={digit}
                onChangeText={(text) => onCodeChange(text, index)}
                keyboardType="number-pad"
                maxLength={1}
                ref={(el) => (inputRefs.current[index] = el)}
                style={{
                  borderBottomColor: "#ffffff",
                  borderBottomWidth: 1,
                  borderRadius: 4,
                  textAlign: "center",
                  fontSize: 24,
                  paddingVertical: 0,
                  width: 50,
                  height: 50,
                  color: "#fff",
                }}
              />
            ))}
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.submitButton} onPress={onSubmit}>
            {isLoading ? (
              <ActivityIndicator color="#ffffff" />
            ) : (
              <Text style={styles.buttonText}>
                {i18n.t("verifyCode.button")}
              </Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.navigate("recover-password", {Email})}
          >
            <Text style={styles.buttonText}>{i18n.t("button.back")}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
