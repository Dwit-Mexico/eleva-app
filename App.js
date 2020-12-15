import React, { Component } from 'react';
import Routes from './src/core/routes';
import OneSignal from 'react-native-onesignal';

class App extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Routes/>
		)
	}
}

export default App;
