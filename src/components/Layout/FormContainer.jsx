import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateFormType, updateQuestion } from '../../slices/question';
import { useTheme } from '@mui/material/styles';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import NarrativeQuestion from '../Formbox/NarrativeQuestion.jsx';
import OptionalQuestion from '../Formbox/OptionalQuestion.jsx';
import TextField from "@mui/material/TextField";
import ControlButton from "../Formbox/ControlButton.jsx";
const FormContainer = (props) => {
	const dispatch = useDispatch();
	const formType = useSelector((state) => state.question.formType);
	const question = useSelector((state) => state.question.question);
	const theme = useTheme();
	const renderForm = () => {
		if (formType === '단답형' || formType === '장문형') {
			return <NarrativeQuestion />;
		}
		if (formType === '객관식 질문' || formType === '체크박스' || formType === '드롭다운') {
			return <OptionalQuestion />;
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
			<div style={{display : 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
				<TextField
					id="standard-basic"
					variant="standard"
					type="text"
					className="inputs__title"
					placeholder="질문"
					name="question"
					sx={{ width: '80%', height: 'auto', backgroundColor: theme.palette.grey.light }}
					color="primary"
					value={question}
					onChange={handleQuestionChange}
				/>
				<FormControl sx={{ m: 1, height: 'auto' }}>
					<Select
						onChange={handleSelectChange}
						value={formType}
						inputProps={{ 'aria-label': '질문 유형' }}
					>
						<MenuItem value="단답형">단답형</MenuItem>
						<MenuItem value="장문형">장문형</MenuItem>
						<MenuItem value="객관식 질문">객관식 질문</MenuItem>
						<MenuItem value="체크박스">체크박스</MenuItem>
						<MenuItem value="드롭다운">드롭다운</MenuItem>
					</Select>
				</FormControl>
			</div>
			{renderForm()}
			<ControlButton />
		</div>
	)
}
export default FormContainer;