import React from "react";
import {View} from "react-native";
import Select2 from "react-native-select-two";
import {AntDesign} from "@expo/vector-icons";
import InputStyles from "../../styles/inputs";
import Colores from "../../styles/colores";
import {useLanguageContext} from "../../context/lang";

function SelectUnidad({unidades, onChange}) {
   const {i18n} = useLanguageContext();
   function onSelectionsChange(data) {
      if (onChange) {
         onChange(data[0]);
      }
   }

   return (
      <View style={InputStyles.Select}>
         <Select2
            isSelectSingle={true}
            style={{borderWidth: 0}}
            colorTheme={Colores.selectTheme}
            popupTitle={i18n.t("select.unit")}
            title={i18n.t("select.selectUnit")}
            searchPlaceHolderText={i18n.t("select.search")}
            cancelButtonText={i18n.t("button.cancel")}
            selectButtonText={i18n.t("button.accept")}
            listEmptyTitle={i18n.t("select.emptyUnit")}
            data={unidades || []}
            onSelect={(data) => onSelectionsChange(data)}
            onRemoveItem={(data) => onSelectionsChange(data)}
         />
         <AntDesign
            style={{right: 25}}
            name="caretdown"
            color="grey"
            size={10}
         />
      </View>
   );
}

export default SelectUnidad;
