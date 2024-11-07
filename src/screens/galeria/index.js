import React, {useState} from "react";
import {View, Modal, TouchableOpacity} from "react-native";
import {SliderBox} from "react-native-image-slider-box";
import {FontAwesome5} from "@expo/vector-icons";
import ImageZoom from "react-native-image-zoom-viewer";

// Componentes
import Container from "../../components/container";

function Galeria() {
  const [visibleModal, setVisibleModal] = useState(false);
  const [zoomImagen, setZoomImagen] = useState([]);

  const imagenes = [
    {uri: "http://192.168.1.74:8082/imagenes/8/imagen1.jpeg"},
    {uri: "http://192.168.1.74:8082/imagenes/8/imagen1.jpeg"},
    {uri: "http://192.168.1.74:8082/imagenes/8/imagen1.jpeg"},
  ];

  return (
    <Container>
      <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
        <SliderBox
          onCurrentImagePressed={(index) => {
            const imgRender = imagenes[index];
            const imgSource = imgRender.uri
              ? [
                  {
                    url: imgRender.uri,
                  },
                ]
              : [
                  {
                    url: "",
                    props: {
                      source: imgRender,
                    },
                  },
                ];
            setZoomImagen(imgSource);
            setVisibleModal(true);
          }}
          images={imagenes}
          dotColor={"#000"}
          inactiveDotColor="#BBBBBB"
          imageLoadingColor={"#000"}
          paginationBoxVerticalPadding={20}
          resizeMethod={"resize"}
          resizeMode={"contain"}
          paginationBoxStyle={{
            position: "absolute",
            bottom: 0,
            padding: 0,
            alignItems: "center",
            alignSelf: "center",
            justifyContent: "center",
            paddingVertical: 10,
          }}
          dotStyle={{
            width: 10,
            height: 10,
            borderRadius: 5,
            marginHorizontal: 0,
            padding: 0,
            margin: 0,
            backgroundColor: "rgba(128, 128, 128, 0.92)",
          }}
          ImageComponentStyle={{
            borderRadius: 15,
            width: "90%",
            height: 400,
            marginTop: 5,
            padding: 20,
          }}
          // imageLoadingColor="#2196F3"
        />
      </View>
      <Modal
        visible={visibleModal}
        transparent={true}
        onRequestClose={() => setVisibleModal(false)}
        onBackButtonPress={() => setVisibleModal(false)}
      >
        <View style={{flex: 1, backgroundColor: "#000"}}>
          <View
            style={{
              flex: 0.1,
              padding: 10,
              justifyContent: "center",
              alignItems: "flex-end",
            }}
          >
            <TouchableOpacity onPress={() => setVisibleModal(false)}>
              <FontAwesome5 name="times" size={35} color="#fff" />
            </TouchableOpacity>
          </View>
          <ImageZoom
            imageUrls={zoomImagen}
            renderIndicator={() => null}
            saveToLocalByLongPress={false}
          />
        </View>
      </Modal>
    </Container>
  );
}

export default Galeria;
