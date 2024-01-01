import { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';

import FloatingBar from "../Layout/floatingBar.jsx";
import DragArea from "../Layout/DragArea"

const Form = () => {

	return (
		<>
			<FloatingBar />
			<DragArea />
		</>
	)
}
export default Form;