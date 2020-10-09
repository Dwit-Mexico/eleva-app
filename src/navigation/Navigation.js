import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Consumer } from '../context';

/** Stacks */
import AuthStack from './AuthStack';
import AppStack from './AppStack';

class Navigation extends Component {
	constructor(props) {
		super(props);
		this.state = {}
	}

	render () {
		const { context } = this.props;
		let auth = false;
		if (context) {
			auth = context.auth;
		}
		return (
			<NavigationContainer>
				{auth?
					<AppStack/>
					:
					<AuthStack/>
				}
			</NavigationContainer>
		);
	}
}

export default Consumer(Navigation);