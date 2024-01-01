import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateFormType } from '../../slices/question';

import ShortAnswerForm from '../Inputbox/ShortAnswerForm';
import LongAnswerForm from '../Inputbox/LongAnswerForm';
import MultipleChoiceForm from '../Inputbox/MultipleChoiceForm';
import CheckBoxForm from '../Inputbox/CheckBoxForm';
import DropdownForm from '../Inputbox/DropdownForm';
const FormContainer = () => {
	const dispatch = useDispatch();
	const formType = useSelector((state) => state.question.formType);
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

	return (
		<div>
			<select onChange={handleSelectChange} value={formType}>
				<option value="단답형">단답형</option>
				<option value="장문형">장문형</option>
				<option value="객관식 질문">객관식 질문</option>
				<option value="체크박스">체크박스</option>
				<option value="드롭다운">드롭다운</option>
			</select>
			{renderForm()}
		</div>
	)
}
export default FormContainer;