import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateFormType, updateQuestion } from '../../slices/question';

import ShortAnswerForm from '../Formbox/ShortAnswerForm';
import LongAnswerForm from '../Formbox/LongAnswerForm';
import MultipleChoiceForm from '../Formbox/MultipleChoiceForm';
import CheckBoxForm from '../Formbox/CheckBoxForm';
import DropdownForm from '../Formbox/DropdownForm';
import TextField from "@mui/material/TextField";
import ControlButton from "../Formbox/ControlButton.jsx";
const FormContainer = (props) => {
	const dispatch = useDispatch();
	const formType = useSelector((state) => state.question.formType);
	const question = useSelector((state) => state.question.question);
	const renderForm = () => {
		switch (formType) {
			case '단답형':
				return <ShortAnswerForm />;
			case '장문형':
				return <LongAnswerForm />;
			case '객관식 질문':
				return <MultipleChoiceForm />;
			case '체크박스':
				return <CheckBoxForm />;
			case '드롭다운':
				return <DropdownForm />;
			default:
				return null;
		}
	};

	const handleSelectChange = (event) => {
		const selectedFormType = event.target.value;
		dispatch(updateFormType(selectedFormType));
	};

	const handleQuestionChange = (event) => {
		const newQuestion = event.target.value;
		dispatch(updateQuestion(newQuestion));
	}

	return (
		<div>
			<TextField
				id="standard-basic"
				variant="standard"
				type="text"
				className="inputs__title"
				placeholder="질문"
				name="question"
				sx={{ width: '100%' }}
				value={question}
				onChange={handleQuestionChange}
			/>
			<select onChange={handleSelectChange} value={formType}>
				<option value="단답형">단답형</option>
				<option value="장문형">장문형</option>
				<option value="객관식 질문">객관식 질문</option>
				<option value="체크박스">체크박스</option>
				<option value="드롭다운">드롭다운</option>
			</select>
			{renderForm()}
			<ControlButton />
		</div>
	)
}
export default FormContainer;