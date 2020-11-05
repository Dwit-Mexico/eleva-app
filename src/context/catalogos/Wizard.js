//Coloca el numero de paso activo en el wizard
export async function setStep(step) {
	// console.log('Step', step);
	this.setState({step});
};