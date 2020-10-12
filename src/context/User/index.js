export function login() {
	this.setState({auth: true});
}

export function logout() {
	this.setState({auth: false});
}