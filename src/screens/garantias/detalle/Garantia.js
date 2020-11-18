import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, TextInput } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Consumer } from '../../../context';
import moment from 'moment-timezone';
import Request from '../../../core/api';

// Componentes
import Container from '../../../components/container';
import SelectFechas from '../../../components/select/SelectFechas';
import BotonAccion from '../../../components/boton/BotonAccion';

// Styles
import TextStyle from '../../../styles/text';
import inputs from '../../../styles/inputs';

const request = new Request();

const DetalleGarantia = ({ navigation }) => {
	const [info, setInfo] = useState({});
	const [fechas, setFechas] = useState([]);
	const [fecha, setFecha] = useState('');
	const [comentarios, setComentarios] = useState('');
	const [loading, setLoading] = useState(false);
	const route = useRoute();

	if(route.params) {
		useEffect(()=> {
			const { data } = route.params;
			if (data) {
				setInfo(data);
			}
		}, [route.params])
	}

	useEffect(() => {
		let Fechas = [];
		if (info.Fecha1) {
			Fechas[0] = {id: info.Fecha1, name: moment(info.Fecha1).format('DD/MM/YYYY HH:mm:ss')}
		}
		if (info.Fecha2) {
			Fechas[1] = {id: info.Fecha2, name: moment(info.Fecha2).format('DD/MM/YYYY HH:mm:ss')}
		}
		if (info.Fecha3) {
			Fechas[2] = {id: info.Fecha3, name: moment(info.Fecha3).format('DD/MM/YYYY HH:mm:ss')}
		}
		setFechas(Fechas);
	}, [info])

	async function handleSubmit() {
		if (!moment(fecha).isValid()) {
			alert('Debe seleccionar una fecha.')
			return;
		}

		setLoading(true);

		const data = {
			FechaVisita: fecha,
			ComentariosVisita: comentarios,
			IdSolicitud: info.IdSolicitud
		}

		const response = await request.post('/app/garantias/update/fecha/visita', data);

		if (response.error) {
			alert(response.message || 'Error interno');
		}
		if (response.agendado) {
			navigation.goBack();
		}

		setLoading(false);
	}

	if (info.IdEstado == 3) {
		return (
			<Container>
				<View style={{height: 8}}/>

				<Text style={{textAlign: 'center', color: '#000', fontSize: 18, fontWeight: 'bold'}}>No Aplica Garantía</Text>

				<Text style={{fontSize: 16, padding: 5}}>
					Unidad: {info.Numero}
				</Text>
				<Text style={{fontSize: 16, padding: 5}}>
					Area: {info.NombreArea}
				</Text>
				<Text style={{fontSize: 16, padding: 5}}>
					Equipo: {info.NombreEquipo}
				</Text>
				<Text style={{fontSize: 16, padding: 5}}>
					Problema: {info.NombreProblema}
				</Text>

				<View style={{height: 16}}/>

				<View style={{minHeight: 120, borderRadius: 8, borderColor: '#000', borderWidth: 1, paddingVertical: 10, paddingHorizontal: 17, textAlignVertical: "top"}}>
					<Text style={{fontSize: 16}}>
						{info.ComentariosAplica}
					</Text>
				</View>
				<View style={{height: 32}}/>
			</Container>
		)
	}

	if (info.IdEstado == 5) {
		return (
			<Container>
				<View style={{height: 8}}/>

				<Text style={{textAlign: 'center', color: '#000', fontSize: 18, fontWeight: 'bold'}}>Programada</Text>

				<View style={{height: 16}}/>

				<Text style={{fontSize: 16, padding: 5}}>
					Unidad: {info.Numero}
				</Text>
				<Text style={{fontSize: 16, padding: 5}}>
					Area: {info.NombreArea}
				</Text>
				<Text style={{fontSize: 16, padding: 5}}>
					Equipo: {info.NombreEquipo}
				</Text>
				<Text style={{fontSize: 16, padding: 5}}>
					Problema: {info.NombreProblema}
				</Text>
				<Text style={{fontSize: 16, padding: 5}}>
					Fecha Visita: {moment(info.FechaAplica).format('DD/MM/YYYY HH:mm:ss')}
				</Text>

				<View style={{height: 32}}/>
			</Container>
		)
	}

	return (
		<Container>
			<ScrollView style = {{flex: 1}}>

				<View style={{height: 8}}/>

				<Text style={{textAlign: 'center', color: '#000'}}>Seleccione la fecha para la reparación</Text>

				<View style={{height: 8}}/>

				<SelectFechas fechas = {fechas} onChange = {(data) => setFecha(data)}/>

				<View style={{height: 8}}/>

				<TextInput
					onChangeText={(text) => setComentarios(text)}
					placeholder="Escriba sus comentarios"
					style={{borderRadius: 8, borderColor: '#000', borderWidth: 1, paddingVertical: 10, paddingHorizontal: 17, textAlignVertical: "top", fontSize: 16}}
					multiline
					numberOfLines={6}
					maxLength={1500}/>

				<View style={{height: 32}}/>

				<View style={{alignItems: 'center'}}>
					<View style={{flexDirection: 'row', justifyContent: 'center', width: 200}}>
						<BotonAccion onPress = {handleSubmit.bind(this)} loading = {loading}>
							<Text style={{fontSize: 18, color: 'white'}}>Enviar</Text>
						</BotonAccion>
					</View>
				</View>

			</ScrollView>
		</Container>
	)
}

export default Consumer(DetalleGarantia);
