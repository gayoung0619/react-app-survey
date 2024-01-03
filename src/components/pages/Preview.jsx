import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../Layout/Card'
import Wrapper from '../Layout/Wrapper';
import TitleForm from "../Formbox/TitleForm.jsx";
import FloatingBar from "../Layout/floatingBar.jsx";
import DragArea from "../Layout/DragArea.jsx";

const Preview = () => {
	const dispatch = useDispatch();
	const question = useSelector((state) => state.question);

	return (
		<>
			<DragArea />
		</>
	)
}
export default Preview;