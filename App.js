import React, { Component } from 'react';
import Routes from './src/core/routes';
import OneSignal from 'react-native-onesignal';

class App extends Component {
	constructor(props) {
		super(props);
		OneSignal.init("ee672dec-e2d4-426a-8cd0-c8fa3ba8c154", {
			kOSSettingsKeyAutoPrompt: false, 
            kOSSettingsKeyInAppLaunchURL: false
		});
		OneSignal.inFocusDisplaying(2);
		OneSignal.requestPermissions();
		OneSignal.addEventListener('received', this.onReceived);
		OneSignal.removeEventListener('opened', this.onOpened);
		OneSignal.addEventListener('ids', this.onIds);
	}

	componentWillUnmount() {
		OneSignal.removeEventListener('received', this.onReceived);
		OneSignal.removeEventListener('opened', this.onOpened);
		OneSignal.removeEventListener('ids', this.onIds);
	}

	onOpened(openResult) {
		console.log('Message: ', openResult.notification.payload.body);
		console.log('Data: ', openResult.notification.payload.additionalData);
		console.log('isActive: ', openResult.notification.isAppInFocus);
		console.log('openResult: ', openResult);
	}

	onReceived(notification) {
		console.log("Notification received: ", notification);
	}

	onIds(device) {
		console.log('Device info: ', device);
	}

	render() {
		return (
			<Routes/>
		)
	}
}

export default App;
