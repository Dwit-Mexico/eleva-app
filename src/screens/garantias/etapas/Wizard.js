import React, {useState, useEffect} from "react";
import {Alert, View} from "react-native";
import {Consumer} from "../../../context";
import * as ImageManipulator from "expo-image-manipulator";
import moment from "moment-timezone";
import Container from "../../../components/container";
import Wizard from "../../../components/wizard";
import Unidad from "./formulario/unidad";
import Area from "./formulario/area";
import Equipo from "./formulario/equipo";
import Problema from "./formulario/problema";
import Comentario from "./formulario/comentario";
import Fotos from "./formulario/fotos";
import Finalizar from "./formulario/finalizar";
import Request from "../../../core/api";
import {useLanguageContext} from "../../../context/lang";
const request = new Request();

function Etapa1({navigation, esDetalle, context}) {
  const {locale, i18n} = useLanguageContext();
  const translate = locale === "en";
  const [unidad, setUnidad] = useState(null);
  const [area, setArea] = useState(null);
  const [equipo, setEquipo] = useState(null);
  const [problema, setProblema] = useState(null);
  const [comentario, setComentario] = useState(null);
  const [loading, setLoading] = useState(false);
  const [terminado, setTerminado] = useState(false);
  const [loadingAceptar, setLoadingAceptar] = useState(false);
  const [loadingFinalizar, setLoadingFinalizar] = useState(false);

  async function _compressImage(imagen, name) {
    if (imagen) {
      const manipResult = await ImageManipulator.manipulateAsync(imagen, [], {
        compress: 0.5,
        format: ImageManipulator.SaveFormat.JPEG,
        base64: false,
      });

      return {
        uri: manipResult,
        name: `${name}.jpg`,
        type: `image/jpg`,
      };
    }
  }

  async function _compressVideo(videoUri, name) {
    if (videoUri) {
      return {
        uri: videoUri,
        name: `${name}.mp4`,
        type: `video/mp4`,
      };
    }
  }

  useEffect(() => {
    if (context) {
      setUnidad(context.unidad);
      setArea(context.area);
      setEquipo(context.equipo);
      setProblema(context.problema);
      setComentario(context.comentario);
    }
  }, []);

  useEffect(() => {
    async function setedUnidad() {
      if (context && unidad) {
        await context.setUnidad(unidad);
      }
    }

    setedUnidad();
  }, [unidad]);

  useEffect(() => {
    async function setedArea() {
      if (context && area) {
        await context.setArea(area);
      }
    }

    setedArea();
  }, [area]);

  useEffect(() => {
    async function setedEquipo() {
      if (context && equipo) {
        await context.setEquipo(equipo);
      }
    }

    setedEquipo();
  }, [equipo]);

  useEffect(() => {
    async function setedProblema() {
      if (context && problema) {
        await context.setProblema(problema);
      }
    }

    setedProblema();
  }, [problema]);

  useEffect(() => {
    async function setedComentario() {
      if (context && comentario) {
        await context.setComentario(comentario);
      }
    }

    setedComentario();
  }, [comentario]);

  async function _handleSubmit() {
    setLoading(true);
    const data = {
      IdUnidad: unidad,
      IdArea: area,
      IdEquipo: equipo,
      IdProblema: problema,
      Comentarios: comentario || "",
      Fecha: moment().format(),
    };

    const file1 = await _compressImage(context.imagen1, "imagen1");
    const file2 = await _compressImage(context.imagen2, "imagen2");
    const file3 = await _compressImage(context.imagen3, "imagen3");
    const file4 = await _compressVideo(context.video1, "video1");

    const response = await request.postFile(
      "/app/garantias/crear",
      [file1, file2, file3, file4],
      data
    );

    if (response.error) {
      Alert.alert(null, response.message || i18n.t("error.intern"));
    }
    if (response.upload) {
      setTerminado(true);
    }

    setLoading(false);
  }

  function reinicializar() {
    context.setEquipo(null);
    context.setProblema(null);
    context.setComentario(null);
    context.setImagen1(null);
    context.setImagen2(null);
    context.setImagen3(null);
    context.setVideo1(null);

    setEquipo(null);
    setProblema(null);
    setComentario(null);
  }

  async function aceptarAction() {
    setLoadingAceptar(true);

    await context.reloadReportes(translate);

    setTerminado(false);

    reinicializar();

    context.setStep(1);

    setLoadingAceptar(false);
  }

  async function finalizarAction() {
    setLoadingFinalizar(true);

    await context.reloadReportes(translate);

    setTerminado(false);

    context.setUnidad(null);
    context.setArea(null);

    reinicializar();

    context.setStep(1);

    navigation.goBack();

    setLoadingFinalizar(false);
  }

  return (
    <Container>
      <View style={{flex: 1, height: "100%"}}>
        <View style={{height: 8}} />

        <Wizard
          steps={[
            <Unidad unidad={unidad} setUnidad={setUnidad} />,
            <Area area={area} setArea={setArea} />,
            <Equipo equipo={equipo} setEquipo={setEquipo} />,
            <Problema problema={problema} setProblema={setProblema} />,
            <Comentario
              comentario={comentario}
              setComentario={setComentario}
            />,
            <Fotos context={context} />,
            <Finalizar
              aceptarAction={() => aceptarAction()}
              finalizarAction={() => finalizarAction()}
              loadingAceptar={loadingAceptar}
              loadingFinalizar={loadingFinalizar}
            />,
          ]}
          ultimo={6}
          onSubmit={_handleSubmit.bind(this)}
          loading={loading}
          terminado={terminado}
          unidad={unidad}
          area={area}
        />
      </View>
    </Container>
  );
}

export default Consumer(Etapa1);
