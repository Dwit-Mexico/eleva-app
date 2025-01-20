import React, {useEffect, useRef, useState} from "react";
import {View, Animated, Text, Pressable, ActivityIndicator} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {Consumer} from "../../../../context";
import SelectUnidad from "../../../../components/select/SelectUnidad";
import Styles from "../../../../styles/components/WizardStyle";
import {useLanguageContext} from "../../../../context/lang";

function SeleccionarUnidad({unidad, setUnidad, context}) {
  const {i18n} = useLanguageContext();
  const animatedOpacity = useRef(new Animated.Value(0)).current;
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    Animated.timing(animatedOpacity, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  async function onRefresh() {
    if (context) {
      setIsLoading(true);
      await context.getSetUnidades();
      setIsLoading(false);
    }
  }

  function onSelect(opcion) {
    if (setUnidad) {
      setUnidad(opcion);
    }
  }

  useEffect(() => {
    onRefresh();
  }, []);

  return (
    <View style={{flex: 1}}>
      <Animated.View
        style={{
          flex: 1,
          height: "100%",
          opacity: animatedOpacity,
        }}
      >
        <View
          style={{
            paddingBottom: 10,
          }}
        >
          <Text style={Styles.titleStyle}>{i18n.t("reports.unit")}</Text>
          <Pressable
            style={{
              backgroundColor: "#B29360",
              borderRadius: 25,
              width: 50,
              height: 50,
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
              right: 20,
            }}
            onPress={onRefresh}
          >
            {isLoading ? (
              <ActivityIndicator color="#ffffff" size="small" />
            ) : (
              <Ionicons name="reload" size={24} color="#ffffff" />
            )}
          </Pressable>
        </View>
        <SelectUnidad onSelect={onSelect.bind(this)} value={unidad} />
      </Animated.View>
    </View>
  );
}

export default Consumer(SeleccionarUnidad);
