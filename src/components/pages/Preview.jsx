import React, { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Card from '../Layout/Card'
import TitleForm from "../Formbox/TitleForm.jsx";
import Wrapper from '../Layout/Wrapper';

const Preview = () => {
	const dispatch = useDispatch();
	const question = useSelector((state) => state.question);
	console.log(question)
	return (
		<Wrapper>
			<Card>
				<TitleForm />
			</Card>
		</Wrapper>
	)
}
export default Preview;